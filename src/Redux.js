"use strict";
// createStore<Func>(reducer<pure function>) -> return Store<Object> -> use factory function pattern
function createStore(reducer, initialState) {
  let _state = initialState;
  let _listeners = [];
  const getState = () => _state;
  //   fire and forget
  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach(listenerFn => {
      listenerFn()
    })
  };
  const subscribe = (listenerFn) => {
    _listeners.push(listenerFn)
  }
  return { dispatch, getState, subscribe };
}



export {createStore}