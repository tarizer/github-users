import React, { useReducer, useCallback } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR,
  CLEAR_USERS,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
} from "../types";

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
    // dispatch({ type: "SEARCH_USERS" });
    dispatch({ type: SEARCH_USERS });
    try {
      const response = await axios.get(
        // `https://api.github.com/search/users?q=${text}`
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({ type: SEARCH_USERS_SUCCESS, payload: response.data.items });
    } catch (errorObject) {
      dispatch({ type: SEARCH_USERS_ERROR });
      console.log("Error: ", errorObject);
    }
  };

  // Clears users from state
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Get single Github user
  const getUser = useCallback(async (username) => {
    dispatch({ type: GET_USER });
    try {
      const response = await axios.get(
        // `https://api.github.com/users/${username}`
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // const response = { data: USER };
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (errorObject) {
      const error = "/!\\ User not found or API limit reached";
      dispatch({ type: GET_USER_ERROR, payload: error });
      console.log("Error: ", error, errorObject);
    }
  }, []);

  // Get user repos
  const getUserRepos = useCallback(async (username) => {
    dispatch({ type: GET_REPOS });
    try {
      const response = await axios.get(
        // `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc`
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        // , { headers: { "User-Agent": "Tarize" } }
      );
      // const response = { data: REPO };
      dispatch({ type: GET_REPOS_SUCCESS, payload: response.data });
    } catch (errorObject) {
      dispatch({ type: GET_REPOS_ERROR });
    }
  }, []);

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        repos,
        isLoading,
        error,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;
