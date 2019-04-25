import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom"; 
import './App.css';
import Saved from "./pages/Saved"
import Search from "./pages/Search"


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h3>Google Books</h3>
          <div className="links">
            <Link className="link" to="/saved">Saved Books</Link>
            <Link className="link" to="/search">Search</Link>
          </div>
        </header>

        <div className="title">
            <h1>(React) Google Books Search</h1>
            <h3>
              Search for and Save Books of Interest
            </h3>
        </div>

        <Switch>
          <Route
            exact path="/saved"
            component={Saved}
          />
          <Route
            exact path="/search"
            component={Search}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
