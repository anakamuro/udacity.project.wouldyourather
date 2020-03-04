import { formatQuestion } from "../utils/helper";
import { addQuestionToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    const question = formatQuestion(optionOneText, optionTwoText, author);
    // Add question to question
    // Add question ID to users questions
    dispatch(addQuestion(question));
    dispatch(addQuestionToUser(question));
  };
}

export function addAnswerToQuestion(user, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    qid,
    answer,
    user
  };
}

/*
export function handleAnswerQuestion(question_id, answer, user_id) {
  // Update question to include new answers (Quetions)
  // Update user to include answers (User)er
  return{
    type: HANDLE_ANSWER_QUESTION,

  }
}*/
