import React from 'react';
import './Error.scss';

const Error = ({error}) => {
  if (!error) {
    return null
  }
  return (
    <div className="error-message">
      Something bad has happened. Please try again later.
    </div>
  );
};

export default Error;
