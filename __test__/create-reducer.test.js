import { createReducer } from '../src';
import { reducers } from './fixtures';
const {
  actionTypes,
  initialState,
  payloadAction,
  applyAction,
} = reducers;

describe('createReducer', () => {
  let reducer;

  beforeEach(() => {
    reducer = createReducer(actionTypes, initialState);
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle an action', () => {
    expect(reducer(undefined, payloadAction('hello'))).toEqual({
      message: 'hello'
    });
  });

  it('should handle $apply', () => {
    expect(reducer(undefined, applyAction(4))).toEqual({
      message: '',
      value: 8,
    });
  });
});
