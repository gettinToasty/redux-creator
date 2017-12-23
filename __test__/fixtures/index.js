import axios from 'axios';

const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
const DOUBLE_VALUE = 'DOUBLE_VALUE';

const actionPayload = { message: 'hello' };

const noPayloadAction = () => ({
  type: UPDATE_MESSAGE,
});

const payloadAction = (payload) => ({
  type: UPDATE_MESSAGE,
  payload
});

const api = {
  get: () => axios.get('/messages'),
  update: data => axios.post('/messages', data),
};

const errorAction = (err) => {
  expect(err.err).toEqual('Error 500');
};

const applyAction = (payload) => ({
  type: DOUBLE_VALUE,
  payload
});

const initialState = { message: '' };

const doubleValue = (payload) => payload * 2;

const actionTypes = {
  [UPDATE_MESSAGE]: '{ "message": { "$set": $payload } }',
  [DOUBLE_VALUE]: {
    string: '{ "value": { "$apply": $callback } }',
    callback: doubleValue,
  },
};

export const actions = {
  UPDATE_MESSAGE,
  actionPayload,
  noPayloadAction,
  payloadAction,
};

export const thunks = {
  api,
  errorAction,
  payloadAction,
  actionPayload,
  UPDATE_MESSAGE,
};

export const reducers = {
  actionTypes,
  initialState,
  payloadAction,
  applyAction,
};

export const stores = {

};
