import LoadingGif from './img/Gear.gif';

import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={LoadingGif}
          alt=""
          srcset=""
          style={{ height: '200px', width: '200px', margin: '100px' }}
        />
        <h3 className="text-center">Loading....</h3>
      </div>
    );
  }
}
