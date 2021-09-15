/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

import A from './A';
import StyledButton from './StyledButton';
import Wrapper from './Wrapper';
import { Button } from '@material-ui/core';

function Buttons(props) {
  // Render an anchor tag
  let button = (
    <A href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </A>
  );
  
 

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <Button 
        className="shadow-none rounded-0"
        variant="contained"
        size={props.size} 
        style={{
          backgroundColor: '#ffbc2a',
          textDecoration: 'none',
        }}
        onClick={props.handleRoute}>
          {Children.toArray(props.children)}
      </Button>
    );
  }

  return <Wrapper>{button}</Wrapper>;
}

Buttons.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Buttons;
