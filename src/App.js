import './App.css';

import React from 'react';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const Api_Key = process.env.REACT_APP_API_KEY;
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'general'}
                key="general"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'technology'}
                key="technology"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/science"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'science'}
                key="science"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/business"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'business'}
                key="business"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'entertainment'}
                key="entertainment"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'sports'}
                key="sports"
                RequiredApi={Api_Key}
              />
            }
          />
          <Route
            path="/health"
            element={
              <NewsComponent
                pageSize={5}
                COUNTRY={'in'}
                CATEGORY={'health'}
                key="health"
                RequiredApi={Api_Key}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
