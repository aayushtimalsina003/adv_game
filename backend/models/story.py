from typing import List, Optional
from sqlalchemy import String, Integer, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


# --- Base class for all models ---
class Base(DeclarativeBase):
    pass


# --- Story Model ---
class Story(Base):
    __tablename__ = "stories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True)
    session_id: Mapped[str] = mapped_column(String, index=True)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # One-to-many relationship → A Story has many StoryNodes
    nodes: Mapped[List["StoryNode"]] = relationship(
        back_populates="story", cascade="all, delete-orphan"
    )


# --- StoryNode Model ---
class StoryNode(Base):
    __tablename__ = "story_nodes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    story_id: Mapped[int] = mapped_column(ForeignKey("stories.id"), index=True)
    content: Mapped[str] = mapped_column(String)
    is_root: Mapped[bool] = mapped_column(Boolean, default=False)
    is_ending: Mapped[bool] = mapped_column(Boolean, default=False)
    is_winning_ending: Mapped[bool] = mapped_column(Boolean, default=False)
    options: Mapped[Optional[dict]] = mapped_column(JSON, default=list)

    # Many-to-one relationship → A StoryNode belongs to one Story
    stories: Mapped["Story"] = relationship(back_populates="nodes")
