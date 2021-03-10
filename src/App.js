import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, isLoading: false });
  };

  clearUsers = () => this.setState({ users: [], isLoading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    // setTimeout(() => {
    //   this.setState({ alert: null });
    // }, 2000);
  };
  removeAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    const { isLoading, users, alert } = this.state;
    return (
      <div className="App">
        <Navbar title="Github Users" icon="fab fa-github" />
        <div className="container">
          {this.state.alert && <Alert alert={alert} />}
          {/* <Alert alert={alert} /> */}
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            setAlert={this.setAlert}
            removeAlert={this.removeAlert}
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
