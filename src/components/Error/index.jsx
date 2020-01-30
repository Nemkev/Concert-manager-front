import React from "react";
import { Redirect } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Redirect to="/login" />
          <h1>Something went wrong</h1>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
