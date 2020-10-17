import {
  CLEAN_QUIZ_STATE,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS, RETRY_QUIZ, SET_QUIZ_ANSWER_STATE, SET_QUIZ_STATE
} from "../actions/quiz-action-types";

const initState = {
  quizList: [],
  loading: false,
  error: null,
  results: {}, // { [id]: 'success' | 'error'}
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_QUIZES: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case FETCH_QUIZES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: null
      }
    }
    case FETCH_QUIZES_ERROR: {
      return {
        ...state,
        ...action.payload
      }
    }

    case FETCH_QUIZ_START: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case FETCH_QUIZ_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case FETCH_QUIZ_ERROR: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SET_QUIZ_STATE: {
      const results = action.payload.results || {};
      return {
        ...state,
        results: {
          ...state.results,
          ...results
        },
        ...action.payload
      }
    }
    case SET_QUIZ_ANSWER_STATE: {
      return {
        ...state,
        answerState: action.payload.answerState
      }
    }
    case RETRY_QUIZ: {
      return {
        ...state,
        results: {}, // { [id]: 'success' | 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      }
    }
    case CLEAN_QUIZ_STATE: {
      return {
        ...initState
      }
    }
    default: {
      return state
    }
  }
}