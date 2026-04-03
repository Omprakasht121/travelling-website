import React, { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
          <AlertTriangle className="w-12 h-12 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-800">
            Something went wrong
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            This section failed to load. Try refreshing or click the button below.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
