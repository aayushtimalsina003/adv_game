# Adventure Game - Interactive Story Generator

An interactive text-based adventure game powered by AI that generates unique stories based on your chosen theme. The backend uses FastAPI with OpenAI integration, while the frontend is built with React and Vite.

## Features

- 🎮 **Interactive Story Generation**: AI-powered story creation with multiple branching paths
- 🎨 **Multiple Themes**: Choose from Fantasy, Sci-Fi, Mystery, Horror, Adventure, or create your own
- 🔄 **Dynamic Choices**: Make decisions that affect the story outcome
- 📊 **Progress Tracking**: Track your exploration through the story
- 💾 **Session Management**: Stories are tied to your browser session
- ⚡ **Real-time Updates**: Background job processing with live status updates

## Project Structure

```
adv_game/
├── backend/                 # FastAPI backend
│   ├── core/               # Core functionality (story generator, config, models)
│   ├── db/                 # Database configuration
│   ├── models/             # SQLAlchemy models
│   ├── routers/            # API routes
│   ├── schemas/            # Pydantic schemas
│   └── main.py             # FastAPI application entry point
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── services/       # API integration
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # React entry point
    └── package.json
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API Key

## Backend Setup

1. **Navigate to the backend directory:**
   ```powershell
   cd backend
   ```

2. **Create a virtual environment:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies:**
   ```powershell
   pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings openai python-dotenv
   ```

4. **Create a `.env` file in the backend directory:**
   ```env
   DATABASE_URL=sqlite:///./adventure_game.db
   OPENAI_API_KEY=your_openai_api_key_here
   ALLOWED_ORIGINS=http://localhost:5173
   API_PREFIX=
   DEBUG=True
   ```

5. **Run the backend server:**
   ```powershell
   python main.py
   ```

   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to `http://localhost:5173`
3. **Choose a theme** from the theme selector or create your own
4. **Wait for story generation** (usually takes 10-30 seconds)
5. **Make choices** to navigate through your adventure
6. **Explore different paths** by going back or starting new adventures

## API Endpoints

### Stories
- `POST /stories/create` - Create a new story with a theme
- `GET /stories/{story_id}/complete` - Get complete story data

### Jobs
- `GET /jobs/{job_id}` - Check story generation job status

## Technologies Used

### Backend
- FastAPI - Modern, fast web framework
- SQLAlchemy - SQL toolkit and ORM
- Pydantic - Data validation
- OpenAI API - Story generation
- SQLite - Database

### Frontend
- React 19 - UI library
- Vite - Build tool and dev server
- Axios - HTTP client
- CSS3 - Styling with animations

## Development

### Backend Development
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

### Frontend Development
```powershell
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```powershell
cd frontend
npm run build
npm run preview
```

## Features Explained

### Theme Selection
Choose from predefined themes or create your own custom adventure theme.

### Story Generation
Stories are generated asynchronously using OpenAI's API. The system creates:
- A compelling narrative with multiple branching paths
- Decision points that affect the story
- Multiple endings (winning and losing outcomes)

### Progress Tracking
- Track visited nodes
- Navigate backwards through your choices
- See how much of the story you've explored

### Session Management
Stories are tied to browser sessions using cookies, allowing you to maintain your progress.

## Troubleshooting

### Backend Issues
- **Database errors**: Delete `adventure_game.db` and restart
- **OpenAI errors**: Check your API key and account status
- **CORS errors**: Verify `ALLOWED_ORIGINS` in `.env` matches frontend URL

### Frontend Issues
- **Connection errors**: Ensure backend is running on port 8000
- **Build errors**: Delete `node_modules` and run `npm install` again
- **Display issues**: Clear browser cache and reload

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

MIT License - feel free to use this project for learning or personal use.
