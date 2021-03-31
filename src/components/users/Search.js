import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({
  searchUsers,
  clearUsers,
  displayAlert,
  removeAlert,
  showClearButton,
}) => {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      displayAlert("Please enter a search term!", "light");
    } else {
      removeAlert();
      searchUsers(text);
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
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  displayAlert: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
};

export default Search;
