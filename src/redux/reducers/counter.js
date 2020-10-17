import {ADD, SUB} from "../actions/actions-type";

const initialStat = {
  counter: 0
};
export default function counterReducer(state = initialStat, action) {
  switch (action.type) {
    case ADD: {
      return {
        counter: state.counter + action.payload
      }
    }
    case SUB: {
      return {
        counter: state.counter - action.payload
      }
    }
    default: {
      return state;
    }
  }
}