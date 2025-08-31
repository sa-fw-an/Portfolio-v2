/**
 * Lazy loading utilities for performance optimization
 */

import React, { lazy, Suspense } from 'react';
import { isMobileDevice } from '../utils/deviceUtils.js';

/**
 * Create a lazy-loaded component with fallback
 * @param {Function} importFunc - Dynamic import function
 * @param {Object} options - Configuration options
 * @returns {React.Component} Lazy loaded component with Suspense wrapper
 */
export const createLazyComponent = (importFunc, options = {}) => {
  const {
    fallback = null,
    errorBoundary = false,
    loadOnMobile = true
  } = options;

  const LazyComponent = lazy(importFunc);

  return (props) => {
    // Skip loading on mobile if specified
    if (!loadOnMobile && isMobileDevice()) {
      return fallback;
    }

    const WrappedComponent = (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );

    return errorBoundary ? (
      <ErrorBoundary fallback={fallback}>
        {WrappedComponent}
      </ErrorBoundary>
    ) : WrappedComponent;
  };
};

/**
 * Simple error boundary for lazy components
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy component failed to load:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

/**
 * Lazy load heavy animations based on device capability
 * @param {Function} importFunc - Animation import function
 * @param {Object} fallbackProps - Props for fallback component
 * @returns {React.Component} Conditionally loaded component
 */
export const createConditionalLazyComponent = (importFunc, fallbackProps = {}) => {
  return createLazyComponent(importFunc, {
    loadOnMobile: false,
    fallback: <div {...fallbackProps} />
  });
};
