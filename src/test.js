import * as React from "react";
import "./styles.css";
import { createStore } from "./redux";
import { Provider, connect } from "./react-redux";
const initialState = { active: false, text: "salam" };
function reducer(state, action) {
  if (action.type === "CHANGE_STATUS") {
    return { ...state, active: !state.active };
  }
  return state;
}
const store = createStore(reducer, initialState);

const App = () => {
  return (
    <Provider store={store}>
      <ToggleTextContainer />
    </Provider>
  );
};

const ToggleText = ({ onToggle, text, active }) => {
  const classLs = active ? "active" : "";
  return (
    <div className={classLs} onClick={onToggle}>
      {text}
    </div>
  );
};
const mapStateToToggleTextProps = (state) => {
  return {
    active: state.active,
    text: state.text
  };
};

const mapDispatchToToggleTextProps = (dispatch) => {
  return {
    onToggle: () => {
      dispatch({
        type: "CHANGE_STATUS"
      });
    }
  };
};

const ToggleTextContainer = connect(
  mapStateToToggleTextProps,
  mapDispatchToToggleTextProps
)(ToggleText);

export default App;
