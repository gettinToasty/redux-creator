# Redux Creator

This is a lightweight library designed to help reduce the amount of boilerplate usually required in Redux workflows. There are several easy to use functions that can help reduce the size of your redux/ducks files by dozens of lines!

# Installation

Redux Creator is incredibly easy to install, simply run one of these lines in your terminal:

NPM: `npm install redux-creator --save`

Yarn: `yarn add redux-creator`

# Usage

## `createAction`

This is a fairly straightforward function that takes an action type as a method and returns a redux function. The only opinion it holds is that the data passed into the action body is referred to as payload.

### Example
```js
const UPDATE_MESSAGE = 'messages/UPDATE_MESSAGE';

export const updateMessage = createAction(UPDATE_MESSAGE); 
/*=> (payload) => ({
  type: 'messages/UPDATE_MESSAGE',
  payload
}) */
```

## `createThunk`

Another easy to use function when making API calls in your redux cycle. This function takes an API util function and an action as arguments, and returns the default 'thunk' pattern of asynchronous actions. Thunks return promisable objects by default, and this helper is no different.

### Example
```js
export const sendMessage = createThunk(MessageAPI.send, updateMessage);
/* => (data) => (dispatch) => {
  MessageAPI.send(data)
    .then((resp) => {
      dispatch(updateMessage(resp));
      return resp;
    })
} */
```

`createThunk` can also be used to handle errors, if a third argument is passed in as an error handler. This works by simply substituting a no-op function if there is no third argument:

```js
export const sendMessage = createThunk(MessageAPI.send, updateMessage, updateMessageErrors);
/* => (data) => (dispatch) => {
  MessageAPI.send(data)
    .then((resp) => {
      dispatch(updateMessage(resp));
      return resp;
    })
    .catch((err) => {
      dispatch(updateMessageErrors(err));
      return err;
    })
} */
```

## `configureStore`

This is a helper method which takes in the root reducer in your redux and an array of middleware and creates a store with those middlewares applied.

### Example
```js
export default configureStore(RootReducer, [thunk])
// => (preloadedState = {}) => createStore(RootReducer, preloadedState, applyMiddleware(thunk))
```

## `createReducer`

This is the most complicated of the helper functions but also has the biggest payoff. Reducers are often bulky and hard to read, and `createReducer` aims to create a prettier looking reducer that's much easier to grok. This is the most opinionated of the helper methods, and a somewhat specific syntax must be followed in order for it to properly work.

### Example
```js
const UPDATE_MESSAGE = 'messages/UPDATE_MESSAGE';
const UPDATE_MESSAGE_ERRORS = 'messages/UPDATE_MESSAGE_ERRORS';

const messageReducerActions = {
  [UPDATE_MESSAGE]: '{ "currentUser": { "message": { "$set": payload } } }',
  [UPDATE_MESSAGE_ERRORS]: '{ "currentUser": { "errors": { "message": { "$set": payload } } } }'
}

export default createReducer(messageReducerActions, initialState);
/* => (state = initialState, action) => {
  let reducerObj = {
    'messages/UPDATE_MESSAGE': (payload) => update(state, { currentUser: { message: { $set: payload } }),
    'messages/UPDATE_MESSAGE_ERRORS': (payload) => update(state, { currentUser: { errors: { message: { $set: payload } } } })
  };
  return reducerObj[action.type](action.payload) || state;
}
*/
```

The pattern is as follows: `createReducer` accepts an Object of action types as keys and JSON strings as values. The JSON strings use the same syntax as the `update` method from the `immutability-helper` library, which is used internally as shown, but the strings must be valid JSON to work. After calling for an `update` operation like `$set` or `$merge`, the value of that key must be marked as `$payload`. Because the value is just a string it won't throw any invalid JSON syntax errors until it is parsed by `createReducer`, at which time `$payload` will be substituted with the proper value. This is also the reason `createAction` uses the naming convention of `$payload` on its action data; `createReducer` relies on `action.payload` to function properly.

### Handling Apply

If you wish to use `immutability-helper`'s built-in `$apply` method it is important to note the format of the callback. `createReducer` expects a callback that recieves the payload as it's only argument, so be sure to make closures of your other parameters if they are required by wrapping the callback in a function that only takes in the payload.

## MIT License

Copyright (c) 2017 Sean Beyer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
