import React from "react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

const Users = ({ loading, users }) => {
  loading && <Spinner />;
  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

/* Styles */
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gridGap: "1rem",
};

export default Users;
