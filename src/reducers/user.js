import { fromJS } from 'immutable';
import * as userActions from '../actions/user';
import { fetchingState } from '../constants';

const initialStats = {
  info: {}
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {
    case userActions.USER_FETCH_START:
      return state.setIn([ 'info', 'state' ], fetchingState.FETCHING);
    case userActions.USER_FETCH_SUCCESS:
      const newState = state.setIn([ 'info', 'state' ], fetchingState.LOADED);
      return newState.setIn([ 'info', 'data' ], fromJS(action.data));
    case userActions.USER_FETCH_ERROR:
      return state.setIn([ 'info', 'state' ], fetchingState.ERROR);

    default:
      return state;
  }
};
