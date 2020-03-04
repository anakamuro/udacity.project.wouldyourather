import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Login from "./Login";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Navbar from "./Navbar";
import PollResult from "./PollResult";
import NotFound from "./NotFound";


class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authedUser } = this.props;

    return !authedUser ? (
      <Router>
        <Route component={Login} />
      </Router>
    ) : (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/questions/:question_id" component={PollResult} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/login" component={Login} />
            <Route path="/questions/:bad_id" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
