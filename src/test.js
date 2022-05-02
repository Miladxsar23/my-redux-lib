import { createStore } from "./Redux";

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREAMENT":
      return Object.assign({}, state, {
        count: ++state.count,
      });
    case "DECREAMENT":
      return Object.assign({}, state, {
        count: --state.count,
      });
    default:
      return state;
  }
}
const store = createStore(reducer, { count: 0 });
const INCREAMENT = {
    type : "INCREAMENT"
}
const DECREAMENT = {
    type : "DECREAMENT"
}
store.subscribe(() => console.log(store.getState()))
store.dispatch(INCREAMENT)



