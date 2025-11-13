import { useState, useEffect } from 'react';
import './StoryGame.css';

const StoryGame = ({ storyData, onRestart }) => {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [storyHistory, setStoryHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (storyData && storyData.root_node) {
      setCurrentNodeId(storyData.root_node.id);
      setVisitedNodes(new Set([storyData.root_node.id]));
      setStoryHistory([storyData.root_node.id]);
    }
  }, [storyData]);

  const currentNode = currentNodeId ? storyData.all_nodes[currentNodeId] : null;

  const handleOptionClick = (optionNodeId) => {
    if (!optionNodeId || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentNodeId(optionNodeId);
      setVisitedNodes(prev => new Set([...prev, optionNodeId]));
      setStoryHistory(prev => [...prev, optionNodeId]);
      setIsAnimating(false);
    }, 300);
  };

  const handleGoBack = () => {
    if (storyHistory.length > 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        const newHistory = storyHistory.slice(0, -1);
        setStoryHistory(newHistory);
        setCurrentNodeId(newHistory[newHistory.length - 1]);
        setIsAnimating(false);
      }, 300);
    }
  };

  if (!currentNode) {
    return <div className="story-game">Loading story...</div>;
  }

  const isEnding = currentNode.is_ending;
  const isWinning = currentNode.is_winning_end;

  return (
    <div className="story-game">
      <div className="story-header">
        <div className="story-title-section">
          <h1 className="story-title">{storyData.title}</h1>
          <div className="story-meta">
            <span className="node-counter">
              Chapter {storyHistory.length} / {Object.keys(storyData.all_nodes).length} discovered
            </span>
          </div>
        </div>
        <div className="story-controls">
          {storyHistory.length > 1 && !isEnding && (
            <button
              onClick={handleGoBack}
              className="control-button back-button"
              disabled={isAnimating}
            >
              ← Go Back
            </button>
          )}
          <button onClick={onRestart} className="control-button restart-button">
            🏠 New Adventure
          </button>
        </div>
      </div>

      <div className={`story-content ${isAnimating ? 'fading' : ''}`}>
        <div className="story-text-container">
          {isEnding && (
            <div className={`ending-badge ${isWinning ? 'winning' : 'losing'}`}>
              {isWinning ? '🎉 Victory!' : '💀 The End'}
            </div>
          )}
          <p className="story-text">{currentNode.content}</p>
        </div>

        {!isEnding && currentNode.options && currentNode.options.length > 0 && (
          <div className="options-container">
            <h3 className="options-title">What do you do?</h3>
            <div className="options-grid">
              {currentNode.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.node_id)}
                  className={`option-button ${
                    visitedNodes.has(option.node_id) ? 'visited' : ''
                  }`}
                  disabled={isAnimating}
                >
                  <span className="option-number">{index + 1}</span>
                  <span className="option-text">{option.text}</span>
                  {visitedNodes.has(option.node_id) && (
                    <span className="visited-indicator">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {isEnding && (
          <div className="ending-actions">
            <button onClick={onRestart} className="play-again-button">
              {isWinning ? '🎮 Play Again' : '🔄 Try Again'}
            </button>
          </div>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(visitedNodes.size / Object.keys(storyData.all_nodes).length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default StoryGame;
