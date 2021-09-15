import React, { Component } from 'react';
import './image.css';

class Media extends Component {
  render() {
    return (
      <a href={this.props.url} rel="noopener" target="_blank">
        <img
          className="image p-3"
          width="250px"
          height="250px"
          src={this.props.src}
          alt={this.props.alt}
        />
      </a>
    );
  }
}

export default Media;

