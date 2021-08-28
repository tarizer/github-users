import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import { NotFound } from "./pages/NotFound";
import "./App.css";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/alertState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Users" icon="fab fa-github" />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/info">
                  <Info />
                </Route>
                <Route exact path={`/user/:login`}>
                  <User />
                </Route>
                <Route exact path="/">
                  <Search />
                  <Users />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;

function Info() {
  return (
    <>
      <h1>Info</h1>
      <p>Simple Component inside App</p>
    </>
  );
}
