import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/quiz-action-types";

const initState = {
  token: null
};

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        token: action.payload.token
      };
      case AUTH_LOGOUT:
      return {
        token: null
      };

    default:
      return state;
  }
}

export default authReducer;