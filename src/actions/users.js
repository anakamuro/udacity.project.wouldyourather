import { saveQuestionAnswer } from "../utils/api";
import { addAnswerToQuestion } from "../actions/questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const addQuestionToUser = question => {
  return {
    type: ADD_QUESTION_TO_USER,
    question
  };
};

export const addAnswerToUser = (authedUser, qid, answer) => {
  return {
    type: ADD_ANSWER_TO_USER,
    qid,
    answer,
    authedUser
  };
};

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authedUser, qid, answer));
    dispatch(addAnswerToQuestion(authedUser, qid, answer));
    console.log(authedUser, qid, answer);
    return saveQuestionAnswer(authedUser, qid, answer).catch(e => {
      console.warn("Error in handleSaveQuestionAnswer:", e);
    });
  };
}

//  TODO: MAKE A REDUCER TO ADD QUETION TO USER LIST OF QUESTIONS
