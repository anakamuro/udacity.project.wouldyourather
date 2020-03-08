import React, { Component } from "react";
import { connect } from "react-redux";
//import { Dropdown, Image, Message, Button } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";
//import Home from "./Home";

class Login extends Component {
  /*
  state = {
    selectedUser: null,
    message: { hidden: true, content: "" }
  };*/

  render() {
    const { users } = this.props;
    const { questions } = this.props;

    if (!users) return null;

    const usersArray = Object.values(users);

    return (
      <div>
        <h2>{questions}</h2>
        <h3>Login</h3>
        <ul>
          {usersArray.map(user => (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.id}</li>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user}`}
                className="avatar"
              />
              <button onClick={() => this.props.setAuthedUser(user.id)}>
                Login
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => {
 return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Login);
