import { useState } from 'react';
import './ThemeSelector.css';

const ThemeSelector = ({ onStartGame, isLoading }) => {
  const [theme, setTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  const predefinedThemes = [
    { id: 'fantasy', name: 'Fantasy Adventure', description: 'Dragons, magic, and mystical lands', emoji: '🐉' },
    { id: 'scifi', name: 'Sci-Fi Odyssey', description: 'Space exploration and futuristic technology', emoji: '🚀' },
    { id: 'mystery', name: 'Mystery Detective', description: 'Solve crimes and uncover secrets', emoji: '🔍' },
    { id: 'horror', name: 'Horror Survival', description: 'Face your darkest fears', emoji: '👻' },
    { id: 'adventure', name: 'Action Adventure', description: 'Treasure hunts and daring escapes', emoji: '⚔️' },
    { id: 'custom', name: 'Custom Theme', description: 'Create your own adventure', emoji: '✨' },
  ];

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
    if (themeId !== 'custom') {
      setCustomTheme('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTheme = theme === 'custom' ? customTheme : theme;
    if (selectedTheme.trim()) {
      onStartGame(selectedTheme);
    }
  };

  return (
    <div className="theme-selector">
      <div className="theme-selector-header">
        <h1 className="game-title">🎮 Adventure Game</h1>
        <p className="game-subtitle">Choose your adventure theme to begin your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="theme-form">
        <div className="theme-grid">
          {predefinedThemes.map((t) => (
            <div
              key={t.id}
              className={`theme-card ${theme === t.id ? 'selected' : ''}`}
              onClick={() => handleThemeSelect(t.id)}
            >
              <div className="theme-emoji">{t.emoji}</div>
              <h3 className="theme-name">{t.name}</h3>
              <p className="theme-description">{t.description}</p>
            </div>
          ))}
        </div>

        {theme === 'custom' && (
          <div className="custom-theme-input">
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="Enter your custom theme (e.g., 'pirate adventure on the high seas')"
              className="theme-input"
              autoFocus
            />
          </div>
        )}

        <button
          type="submit"
          className="start-button"
          disabled={!theme || (theme === 'custom' && !customTheme.trim()) || isLoading}
        >
          {isLoading ? 'Creating Adventure...' : 'Start Adventure'}
        </button>
      </form>
    </div>
  );
};

export default ThemeSelector;
