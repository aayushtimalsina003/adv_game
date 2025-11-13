import './ErrorScreen.css';

const ErrorScreen = ({ message, onRetry }) => {
  return (
    <div className="error-screen">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{message || 'An unexpected error occurred'}</p>
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
