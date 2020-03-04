import React, { Component } from "react";
import { Link } from "react-router-dom";

class Question extends Component {
  state = {
    selected: "",
    ToPollResult: ""
  };

  handleChange = e => {
    console.log("Handle change", e.target.name);
    this.setState({
      selected: e.target.name
    });
  };

  handleQuestionSubmit = e => {
    e.preventDefault();
    const {
      question,
      authedUser,
      handleSaveQuestionAnswer,
      history
    } = this.props;
    const { selected } = this.state;
    // Call action to add answers, question, user
    handleSaveQuestionAnswer(authedUser, question.id, selected);
    this.setState({
      ...this.defaultState,
      toPollResult: true
    });
    history.push("/questions/" + question.id);
  };

  render() {
    const { question, users } = this.props;
    const { selected } = this.state;

    console.log("Selected:", selected);

    return (
      <div key={question.id}>
        {" "}
        <Link to={`/questions/${question.id}`}>
          <h3>{question.author} asks Would you rather?</h3>
        </Link>
        <img
          src={users[question.author].avatarURL}
          alt={`Avatar of ${users}`}
          className="avatar"
        />
        <form onSubmit={this.handleQuestionSubmit}>
          <input
            name="optionOne"
            type="radio"
            checked={selected === "optionOne"}
            onChange={this.handleChange}
          />
          <label htmlFor="optionOne">{question.optionOne.text}</label>
          <br />
          <input
            name="optionTwo"
            type="radio"
            checked={selected === "optionTwo"}
            onChange={this.handleChange}
          />
          <label htmlFor="optionTwo">{question.optionTwo.text}</label>
          <br />
          <button>Result</button>
          {/* <th> {question.optionOne.votes}</th>
          <th>{question.optionTwo.votes}</th> */}
        </form>
      </div>
    );
  }
}

export default Question;
