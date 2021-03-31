import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import "./App.css";

const App = () => {
  // const initialState = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   isLoading: false,
  //   isError: false,
  //   alert: null,
  // };
  // const [state, setState] = useState(initialState);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alert, setAlert] = useState(null);

  // const { isLoading, isError, users, repos, user, alert } = state;

  // Search Github users
  const searchUsers = async (text) => {
    setIsLoading(true);
    const response = await axios.get(
      // `https://api.github.com/search/users?q=${text}`
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // setState({ users: response.data.items, isLoading: false });
    setUsers(response.data.items);
    setIsLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        // `https://api.github.com/users/${username}`
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // setState({ user: response.data, isLoading: false, isError: false });
      setUser(response.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      // console.log(error);
      // Can add a different error message for 403 & 404
      console.log("Error!", error);
      // setState({ isLoading: false, isError: true });
      setIsLoading(false);
      setIsError(true);
    }
    // setState({ isLoading: false });
  };

  // Get user repos
  const getUserRepos = async (username) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        // `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc`
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // setState({ repos: response.data, isLoading: false, isError: false });
      setRepos(response.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      // console.log(error);
      // add a different error message for 403 & 404?
      console.log("Error!", error);
      // setState({ isLoading: false, isError: true });
      setIsLoading(false);
      setIsError(true);
    }
    // setState({ isLoading: false });
  };

  // Clears users from state
  const clearUsers = () => {
    // setState({ users: [], isLoading: false });
    setUsers([]);
    setIsLoading(false);
  };

  const displayAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const removeAlert = () => {
    setAlert(null);
  };

  // console.log(user);
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Users" icon="fab fa-github" user={user} />
        <div className="container">
          {alert && <Alert alert={alert} />}

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route exact path={`/user/:login`}>
              <User
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                isLoading={isLoading}
                isError={isError}
              />
            </Route>
            <Route exact path="/">
              <Search
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                displayAlert={displayAlert}
                removeAlert={removeAlert}
                showClearButton={users.length > 0 ? true : false}
              />
              <Users isLoading={isLoading} users={users} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
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
