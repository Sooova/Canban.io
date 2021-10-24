import { useReducer } from 'react';
import {
  TOGGLE_THEME,
  CHANGE_GREETING
} from './actions';

const toggleThemeReducer = ({ state }) => {
  return {
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  };
}

const changeGreetingReducer = ({ state, action }) => {
  return {
    ...state,
    greeting: action.payload
  }
};

const ACTION_MAP = {
  [TOGGLE_THEME]: toggleThemeReducer,
  [CHANGE_GREETING]: changeGreetingReducer
};

export const reducer = (state, action) => ACTION_MAP[action.type]({ state, action });

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
