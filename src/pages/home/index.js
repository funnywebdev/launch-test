import React, { Component } from 'react';
import User from '../user';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedUser: '',
      open: false
    };
  }

  onClickUser (user) {
    this.setState({
      selectedUser: user,
      open: true
    });
  }

  onCloseDrawer () {
    this.setState({
      selectedUser: '',
      open: false
    });
  }

  render () {
    const users = [ 'GrahamCampbell', 'fabpot', 'weierophinney', 'rkh', 'josh' ];
    const { open, selectedUser } = this.state;
    const style = {
      margin: 12
    };
    return (
      <div>
        <AppBar title='Home' />
          {
            users.map((user, index) => (
              <RaisedButton
                key={index}
                label={user}
                primary
                style={style}
                onClick={() => this.onClickUser(user)} />
            ))
          }
        <Drawer open={open} width='100%' >
          <User userName={selectedUser} onClose={() => this.onCloseDrawer()}/>
        </Drawer>
      </div>
    );
  }
}
