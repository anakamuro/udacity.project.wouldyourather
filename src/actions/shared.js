import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { getInitialData } from "../utils/api";
//import { addAnswerToQuestion } from "./questions";
//import { addAnswerToUser } from "./users";
//import { _saveQuestionAnswer } from "../utils/_DATA";
//import { removeAnswerToQuestion } from "./questions";
//import { removeAnswerToUser } from "./users";

export const handleInitialData = () => {
  return dispatch => {
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
};

/*export function manageVote(author, qid, answer) {
  return dispatch => {
    dispatch(addAnswerToQuestion(author, qid, answer));
    dispatch(addAnswerToUser(author, qid, answer));
    return _saveQuestionAnswer({
      author: author,
      qid: qid,
      answer: answer
    }).catch(() => {
      dispatch(removeAnswerToQuestion(author, qid, answer));
      dispatch(removeAnswerToUser(author, qid, answer));
    });
  };
}*/
