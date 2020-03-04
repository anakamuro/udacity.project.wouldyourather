import React, { Component } from "react";
import { connect } from "react-redux";
import { Progress, Container, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class PollResult extends Component {
  //
  render() {
    const { question, users, authedUser } = this.props;
    if (!question) {
      return <Redirect to="/questions/:bad_id" />;
    }

    const answers = users[authedUser].answers;
    const userAnswer = answers[question.id];

    const question1Votes = question.optionOne.votes.length;
    const question2Votes = question.optionTwo.votes.length;
    const totalVotes = question1Votes + question2Votes;

    return (
      <div>
        <h2>RESULT</h2>
        <div>Would you rather?</div>
        <Container>
          <div key={question.id}>
            {" "}
            <h3>{question.author} asks Would you rather?</h3>
            <img
              src={users[question.author].avatarURL}
              alt={`Avatar of ${users}`}
              className="avatar"
            />
            {userAnswer === "optionOne" && (
              <Label as="a" color="red" ribbon>
                User Answer
              </Label>
            )}
            <span>
              <Progress
                value={question1Votes}
                total={totalVotes}
                label={question.optionOne.text}
                progress="ratio"
              />
            </span>
            {userAnswer === "optionTwo" && (
              <Label as="a" color="red" ribbon>
                User Answer
              </Label>
            )}
            <span>
              <Progress
                value={question2Votes}
                total={totalVotes}
                label={question.optionTwo.text}
                progress="ratio"
              />
            </span>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { question_id } = props.match.params;
  const question = state.questions[question_id];
  /*const questions = this.props;*/
  return {
    users: state.users,
    questions: state.questions,
    question,
    authedUser: state.authedUser
    /* questions: state.questions*/
  };
};

export default connect(
  mapStateToProps
  // { setAuthedUser }
)(PollResult);
