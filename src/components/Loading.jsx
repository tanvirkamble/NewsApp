import LoadingGif from './img/Gear.gif';

import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
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
  }
}
