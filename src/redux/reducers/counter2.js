import {ADD_NUMBER} from "../actions/actions-type";

const initialStat = {
  counter: 0
};
export default function counter2Reducer(state = initialStat, action) {
  switch (action.type) {
    case ADD_NUMBER: {
      return {
        counter: state.counter + action.payload
      }
    }
    default: {
      return state;
    }
  }

}