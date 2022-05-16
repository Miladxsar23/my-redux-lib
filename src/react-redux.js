import React, { Component } from "react";
const ReduxContext = React.createContext();

class Provider extends Component {
  state = {
    state: this.props.store.getState(),
    dispatch: this.props.store.dispatch
  };
  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState({
        state : this.props.store.getState()
      })
    });
  }
  render() {
    const { state, dispatch } = this.state;
    return (
      <ReduxContext.Provider value={{ state: state, dispatch: dispatch }}>
        {this.props.children}
      </ReduxContext.Provider>
    );
  }
}

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  function connectWrapper(Component) {
    function HOCConnectedComponent(props = {}) {
      return (
        <ReduxContext.Consumer>
          {({ state, dispatch }) => {
            const mapStateToPropsObject = mapStateToProps(state) || {};
            const mapDispatchToPropsObject = mapDispatchToProps(dispatch) || {};
            return (
              <Component
                {...props}
                {...mapStateToPropsObject}
                {...mapDispatchToPropsObject}
              />
            );
          }}
        </ReduxContext.Consumer>
      );
    }
    return HOCConnectedComponent;
  }
  return connectWrapper;
}

export { Provider, connect };
