import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    this.state.text && this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };
  render() {
    const { clearUsers, showClearButton } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search users.."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClearButton && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
        <h1>{this.state.text}</h1>
      </div>
    );
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
  };
}

export default Search;
