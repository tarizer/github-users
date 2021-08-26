import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  githubContext.isLoading && <Spinner />;
  return (
    <div style={userStyle}>
      {githubContext.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  //isLoading: PropTypes.bool.isRequired,
  //users: PropTypes.array.isRequired,
};

/* Styles */
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gridGap: "1rem",
};

export default Users;
