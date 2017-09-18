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

const thunkFixtureErrors = data => dispatch => {
  const errorHandler = errorAction;
  api.get(data)
    .then((resp) => {
      dispatch(payloadAction(resp));
      return resp;
    })
    .catch((err) => {
      dispatch(errorHandler(err));
      return err;
    });
};

const thunkFixture = data => dispatch => {
  const errorHandler = () => {};
  api.get(data)
    .then((resp) => {
      dispatch(payloadAction(resp));
      return resp;
    })
    .catch((err) => {
      dispatch(errorHandler());
      return err;
    });
};

const thunkFixtureData = data => dispatch => {
  const errorHandler = errorAction;
  api.update(data)
    .then((resp) => {
      dispatch(payloadAction(resp));
      return resp;
    })
    .catch((err) => {
      dispatch(payloadAction(err));
      return err;
    });
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
  thunkFixture,
  thunkFixtureErrors,
  thunkFixtureData,
  payloadAction,
  actionPayload,
  UPDATE_MESSAGE,
};

export const reducers = {

};

export const stores = {

};
