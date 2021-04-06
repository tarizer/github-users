import React, { useCallback, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import "./App.css";
// import USER from "./mock/user.json";
// import REPO from "./mock/repos.json";

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_USERS":
      return {
        ...state,
        isLoading: true,
        // error: "",
      };
    case "SEARCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: "",
      };
    case "SEARCH_USERS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: "/!\\ API limit reached",
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
        isLoading: false,
      };
    case "GET_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: "",
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_REPOS":
      return {
        ...state,
        isLoading: true,
        // error: ""
      };
    case "GET_REPOS_SUCCESS":
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
        error: "",
      };
    case "GET_REPOS_ERROR":
      return {
        ...state,
        isLoading: false,
        //error: "(Repos) --> User not found or API limit reached",
      };
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "REMOVE_ALERT":
      return {
        ...state,
        alert: null,
      };
    default:
      throw new Error("Action type not valid!");
  }
};

const App = () => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    error: "",
    alert: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users, user, repos, isLoading, error, alert } = state;

  // Search Github users
  const searchUsers = async (text) => {
    dispatch({ type: "SEARCH_USERS" });
    try {
      const response = await axios.get(
        // `https://api.github.com/search/users?q=${text}`
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({ type: "SEARCH_USERS_SUCCESS", payload: response.data.items });
    } catch (errorObject) {
      dispatch({ type: "SEARCH_USERS_ERROR" });
      console.log("Error: ", errorObject);
    }
  };

  // Clears users from state
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  // Get single Github user
  const getUser = useCallback(async (username) => {
    dispatch({ type: "GET_USER" });
    try {
      const response = await axios.get(
        // `https://api.github.com/users/${username}`
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // const response = { data: USER };
      dispatch({ type: "GET_USER_SUCCESS", payload: response.data });
    } catch (errorObject) {
      const error = "/!\\ User not found or API limit reached";
      dispatch({ type: "GET_USER_ERROR", payload: error });
      console.log("Error: ", error, errorObject);
    }
  }, []);

  // Get user repos
  const getUserRepos = useCallback(async (username) => {
    dispatch({ type: "GET_REPOS" });
    try {
      const response = await axios.get(
        // `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc`
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // const response = { data: REPO };
      dispatch({ type: "GET_REPOS_SUCCESS", payload: response.data });
    } catch (errorObject) {
      dispatch({ type: "GET_REPOS_ERROR" });
    }
  }, []);

  // Display alert for empty searches
  const displayAlert = (message, type) => {
    dispatch({ type: "SET_ALERT", payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: "REMOVE_ALERT" });
    }, 5000);
  };

  const removeAlert = () => {
    dispatch({ type: "REMOVE_ALERT" });
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
                error={error}
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
