import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    isLoading: false,
  };
  searchUsers = async (text) => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, isLoading: false });
  };
  clearUsers = () => this.setState({ users: [], isLoading: false });

  render() {
    const { isLoading, users } = this.state;
    return (
      <div className="App">
        <Navbar title="Github Users" icon="fab fa-github" />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClearButton={users.length > 0 ? true : false}
          />
          <Users isLoading={isLoading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;

// async componentDidMount() {
//   this.setState({ isLoading: true });
//   const response = await axios.get(
//     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//   );
//   this.setState({ users: response.data, isLoading: false });
//   // console.log(response.data);
// }
