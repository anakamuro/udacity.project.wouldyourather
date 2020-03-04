import {
  RECEIVE_USERS,
  ADD_QUESTION_TO_USER,
  ADD_ANSWER_TO_USER
} from "./../actions/users";

const receiveUsers = (state, action) => ({
  ...state,
  ...action.users
});

/*
  //Question Object
  {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  }
*/
const addAnswerToUser = (state, action) => {
  const { qid, authedUser, answer } = action;
  const user = state[authedUser];

  return {
    ...state,
    [authedUser]: {
      ...user,
      answers: { ...user.answers, [qid]: answer }
    }
  };
};
const addQuestionToUser = (state, action) => {
  const { question } = action;
  const question_id = question.id;
  const user_id = question.author;
  const user = state[user_id];

  return {
    ...state,
    [user_id]: {
      ...user,
      questions: [...user.questions, question_id]
    }
  };
};

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return receiveUsers(state, action);
    case ADD_QUESTION_TO_USER:
      return addQuestionToUser(state, action);
    case ADD_ANSWER_TO_USER:
      return addAnswerToUser(state, action);
    default:
      return state;
  }
}
