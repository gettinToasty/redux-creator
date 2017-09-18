import axios from 'axios';

const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

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

const initialState = { message: '' };

const actionTypes = {
  [UPDATE_MESSAGE]: '{ "message": { "$set": payload } }',
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
};

export const stores = {

};
