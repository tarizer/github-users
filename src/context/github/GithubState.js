import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
// import {
//   SEARCH_USERS,
//   SEARCH_USERS_SUCCESS,
//   SEARCH_USERS_ERROR,
//   CLEAR_USERS,
//   GET_USER,
//   GET_USER_SUCCESS,
//   GET_USER_ERROR,
//   GET_REPOS,
//   GET_REPOS_SUCCESS,
//   GET_REPOS_ERROR,
// } from "../types";

//import * as types from "../types";

const GithubState = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    error: "",
    //alert: null,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const { users, user, repos, isLoading, error } = state;

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

  return (
    <GithubContext.Provider
      value={{ users, user, repos, isLoading, error, searchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;
