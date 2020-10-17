import { combineReducers } from 'redux'
import counterReducer from "./reducers/counter";
import counter2Reducer from "./reducers/counter2";
import quizReducer from "./reducers/quiz";
import quizCreateReducer from "./reducers/quiz-create";
import authReducer from "./reducers/auth";

export default combineReducers({
  counter: counterReducer,
  counter2: counter2Reducer,
  quiz: quizReducer,
  quizCreate: quizCreateReducer,
  auth: authReducer
})