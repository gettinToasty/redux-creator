import { createThunk } from '../src/redux-creator';
import { thunks } from './fixtures';

const {
  api,
  errorAction,
  payloadAction,
  thunkFixture,
  thunkFixtureErrors,
  thunkFixtureData,
  actionPayload,
} = thunks;

describe('createThunk :: Dataless thunks', () => {
  let thunk;

  beforeEach(() => {
    thunk = createThunk(api.get, payloadAction, errorAction);
  });

  it('returns a valid thunk', () => {
    expect(thunk).toEqual(thunkFixtureErrors);
  });

  it('works without an error handler', () => {
    thunk = createThunk(api.get, payloadAction);

    expect(thunk).toEqual(thunkFixture);
  });
});

describe('createThunk :: Thunks with data', () => {
  let thunk;

  beforeEach(() => {
    thunk = createThunk(api.update, payloadAction, errorAction);
  });

  it('returns a valid thunk', () => {
    expect(thunk(actionPayload)).toEqual(thunkFixtureData(actionPayload));
  });
});
