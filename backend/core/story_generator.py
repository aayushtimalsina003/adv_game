import re
import json
from sqlalchemy.orm import Session

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import STORY_PROMPT
from models.story import Story, StoryNode
from core.models import StoryLLMResponse, StoryNodeLLM
from dotenv import load_dotenv


load_dotenv()

class StoryGenerator:
    
    @staticmethod
    def clean_json_response(text: str) -> str:
        """Remove markdown code blocks and clean up the response"""
        if not text:
            return text
        
        # Remove markdown code blocks
        text = re.sub(r'^```json\s*', '', text, flags=re.MULTILINE)
        text = re.sub(r'^```\s*', '', text, flags=re.MULTILINE)
        text = re.sub(r'\s*```$', '', text, flags=re.MULTILINE)
        
        # Remove any leading/trailing whitespace
        text = text.strip()
        
        return text
    
    @classmethod
    def _get_llm(cls, temperature: float = 0.7):
        """
        Get an LLM instance configured for OpenRouter.
        Using a more reliable model with better JSON output.
        """
        return ChatOpenAI(
            model="google/gemini-2.0-flash-exp:free",  # Reliable free model with good JSON support
            temperature=temperature,
            base_url="https://openrouter.ai/api/v1",
            max_completion_tokens=4000,  # Ensure enough tokens for full story
        )
    
    @classmethod
    def generate_story(cls, db: Session, session_id: str, theme: str = "fantasy") -> Story:
        """
        Generate a story with retry logic for robustness.
        """
        max_retries = 3
        last_error = None
        
        for attempt in range(max_retries):
            try:
                print(f"Story generation attempt {attempt + 1}/{max_retries}")
                
                llm = cls._get_llm()
                story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)

                prompt = ChatPromptTemplate.from_messages([
                    ("system", STORY_PROMPT),
                    ("human", f"Create the story with this theme: {theme}")
                ]).partial(format_instructions=story_parser.get_format_instructions())
        
                raw_response = llm.invoke(prompt.invoke({}))
                response_text = raw_response.content if hasattr(raw_response, "content") else str(raw_response)
                
                # Convert to string if needed
                if isinstance(response_text, (list, dict)):
                    response_text = json.dumps(response_text)
                else:
                    response_text = str(response_text)
                
                # Log the response for debugging
                print(f"LLM Response (first 500 chars): {response_text[:500]}...")
                
                if not response_text or not response_text.strip():
                    raise ValueError("LLM returned empty response")
                
                # Clean the response (remove markdown code blocks, etc.)
                cleaned_text = cls.clean_json_response(response_text)
                print(f"Cleaned response (first 500 chars): {cleaned_text[:500]}...")
                
                # Try to parse as JSON first to validate
                try:
                    json.loads(cleaned_text)
                except json.JSONDecodeError as je:
                    print(f"Invalid JSON: {str(je)}")
                    raise ValueError(f"LLM did not return valid JSON: {str(je)}")
                
                story_structure = story_parser.parse(cleaned_text)
                break  # Success! Exit retry loop
                
            except Exception as e:
                last_error = e
                print(f"Error on attempt {attempt + 1}: {str(e)}")
                if 'response_text' in locals():
                    print(f"Full response: {response_text[:1000]}")
                
                if attempt < max_retries - 1:
                    print(f"Retrying...")
                    continue
                else:
                    print(f"All retry attempts failed")
                    raise ValueError(f"Failed to generate story after {max_retries} attempts: {str(last_error)}")

        # Create story entry in DB
        story_db = Story(title=story_structure.title, session_id=session_id)
        db.add(story_db)
        db.flush()

        # Process the root node
        root_node_data = story_structure.rootNode
        if isinstance(root_node_data, dict):
            root_node_data = StoryNodeLLM.model_validate(root_node_data)

        cls._process_story_node(db, story_db.id, root_node_data, is_root=True)

        db.commit()
        return story_db


    @classmethod
    def _process_story_node(cls, db: Session, story_id: int, node_data: StoryNodeLLM, is_root: bool = False) -> StoryNode:
        node = StoryNode(
            story_id=story_id,
            content=node_data.content,
            is_root=is_root,
            is_ending=node_data.isEnding,
            is_winning_ending=node_data.isWinningEnding,
        )
        db.add(node)
        db.flush()

        if not node.is_ending and (hasattr(node_data, "options")and node_data.options):
            options_dict = {}
            for idx, option_data in enumerate(node_data.options):
                next_node = option_data.nextNode

                if isinstance(next_node, dict):
                    next_node = StoryNodeLLM.model_validate(next_node)

                child_node = cls._process_story_node(db, story_id, next_node, is_root=False) 

                options_dict[str(idx)] = {
                    "text": option_data.text,
                    "node_id": child_node.id
                }

            node.options = options_dict

        db.flush()
        return node
