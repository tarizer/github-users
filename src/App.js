import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import * as actions from "./context/types";
import "./App.css";

import GithubState from "./context/github/GithubState";
// import USER from "./mock/user.json";
// import REPO from "./mock/repos.json";

const reducer = (state, action) => {
  switch (action.type) {
    // case actions.SEARCH_USERS:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     // error: "",
    //   };
    // case actions.SEARCH_USERS_SUCCESS:
    //   return {
    //     ...state,
    //     users: action.payload,
    //     isLoading: false,
    //     error: "",
    //   };
    // case actions.SEARCH_USERS_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: "/!\\ API limit reached",
    //   };
    // case actions.CLEAR_USERS:
    //   return {
    //     ...state,
    //     users: [],
    //     isLoading: false,
    //   };
    // case actions.GET_USER:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case actions.GET_USER_SUCCESS:
    //   return {
    //     ...state,
    //     user: action.payload,
    //     isLoading: false,
    //     error: "",
    //   };
    // case actions.GET_USER_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //   };
    // case actions.GET_REPOS:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     // error: ""
    //   };
    // case actions.GET_REPOS_SUCCESS:
    //   return {
    //     ...state,
    //     repos: action.payload,
    //     isLoading: false,
    //     error: "",
    //   };
    // case actions.GET_REPOS_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     //error: "(Repos) --> User not found or API limit reached",
    //   };
    case actions.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case actions.REMOVE_ALERT:
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
    //users: [],
    user: {},
    repos: [],
    isLoading: false,
    error: "",
    alert: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { alert } = state;
  // const { users, user, repos, isLoading, error, alert } = state;

  // Display alert for empty searches
  const displayAlert = (message, type) => {
    dispatch({ type: "SET_ALERT", payload: { message, type } });
    setTimeout(removeAlert, 5000);
  };

  const removeAlert = () => {
    dispatch({ type: "REMOVE_ALERT" });
  };

  // console.log(user);
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Users" icon="fab fa-github" />
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
                <User />
              </Route>
              <Route exact path="/">
                <Search
                  //searchUsers={searchUsers}
                  //clearUsers={clearUsers}
                  displayAlert={displayAlert}
                  removeAlert={removeAlert}
                  //showClearButton={users.length > 0 ? true : false}
                />
                <Users />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
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
