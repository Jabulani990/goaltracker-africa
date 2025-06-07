import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <div className="error-fallback">
        <h3>Something went wrong</h3>
        <button onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    ) : this.props.children;
  }
}
