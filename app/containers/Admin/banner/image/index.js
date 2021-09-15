import React from 'react';
import './index.css';
import styled from 'styled-components';
import { image_url } from '../../../../config/urls';

const Container = styled.div`
  display: flex;
`;
export default class Image extends React.Component {
  render() {
    // console.log("image: ", this.props);
    return (
      <Container>
        <div>
          <img
            className="bannerImage"
            src={`${image_url.concat(this.props.image.image)}`}
            alt="banner"
          />
        </div>
      </Container>
    );
  }
}
