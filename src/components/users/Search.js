import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";

const Search = ({
  //searchUsers,
  clearUsers,
  displayAlert,
  removeAlert,
  showClearButton,
}) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      displayAlert("Please enter a search term!", "light");
    } else {
      removeAlert();
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search users.."
          value={text}
          onChange={onChange}
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
      <h1>{text}</h1>
    </div>
  );
};

Search.propTypes = {
  //searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
};

export default Search;
