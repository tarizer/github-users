import PropTypes from "prop-types";
import React from "react";

function RepoItem({ repo }) {
  return (
    <div className="card">
      <h3 key={repo.id}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h3>
    </div>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
