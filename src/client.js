/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { init } from './actions/global';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import reducer from './reducers';

import { getRoutes } from './routes';

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// add the router reducers to the store on the 'routing' key
const rootReducer = combineReducers({
  app: reducer,
  routing: routerReducer
});

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that returns the next state tree, given the current state tree and an action to handle.
 * @param {any} initialState
 * @return A redux store.
 */
export function createOurStore (theHistory, reducers, initialState) {
  const middleware = [];
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  if (__DEVELOPMENT__) {
    return newCreateStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return newCreateStore(
    reducers,
    initialState
  );
}

async function boot () {
  // Create redux store
  const initialState = fromJS({});
  const store = createOurStore(browserHistory, rootReducer, initialState);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(browserHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Clear state on start
  ourHistory.replace(ourHistory.createLocation({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null // Remove state
  }));
  // Load session from local storage.
  await store.dispatch(init());

  // Render application
  ReactDOM.render(
    <StyleRoot>
      <Provider store={store}>
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));
}

boot();

