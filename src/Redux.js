"use strict";
// createStore<Func>(reducer<pure function>) -> return Store<Object> -> use factory function pattern
function createStore(reducer, initialState) {
  let _state = initialState;
  let _listeners = [];
  //   fire and forget
  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach((listenerFn) => {
      listenerFn();
    });
  };
  const subscribe = (listenerFn) => {
    _listeners.push(listenerFn);
  };
  const getState = () => {
    return _state;
  };
  return { dispatch, getState, subscribe };
}

function combineReducers(combineObject) {
  function rootReducer(state, action) {
    let result = {};
    for (let key of Object.keys(combineObject)) {
      const targetState = state[key]
      result[key] = combineObject[key](targetState, action);
    }
    return result;
  }
  return rootReducer;
}

export { createStore, combineReducers };
