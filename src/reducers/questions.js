import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER_TO_QUESTION
} from "./../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ADD_ANSWER_TO_QUESTION: {
      console.log("Action:", action);
      const { qid, answer, user } = action;

      const votes = state[qid][answer].votes;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: votes.concat([user])
          }
        }
      };
    }

    default:
      return state;
  }
}
