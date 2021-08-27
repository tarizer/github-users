import React, { useContext } from "react";
import GithubContext from "../../context/github/githubContext";
// import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

function Repos() {
  const githubContext = useContext(GithubContext);
  const { repos } = githubContext;

  console.log("Repos", repos.length);

  return (
    <div className="card ">
      <h2>Top Repos</h2>
      <div className="grid-2">
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

// Repos.propTypes = {
//   repos: PropTypes.array.isRequired,
// };

export default Repos;
