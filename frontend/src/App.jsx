import { useState, useEffect } from 'react';
import './App.css';
import ThemeSelector from './components/ThemeSelector';
import LoadingScreen from './components/LoadingScreen';
import StoryGame from './components/StoryGame';
import ErrorScreen from './components/ErrorScreen';
import { storyAPI } from './services/api';

function App() {
  const [gameState, setGameState] = useState('theme-selection'); // theme-selection, loading, polling, playing, error
  const [currentJobId, setCurrentJobId] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Crafting your adventure...');

  // Poll job status
  useEffect(() => {
    let pollInterval;

    if (gameState === 'polling' && currentJobId) {
      pollInterval = setInterval(async () => {
        try {
          const jobStatus = await storyAPI.getJobStatus(currentJobId);
          
          if (jobStatus.status === 'completed' && jobStatus.story_id) {
            setLoadingMessage('Loading your story...');
            const story = await storyAPI.getCompleteStory(jobStatus.story_id);
            setStoryData(story);
            setGameState('playing');
          } else if (jobStatus.status === 'Failed' || jobStatus.status === 'failed') {
            setError(jobStatus.error || 'Failed to generate story');
            setGameState('error');
          } else if (jobStatus.status === 'processing') {
            setLoadingMessage('Weaving the narrative threads...');
          }
        } catch (err) {
          console.error('Error polling job status:', err);
          setError(err.response?.data?.detail || 'Failed to check story status');
          setGameState('error');
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [gameState, currentJobId]);

  const handleStartGame = async (theme) => {
    try {
      setGameState('loading');
      setLoadingMessage('Crafting your adventure...');
      setError(null);

      const job = await storyAPI.createStory(theme);
      setCurrentJobId(job.job_id);
      setGameState('polling');
    } catch (err) {
      console.error('Error creating story:', err);
      setError(err.response?.data?.detail || 'Failed to create story. Please try again.');
      setGameState('error');
    }
  };

  const handleRestart = () => {
    setGameState('theme-selection');
    setCurrentJobId(null);
    setStoryData(null);
    setError(null);
    setLoadingMessage('Crafting your adventure...');
  };

  const handleRetry = () => {
    setGameState('theme-selection');
    setError(null);
  };

  return (
    <div className="app">
      {gameState === 'theme-selection' && (
        <ThemeSelector onStartGame={handleStartGame} isLoading={false} />
      )}

      {(gameState === 'loading' || gameState === 'polling') && (
        <LoadingScreen message={loadingMessage} />
      )}

      {gameState === 'playing' && storyData && (
        <StoryGame storyData={storyData} onRestart={handleRestart} />
      )}

      {gameState === 'error' && (
        <ErrorScreen message={error} onRetry={handleRetry} />
      )}
    </div>
  );
}

export default App;
