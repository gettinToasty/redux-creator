import { createReducer } from '../src';
import { reducers } from './fixtures';
const {
  reducerCases,
  initialState,
  payloadAction,
  applyAction,
} = reducers;

describe('createReducer', () => {
  let reducer;

  beforeEach(() => {
    reducer = createReducer({ reducerCases, initialState });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle an action', () => {
    expect(reducer(undefined, payloadAction('hello'))).toEqual({
      message: 'hello', value: 4
    });
  });

  it('should handle $apply', () => {
    expect(reducer(undefined, applyAction())).toEqual({
      message: '', value: 8
    });
  });
});
