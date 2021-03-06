import { _getUsers, _getQuestions, _saveQuestionAnswer } from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  console.log("info", { authedUser, qid, answer });
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
