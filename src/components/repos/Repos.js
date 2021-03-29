import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

function Repos({ repos }) {
  console.log("Repos", repos.length);

  return repos.map((repo) => <RepoItem repo={repo} />);
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
