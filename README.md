# 🎮 AI-Powered Interactive Adventure Game

An interactive storytelling game that uses AI to generate dynamic, choice-driven narratives. Players can choose from predefined themes or create custom adventures, with each decision shaping the story's direction. The backend uses FastAPI with LangChain and OpenAI-compatible APIs, while the frontend is built with React and Vite.

## ✨ Features

- 🤖 **AI-Generated Stories**: Powered by LangChain and OpenAI-compatible APIs to create unique, dynamic narratives
- 🎨 **Multiple Themes**: Choose from Fantasy, Sci-Fi, Mystery, Horror, Action Adventure, or create your own custom theme
- 🔀 **Choice-Based Gameplay**: Every decision matters and leads to different story outcomes
- ⚡ **Real-Time Story Generation**: Asynchronous job processing with polling for smooth user experience
- 🎭 **Immersive Interface**: Beautiful, themed UI with loading animations and error handling
- 💾 **Persistent Storage**: PostgreSQL database to store stories and game sessions
- 📊 **Progress Tracking**: Track your exploration through the story and navigate backwards

## 🏗️ Architecture

### Backend (FastAPI)
- **FastAPI** server with async job processing
- **LangChain** integration for AI story generation
- **SQLAlchemy** ORM with PostgreSQL database
- **RESTful API** with automatic documentation
- Modular architecture with routers, models, schemas, and services

### Frontend (React + Vite)
- **React 19** with functional components and hooks
- **Vite** for fast development and optimized builds
- **Axios** for API communication
- Responsive design with custom CSS
- Real-time polling for job status updates

## 📁 Project Structure

```
adv_game/
├── backend/
│   ├── core/
│   │   ├── config.py          # Configuration management
│   │   ├── models.py          # Pydantic models for LLM responses
│   │   ├── prompts.py         # AI prompts for story generation
│   │   └── story_generator.py # Core story generation logic
│   ├── db/
│   │   └── database.py        # Database connection and setup
│   ├── models/
│   │   ├── job.py             # Job database model
│   │   └── story.py           # Story database models
│   ├── routers/
│   │   ├── job.py             # Job status endpoints
│   │   └── story.py           # Story generation endpoints
│   ├── schemas/
│   │   ├── job.py             # Job Pydantic schemas
│   │   └── story.py           # Story Pydantic schemas
│   ├── main.py                # FastAPI application entry point
│   └── requirements.txt       # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ThemeSelector.jsx   # Theme selection interface
    │   │   ├── LoadingScreen.jsx   # Loading animation
    │   │   ├── StoryGame.jsx       # Main game interface
    │   │   └── ErrorScreen.jsx     # Error handling
    │   ├── services/
    │   │   └── api.js              # API client
    │   ├── App.jsx                 # Main application component
    │   └── main.jsx                # React entry point
    ├── package.json               # Node.js dependencies
    └── vite.config.js            # Vite configuration
```

## 📋 Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL
- OpenRouter API key (or other OpenAI-compatible API)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aayushtimalsina003/adv_game.git
cd adv_game
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/adventure_game

# API Configuration
OPENAI_API_KEY=your_openrouter_api_key_here
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:5173"]
API_PREFIX=/api/v1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎮 How to Play

1. **Select a Theme**: Choose from predefined themes or create your own custom adventure
2. **Wait for Generation**: The AI generates a unique story with multiple choice points
3. **Make Choices**: Read the story and select your preferred action
4. **Experience Outcomes**: Watch as your choices shape the narrative
5. **Reach the Conclusion**: Each path leads to a different ending

## 🔧 API Endpoints

### Story Generation
- `POST /api/v1/story/generate` - Start story generation job
- `GET /api/v1/story/{story_id}` - Get complete story with all nodes

### Job Management
- `GET /api/v1/job/{job_id}` - Check job status and results

## 🛠️ Technologies Used

### Backend
- FastAPI
- LangChain & LangChain-OpenAI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

### Frontend
- React 19
- Vite
- Axios
- CSS3

## 📦 Building for Production

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🎬 Demo Video

> **Coming Soon!** Check back later for a full walkthrough of the AI-Powered Interactive Adventure Game in action.

*[Demo video will showcase:]*
- *Theme selection and customization*
- *Real-time story generation*
- *Interactive gameplay with multiple choices*
- *Different story outcomes based on player decisions*
- *Complete end-to-end user experience*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Aayush Timalsina**
- GitHub: [@aayushtimalsina003](https://github.com/aayushtimalsina003)

## 🙏 Acknowledgments

- OpenRouter for providing access to AI models
- FastAPI for the excellent web framework
- LangChain for simplifying LLM integration
- React and Vite teams for amazing frontend tools

---

⭐ If you found this project interesting, please consider giving it a star!
