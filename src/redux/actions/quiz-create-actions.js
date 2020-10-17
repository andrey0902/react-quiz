import {ADD_QUESTIONS_TO_QUIZ, CREATE_QUIZ_ERROR, CREATE_QUIZ_START, CREATE_QUIZ_SUCCESS} from "./quiz-action-types";
import QuizService from "../../core/quiz.service";

const quizListService = new QuizService();

export function addQuestionsToQuiz(questionItem) {
  return {
    type: ADD_QUESTIONS_TO_QUIZ,
    payload: {
      questionItem
    }
  }
}

export function createQuizStart() {
  return {
    type: CREATE_QUIZ_START
  }
}

export function createQuizSuccess() {
  return {
    type: CREATE_QUIZ_SUCCESS,
    payload: {
      isCreateLoad: false,
      isCreated: true,
      quiz: []
    }
  }
}

export function createQuizError(e) {
  return {
    type: CREATE_QUIZ_ERROR,
    payload: e
  }
}

export function createQuiz() {
  return (dispatch, getState) => {
    dispatch(createQuizStart());
    quizListService.createQuiz(getState().quizCreate.quiz)
      .then(
        () => {
          dispatch(createQuizSuccess())
        }
      ).catch(error => {
      dispatch(createQuizError(error))
    })
  }
}