import * as types from "../types";

const GithubReducer = (state, action) => {
  switch (action.type) {
    case types.SEARCH_USERS:
      return {
        ...state,
        isLoading: true,
        // error: "",
      };
    case types.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: "",
      };
    case types.SEARCH_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "/!\\ API limit reached",
      };
    case types.CLEAR_USERS:
      return {
        ...state,
        users: [],
        isLoading: false,
      };
    case types.GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: "",
      };
    case types.GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.GET_REPOS:
      return {
        ...state,
        isLoading: true,
        // error: ""
      };
    case types.GET_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
        error: "",
      };
    case types.GET_REPOS_ERROR:
      return {
        ...state,
        isLoading: false,
        //error: "(Repos) --> User not found or API limit reached",
      };
    case types.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case types.REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      throw new Error("Action type not valid!");
  }
};

export default GithubReducer;
