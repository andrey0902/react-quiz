import {
  ADD_QUESTIONS_TO_QUIZ,
  CREATE_QUIZ_ERROR,
  CREATE_QUIZ_START,
  CREATE_QUIZ_SUCCESS
} from "../actions/quiz-action-types";

const initState = {
  quiz: [],
  error: null,
  isCreateLoad: false,
  isCreated: null,
};

export default function quizCreateReducer (state = initState, action) {
  switch (action.type) {

    case ADD_QUESTIONS_TO_QUIZ: {
      console.log(action.payload.questionItem)
      return {
        ...state,
        quiz: [
          ...state.quiz,
          action.payload.questionItem
        ]
      }
    }
    case CREATE_QUIZ_START: {
      return {
        ...state,
        isCreateLoad: true,
        isCreated: null
      }
    }
    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case CREATE_QUIZ_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default: {
      return state
    }
  }
}