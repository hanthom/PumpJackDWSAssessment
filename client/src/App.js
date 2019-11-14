import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LandingPage from './components/landingPage';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <h1> Pumpjacks User Viewing </h1>
          <Switch>
            <Route path="/landingPage" component={LandingPage} />
            <Redirect from="/" exact to="/landingPage" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
