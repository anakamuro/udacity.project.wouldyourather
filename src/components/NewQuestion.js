import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "./../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    validationSubmit: false,
    isLoading: false
  };

  handleOptionOneChange = e => {
    e.preventDefault();
    this.setState({
      optionOneText: e.target.value
    });
  };
  handleOptionTwoChange = e => {
    e.preventDefault();
    this.setState({
      optionTwoText: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { author } = this.props;

    this.setState({ isLoading: true });
    this.props.handleAddQuestion(optionOneText, optionTwoText, author);
    this.setState({
      option1: "",
      option2: "",
      validationSubmit: true
    });
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    if (this.state.validationSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Would you rather?</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={optionOneText}
            placeholder="Please write option one text here!"
            onChange={this.handleOptionOneChange}
          />
          <br />
          <input
            value={optionTwoText}
            placeholder="Please write option two text here"
            onChange={this.handleOptionTwoChange}
          />
          <br />
          <button onSubmit={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  author: state.authedUser
});

const mapDispatchToProps = dispatch => {
  return {
    handleAddQuestion: (optionOne, optionTwo, author) =>
      dispatch(handleAddQuestion(optionOne, optionTwo, author))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);
