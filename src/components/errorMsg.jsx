// ErrorComponent.jsx

import React from 'react';

const ERROR = () => {
  return (
    <div className="container text-center">
      <h1>An error occurred while fetching news. Please try again later.</h1>
      {console.log('error')}
    </div>
  );
};

export default ERROR;
