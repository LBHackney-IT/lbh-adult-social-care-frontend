import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/combinedReducers';

let store;

function initStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(thunk));
}

export const initializeStore = (preloadedState) => {
  let appStore = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    appStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return appStore;
  // Create the store once in the client
  if (!store) store = appStore;

  return appStore;
};

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
