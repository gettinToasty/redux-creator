import { createStore, applyMiddleware } from 'redux';
import update from 'immutability-helper';

export const createAction = ACTION_TYPE => payload => ({
  type: ACTION_TYPE,
  payload,
});

export const createThunk =
  (apiCall, action, errorHandler = () => {}) => data => dispatch => {
    return apiCall(data)
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

const parseActionObj = (actionObj, payload) => {
  const modifiedString = actionObj.string.replace(
    /"\$apply": \$callback/,
    ` "$set": ${JSON.stringify(actionObj.callback(payload))}`
  );
  return JSON.parse(modifiedString);
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

export const createReducer = 
  (actionTypes, initialState = {}) => (state = initialState, action) => {
    let reducerObj = {};
    Object.keys(actionTypes).forEach((actionType) => {
      reducerObj[actionType] = (payload) => (
        update(state, parseAction(actionTypes[actionType], payload))
      );
    });
    return reducerObj[action.type] ?
      reducerObj[action.type](action.payload) : state;
};
