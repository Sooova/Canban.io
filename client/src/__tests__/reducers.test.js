import { reducer } from '../state/reducers';

import {
  TOGGLE_THEME,
  CHANGE_GREETING
} from '../state/actions';

import {
  initialState
} from '../state/config';

test('TOGGLE_THEME', () => {
  const newState = reducer(initialState, {
    type: TOGGLE_THEME
  });

  expect(newState.theme).toBe('dark');
});

test('CHANGE_GREETING', () => {
  const newState = reducer(initialState, {
    type: CHANGE_GREETING,
    payload: 'woof'
  });

  expect(newState.greeting).toBe('woof');
});