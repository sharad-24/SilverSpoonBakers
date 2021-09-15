import React from 'react';
import Feed from './components/Feed';
import './components/image.css';
import {image_url} from '../../config/urls'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <a
            href="https://www.instagram.com/silverspoon_bakers_cafe/"
            rel="noopener"
            target="_blank"
          >
            <img
              className="image p-3"
              width="250px"
              height="250px"
              src={`${image_url}cupcake_instagram.jpg`}
              alt={this.props.alt}
            />
            <img
              className="image p-3"
              width="250px"
              height="250px"
              src={`${image_url}cupcake_instagram.jpg`}
              alt={this.props.alt}
            />
            <img
              className="image p-3"
              width="250px"
              height="250px"
              src={`${image_url}cupcake_instagram.jpg`}
              alt={this.props.alt}
            />
            <img
              className="image p-3"
              width="250px"
              height="250px"
              src={`${image_url}cupcake_instagram.jpg`}
              alt={this.props.alt}
            />
            <img
              className="image p-3"
              width="250px"
              height="250px"
              src={`${image_url}cupcake_instagram.jpg`}
              alt={this.props.alt}
            />
          </a>
          {/* N.B. VPN/NAT source ip addresses can trigger Instagram rate limits. */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default function instagram(props) {
  return (
    <ErrorBoundary>
      <Feed
        userName={props.username}
        className="Feed"
        classNameLoading="Loading"
        limit="5"
      />
    </ErrorBoundary>
  );
}
