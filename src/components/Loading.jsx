import LoadingGif from '../img/Gear.gif';

import React from 'react';

const Loading = () => {
  return (
    <div className="text-center">
      {console.log('loader intiated')}
      <img
        src={LoadingGif}
        alt=""
        srcset=""
        style={{ height: '100px', width: '200px' }}
      />
      <h3 className="text-center">Loading....</h3>
    </div>
  );
};

export default Loading;
