import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-gray-900 to-black text-white"
        >
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-400 mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button
            themeColor="primary"
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg"
          >
            Refresh Page
          </Button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 