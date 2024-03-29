import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './LoaderButton.css';

export default function LoaderButton({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
          {isLoading && <Spinner animation="border" style={{marginRight: 10 + 'px'}}/>}
      {props.children}
    </Button>
  );
}
