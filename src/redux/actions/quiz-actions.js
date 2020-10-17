
import QuizService from "../../core/quiz.service";
import {
  CLEAN_QUIZ_STATE,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS, RETRY_QUIZ, SET_QUIZ_ANSWER_STATE, SET_QUIZ_STATE
} from "./quiz-action-types";

const quizService = new QuizService();
export const fetchQuizes = () => {

  return (dispatch) => {
    const quizList = [];
    dispatch(fetchQuizesStart());

    quizService.getListQuiz()
      .then(
        (response) => {
          Object.keys(response.data)
            .forEach(
              (key, index) => {
                quizList.push({
                  id: key,
                  name: `Test ${index + 1}`,
                })
              }
            );
          dispatch(fetchQuizesSuccess(quizList));
        }
      )
      .catch(error => {
        dispatch(fetchQuizesError(error));
        console.log('error', error);
      })
  }
};

export default function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES
  }
}
export  function fetchQuizesSuccess(quizList) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: {
      quizList,
      loading: false
    }
  }
}
export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: {
      quizList: [],
      error: error
    },

  }
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START,
    payload: {
      loading: true
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: {
      quiz,
      loading: false,
    }
  }
}

export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    payload: {
      quiz: null,
      error: error
    },

  }
}

export function setQuizAnswerState(payload) {
  return {
    type: SET_QUIZ_ANSWER_STATE,
    payload,
  }
}

export function fetchQuiz(id) {
  return (dispatch) => {
    dispatch(fetchQuizStart());

    quizService.getQuiz(id)
      .then(response => {
        dispatch(fetchQuizSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchQuizError(error));
        console.log(error);
      })
  }
}


export function isQuizFinished(activeQuestion, quiz) {
  return activeQuestion + 1 === quiz.length;
}

export function setAnswerState(answerId, type) {
  return setQuizAnswerState({
    answerState: {[answerId]: type},
  })
}

export function quizSetState(data) {
  return {
    type: SET_QUIZ_STATE,
    payload: {
      ...data
    }
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const quiz = getState().quiz;

    const error = 'error';
    const success = 'success';
    if (quiz.answerState) {
      const key = Object.keys(quiz.answerState)[0];
      if (quiz.answerState[key] === success) {
        return;
      }
    }
    const question = quiz.quiz[quiz.activeQuestion];
    const results = {...quiz.results};

    if (question.rightAnswerId === answerId) {
      dispatch(setAnswerState(answerId, success));
      if(!results[question.id]) {
        results[question.id] = success;
      }

      const timeout = window.setTimeout(() => {

        if (isQuizFinished(quiz.activeQuestion, quiz.quiz)) {
          dispatch(quizSetState({
            results,
            isFinished: true
          }));
        } else {
          dispatch(quizSetState({
            results,
            activeQuestion: quiz.activeQuestion + 1,
            answerState: null
          }));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = error;
      dispatch(quizSetState({
        results,
        answerState: {[answerId]: error}
      }));
    }
  }

}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  }
}

export function clearQuizState() {
  return {
    type: CLEAN_QUIZ_STATE
  }
}