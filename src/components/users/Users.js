import React, { Component } from "react";
import UserItem from "./UserItem";

export class Users extends Component {
  state = {
    users: [
      {
        id: 49348194,
        login: "tarizer",
        avatar_url: "https://avatars.githubusercontent.com/u/49348194?v=4",
        html_url: "https://github.com/tarizer",
      },
      {
        id: 810438,
        login: "gaearon",
        avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
        html_url: "https://github.com/gaearon",
      },
      {
        id: 5550850,
        login: "bradtraversy",
        avatar_url: "https://avatars.githubusercontent.com/u/5550850?v=4",
        html_url: "https://github.com/bradtraversy",
      },
    ],
  };
  render() {
    const { users } = this.state;

    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

/* Styles */
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gridGap: "1rem",
};

export default Users;
