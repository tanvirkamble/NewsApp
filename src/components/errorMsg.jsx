// ErrorComponent.jsx

import React from 'react';

const ERROR = (props) => {
  let { message } = props;
  return (
    <div className="container text-center">
      <h1 color="black">
        An error occurred while fetching news. Please try again later.
      </h1>
      <p>{message.props}</p>
      {console.log('error')}
    </div>
  );
};

export default ERROR;
