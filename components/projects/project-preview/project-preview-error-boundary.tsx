'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ProjectPreviewErrorBoundary extends Component<
  { children: ReactNode; projectName: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Project preview error', error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[12rem] items-center justify-center bg-[#10242c] p-6 text-sm text-white/70">
          Preview unavailable for {this.props.projectName}. Reload the page to try again.
        </div>
      );
    }
    return this.props.children;
  }
}
