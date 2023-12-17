import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';

export default class App extends Component {
  // C = 'jhon';
  render() {
    return (
      <div>
        <NavBar />
        {/* <h1> my name is {this.C}</h1> */}
        <NewsComponent pageSize={9} COUNTRY={'in'} CATEGORY={'science'} />
      </div>
    );
  }
}
