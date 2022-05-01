"use strict";
// createStore<Func>(reducer<pure function>) -> return Store<Object> -> use factory function pattern
function createStore(reducer, initialState) {
  let _state = initialState;
  const getState = () => _state;
  //   fire and forget
  const dispatch = (action) => {
    _state = reducer(_state, action);
  };
  return { dispatch, getState };
}



export {createStore}