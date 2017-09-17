import { createAction } from '../src/redux-creator';
import { actions } from './fixtures';

const {
  UPDATE_MESSAGE,
  actionPayload,
  noPayloadAction,
  payloadAction,
} = actions;

describe('createAction :: Action without payload', () => {
  let action;

  beforeEach(() => {
    action = createAction(UPDATE_MESSAGE);
  });

  it('matches a payload-less action fixture', () => {
    expect(action()).toEqual(noPayloadAction());
  });

  it('returns an action without a payload', () => {
    expect(action().payload).toEqual(undefined);
  });
});

describe('createAction :: Action with payload', () => {
  let action;

  beforeEach(() => {
    action = createAction(UPDATE_MESSAGE);
  });

  it('matches a payload action fixture', () => {
    expect(action(actionPayload)).toEqual(payloadAction(actionPayload));
  });

  it('returns an action with a payload', () => {
    expect(action(actionPayload).payload).toEqual(actionPayload);
  });
});
