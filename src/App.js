import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    isError: false,
    alert: null,
  };

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      // `https://api.github.com/search/users?q=${text}`
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, isLoading: false });
  };

  // Get single Github user
  getUser = async (username) => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        // `https://api.github.com/users/${username}`
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      this.setState({ user: response.data, isLoading: false, isError: false });
    } catch (error) {
      // console.log(error);
      // Can add a different error message for 403 & 404
      console.log("Error!", error);
      this.setState({ isLoading: false, isError: true });
    }
    // this.setState({ isLoading: false });
  };

  // Get user repos
  getUserRepos = async (username) => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        // `https://api.github.com/users/${username}`
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      this.setState({ repos: response.data, isLoading: false, isError: false });
    } catch (error) {
      // console.log(error);
      // add a different error message for 403 & 404?
      console.log("Error!", error);
      this.setState({ isLoading: false, isError: true });
    }
    // this.setState({ isLoading: false });
  };

  // Clears users from state
  clearUsers = () => this.setState({ users: [], isLoading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  removeAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    const { isLoading, isError, users, repos, user, alert } = this.state;
    // console.log(user);
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Users" icon="fab fa-github" user={user} />
          <div className="container">
            {this.state.alert && <Alert alert={alert} />}
            {/* <Alert alert={alert} /> */}

            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/info">
                <Info />
              </Route>
              <Route exact path={`/user/:login`}>
                <User
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  isLoading={isLoading}
                  isError={isError}
                />
              </Route>
              <Route exact path="/">
                <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  setAlert={this.setAlert}
                  removeAlert={this.removeAlert}
                  showClearButton={users.length > 0 ? true : false}
                />
                <Users isLoading={isLoading} users={users} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// async componentDidMount() {
//   this.setState({ isLoading: true });
//   const response = await axios.get(
//     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//   );
//   this.setState({ users: response.data, isLoading: false });
//   // console.log(response.data);
// }

function Info() {
  return (
    <>
      <h1>Info</h1>
      <p>Simple Component inside App</p>
    </>
  );
}
