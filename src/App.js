import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';

export default class App extends Component {
  // C = 'jhon';
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          {/* <h1> my name is {this.C}</h1> */}
          <Routes>
            <Route
              path="/"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'general'}
                  key="general"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'technology'}
                  key="technology"
                />
              }
            />
            <Route
              path="/science"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'science'}
                  key="science"
                />
              }
            />
            <Route
              path="/business"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'business'}
                  key="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'entertainment'}
                  key="entertainment"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'sports'}
                  key="sports"
                />
              }
            />
            <Route
              path="/health"
              element={
                <NewsComponent
                  pageSize={9}
                  COUNTRY={'in'}
                  CATEGORY={'health'}
                  key="health"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
