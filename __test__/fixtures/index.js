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

const applyAction = () => ({
  type: DOUBLE_VALUE,
});

const initialState = { message: '', value: 4 };

const doubleValue = (currentVal) => currentVal * 2;

const reducerCases = {
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
  reducerCases,
  initialState,
  payloadAction,
  applyAction,
};

export const stores = {

};
