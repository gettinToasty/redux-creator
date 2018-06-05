import { configureStore, createReducer } from '../src';
import { stores, reducers } from './fixtures';
import thunk from 'redux-thunk';

describe('createStore', () => {
  let reducer;

  beforeEach(() => {
    reducer = createReducer({
      reducerCases: reducers.reducerCases,
      initialState: {},
    });
  });

  it('accepts middleware', () => {
    expect(configureStore(reducer, [thunk])).not.toThrow();
  });

  it('works without middleware', () => {
    expect(configureStore(reducer)).not.toThrow();
  });
});
