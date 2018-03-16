import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    const { children } = this.props;
    return (
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    );
  }
}

