import { fromJS } from 'immutable';
import * as actions from '../actions/global';

const initialStats = {
  configuration: {}
};

export default (state = fromJS(initialStats), action) => {
  switch (action.type) {
    case actions.CONFIGURE:
      return state.mergeIn([ 'configuration' ], fromJS(action.configuration));
    default:
      return state;
  }
};
