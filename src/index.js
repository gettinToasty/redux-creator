import { createStore, applyMiddleware } from 'redux';
import update from 'immutability-helper';

export const createAction = (ACTION_TYPE) => (payload) => ({
  type: ACTION_TYPE, payload
});

const noop = (state) => state;
const deserialize = (deserializer) => (resp) => deserializer(resp);
const dispatchAction = (dispatch, action) => (resp) => {
  dispatch(action(resp));
  return resp;
};

export const createThunk = ({
  api,
  action,
  errorHandler = noop,
  deserializer = noop,
}) => (data) => (dispatch) => {
    return api(data)
      .then(deserialize(deserializer))
      .then(dispatchAction(dispatch, action))
      .catch(dispatchAction(dispatch, errorHandler));
};

export const configureStore =
  (Reducer, middlewares = []) => (preloadedState = {}) => (
    createStore(Reducer, preloadedState, applyMiddleware(...middlewares))
);

const digAndSet = (obj, keys, value) => {
  let next = keys.shift();
  obj[next] = keys.length > 0 ? digAndSet(obj[next], keys, value) : value;
  return obj;
};

const objectifyJSON = (string, value) => {
  const keys = string.match(/(\$?[a-zA-Z0-9]+)/g);
  const obj = JSON.parse(string.replace('$callback', '""'));
  return digAndSet(obj, keys.slice(0, keys.length - 1), value);
};

const parseActionObj = ({ string, callback }, payload) => (
  objectifyJSON(string, callback)
);

const parseActionString = (actionString, payload) => {
  const modifiedString = actionString.replace(
    /\$payload/, JSON.stringify(payload)
  );
  return JSON.parse(modifiedString);
};

const parseAction = (action, payload) => (
  typeof action === 'object' ?
    parseActionObj(action, payload) : parseActionString(action, payload)
);

export const createReducer = ({
  reducerCases,
  initialState = {}
}) => {
  const reducerObj = {};
  Object.keys(reducerCases).forEach((actionType) => {
    reducerObj[actionType] = (state, payload) => (
      update(state, parseAction(reducerCases[actionType], payload))
    );
  });
  return (state = initialState, { type, payload }) => (
    reducerObj[type] ? reducerObj[type](state, payload) : state
  );
};
