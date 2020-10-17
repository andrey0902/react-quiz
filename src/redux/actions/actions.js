import {ADD, ADD_NUMBER, FETCH_QUIZES, SUB} from "./actions-type";

export const addNumber = (number) => ({type: ADD, payload: number});
export const subNumber = (number) => ({type: SUB, payload: number});
export const addNumberCounter = (number) => ({type: ADD_NUMBER, payload: number});
export const asyncAdd = (number) => {
  return ((dispatch) => {
    setTimeout(() => {
      dispatch(addNumber(number))
    }, 1000)
  })
};
