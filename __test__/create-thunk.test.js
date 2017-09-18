import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { createThunk } from '../src/redux-creator';
import { thunks } from './fixtures';

const mockStore = configureMockStore([thunk]);

const {
  api,
  errorAction,
  payloadAction,
  actionPayload,
  UPDATE_MESSAGE,
} = thunks;

describe('createThunk :: Dataless thunks', () => {
  let thunkTest, store;

  beforeEach(() => {
    thunkTest = createThunk(api.get, payloadAction, errorAction);
    store = mockStore({ messages: '' });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns a functioning thunk', () => {
    nock('http://example.com/')
      .get('/messages')
      .reply(200, { payload: 'hello' });

    const expectedActions = [
      { type: UPDATE_MESSAGE }
    ];

    store.dispatch(thunkTest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('handles errors properly', () => {
    nock('http://example.com')
      .get('/messages')
      .reply(500, { err: 'Error 500' });

    thunkTest();
  });

  it('works without an error handler', () => {
    thunkTest = createThunk(api.get, payloadAction);

    expect(thunkTest()).not.toThrow();
  });
});

describe('createThunk :: Thunks with data', () => {
  let thunkTest, store;

  beforeEach(() => {
    thunkTest = createThunk(api.update, payloadAction, errorAction);
    store = mockStore({ messages: '' });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns a valid thunk', () => {
    nock('http://example.com/')
      .post('/messages')
      .reply(200, { payload: 'hello' });

    const expectedActions = [
      {
        type: UPDATE_MESSAGE,
        payload: actionPayload,
      }
    ];

    store.dispatch(thunkTest(actionPayload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });  });
});
