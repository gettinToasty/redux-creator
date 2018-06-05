import { createStore, applyMiddleware } from 'redux';
import update from 'immutability-helper';

export const createAction = ACTION_TYPE => payload => ({
  type: ACTION_TYPE,
  payload,
});

const noop = (state) => state;

export const createThunk = ({
  api,
  action,
  errorHandler = noop,
  deserializer = noop
}) => data => dispatch => {
    return api(data)
      .then(resp => deserializer(resp))
      .then(resp => {
        dispatch(action(resp));
        return resp;
      })
      .catch(err => {
        dispatch(errorHandler(err));
        return err;
      });
};

export const configureStore =
  (Reducer, middlewares = []) => (preloadedState = {}) => (
    createStore(Reducer, preloadedState, applyMiddleware(...middlewares))
);

const digAndSet = (obj, keys, value) => {
  let next = keys.shift();
  if (keys.length > 0) {
    obj[next] = digAndSet(obj[next], keys, value);
  } else {
    obj[next] = value;
  }
  return obj;
};

const objectifyJSON = (string, value) => {
  const keys = string.match(/(\$?[a-zA-Z0-9]+)/g);
  const obj = JSON.parse(string.replace('$callback', '""'));
  return digAndSet(obj, keys.slice(0, keys.length - 1), value);
};

const parseActionObj = (actionObj, payload) => {
  return objectifyJSON(actionObj.string, actionObj.callback);
};

const parseActionString = (actionString, payload) => {
  const modifiedString = actionString.replace(
    /\$payload/,
    JSON.stringify(payload)
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
}) => (state = initialState, action) => {
    let reducerObj = {};
    Object.keys(reducerCases).forEach((actionType) => {
      reducerObj[actionType] = (payload) => (
        update(state, parseAction(reducerCases[actionType], payload))
      );
    });
    return reducerObj[action.type] ?
      reducerObj[action.type](action.payload) : state;
};
