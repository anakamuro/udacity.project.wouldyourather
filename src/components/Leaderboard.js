import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    if (!users) return null;

    const usersArr = Object.values(users).map(user => {
      const answersCount = Object.keys(user.answers).length;
      const questionCount = user.questions.length;
      const points = answersCount + questionCount;

      return { ...user, answersCount, questionCount, points };
    });

    usersArr.sort((user1, user2) => user2.points - user1.points);

    return (
      <div>
        LeaderBoard
        <ul>
          {usersArr.map(user => (
            <div key={user.id}>
              <li>{user.name}</li>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user}`}
                className="avatar"
              />
              <div>
                <h6>The numbers of answers: {user.answersCount}</h6>
                <h6> The numbers of questions: {user.questionCount}</h6>
                <h6>The total points {user.points}</h6>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

/*const mapDispatchToProps = dispatch => {
    return {
        setAuthedUser: id => dispatch(setAuthedUser(id)),
        receiveQuestions: questions => dispatch(receiveQuestions(questions))
    };
};*/

const mapStateToProps = state => {
  /*const questions = this.props;*/
  console.log(state.questions);
  return {
    users: state.users,
    questions: state.questions
    /* questions: state.questions*/
  };
};

export default connect(
  mapStateToProps
  // { setAuthedUser }
)(Leaderboard);
