import React, { Component } from "react";
import { handleSaveQuestionAnswer } from "../actions/users";

import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    validSubmit: false,
    showAnswered: false,
    isLoading: false
  };

  onAnsweredToggleChange = e => {
    const selected = e.target.value;
    this.setState({ showAnswered: selected === "answered" });
  };

  render() {
    const {
      answered,
      unanswered,
      authedUser,
      handleSaveQuestionAnswer,
      history
    } = this.props;
    const { showAnswered } = this.state;
    const { users } = this.props;
    if (!users) return null;
    
    const questionDesc = (a, b) => b.timestamp - a.timestamp

    const answeredArr = Object.values(answered);
    const uansweredArr = Object.values(unanswered);
    answeredArr.sort(questionDesc);
    uansweredArr.sort(questionDesc);

    const shownQuestions = showAnswered ? answeredArr : uansweredArr;

    return (
      <div>
        <h2>Home</h2>
        <select onChange={this.onAnsweredToggleChange}>
          <option value="unanswered">Unanswered</option>
          <option value="answered">Answered</option>
        </select>

        {shownQuestions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            users={users}
            history={history}
            authedUser={authedUser}
            handleSaveQuestionAnswer={handleSaveQuestionAnswer}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const answers = {};
  const answered = {};
  const unanswered = {};

  Object.keys(state.questions).forEach(question => {
    if (state.users[state.authedUser].answers[question] !== undefined) {
      answered[question] = state.questions[question];
    } else {
      unanswered[question] = state.questions[question];
    }
  });

  Object.values(state.users).forEach(user => {
    answers[user.id] = user.answers;
  });

  /*const questions = this.props;*/
  return {
    users: state.users,
    questions: state.questions,
    answers,
    answered,
    unanswered,
    authedUser: state.authedUser
    /* questions: state.questions*/
  };
};

// Update question answer for user
const mapDispatchToProps = dispatch => {
  return {
    handleSaveQuestionAnswer: (authedUser, qid, answer) =>
      dispatch(handleSaveQuestionAnswer(authedUser, qid, answer))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

