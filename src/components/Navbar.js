import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setAuthedUser, unsetAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";
import "./navbar.css";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.unsetAuthedUser();
  };
  render() {
    const { authedUser, users } = this.props;
    return (
      <div>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/add">NEW QUESTION</Link>
          </li>
          <li>
            <Link to="/leaderboard">LEADERBOARD</Link>
          </li>
          <li>
            <Link to="/" onClick={this.logout}>
              LOG OUT
            </Link>{" "}
          </li>
          <li id="user-info">
            <span>
              Hello, {users[authedUser].name}
              <img
                src={users[authedUser].avatarURL}
                alt={`Avatar of ${users[authedUser]}`}
                className="avatar"
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  /*const questions = this.props;*/
  return {
    users: state.users,
    authedUser: state.authedUser
    /* questions: state.questions*/
  };
};

export default connect(
  mapStateToProps,
  { setAuthedUser, unsetAuthedUser }
)(Navbar);
