import React, { Component } from "react";
const ReduxContext = React.createContext();

class Provider extends Component {
  state = {
    state: this.props.store.getState(),
    dispatch: this.props.store.dispatch,
  };
  componentDidMount() {
    this.props.store.subscribe(() => {
      if (this.state !== this.props.store.getState()) {
        this.setState({
          state: this.props.store.getState(),
        });
      }
    });
  }
  render() {
    const { state, dispatch } = this.state;
    return (
      <ReduxContext.Provider value={{ state, dispatch }}>
        {this.props.children}
      </ReduxContext.Provider>
    );
  }
}

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  function connectWrapper(Component) {
    function HOCConnectedComponent(props) {
      return (
        <ReduxContext.Consumer>
          {({ state, dispatch }) => {
            const mapStateToPropsObject = mapStateToProps(state) || {};
            const mapDispatchToPropsObject = mapDispatchToProps(dispatch) || {};
            const mergePropsObject = mergeProps(mapStateToPropsObject, mapDispatchToPropsObject) || {}
            return (
              <Component
                {...props}
                {...mapStateToPropsObject}
                {...mapDispatchToPropsObject}
                {...mergePropsObject}
              />
            );
          }}
        </ReduxContext.Consumer>
      );
    }
    return HOCConnectedComponent(Component);
  }
  return connectWrapper;
}

export { Provider, connect };
