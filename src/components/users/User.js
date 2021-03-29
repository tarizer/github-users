import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const User = ({ getUser, user, getUserRepos, repos, isLoading, isError }) => {
  const { login } = useParams();

  // Wait for useEffect to get new user info before rendering
  if (login !== user.login && !isError) isLoading = true;

  useEffect(() => {
    getUser(login);
    getUserRepos(login);
  }, [getUser, getUserRepos, login]);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    // login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  // isLoading && <Spinner />;

  if (isLoading) return <Spinner />;
  if (isError) return <span>User does not exist or API limit reached</span>;

  return (
    <>
      {/* <h1>User: {login} </h1> */}
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:
      {hireable ? (
        <i className="fas fa-check text-success p-1" />
      ) : (
        <i className="fas fa-times-circle text-danger p-1" />
      )}
      {/* <h1>User: {user.login} </h1> */}
      {/* {console.log(user)} */}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt="Avatar"
            style={{ width: "150px" }}
          />
          <h2>{name}</h2>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong>{" "}
                  <a href={blog} target="_blank" rel="noopener noreferrer">
                    {blog}
                  </a>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-danger">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      {console.log("user.login", user.login)}
      {console.log("login", login)}
    </>
  );
};

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default User;

// const memoizedGetUser = useCallback(
//   (login) => {
//     getUser(login);
//   },
//   [getUser]
// );

// login = useMemo(() => login, [login]);
