import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import selector from './selector';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/navigation/arrow-back';
import { ListItem } from 'material-ui/List';
import { fetchingState } from '../../constants';

@connect(selector, (dispatch) => ({
  fetchUser: bindActionCreators(userActions.fetchUser, dispatch)
}))
export default class User extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map,
    userName: PropTypes.string,
    onClose: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { userName } = this.props;
    if (userName) {
      this.onFetchUser(userName);
    }
  }

  componentWillReceiveProps (nextProps) {
    const { userName } = this.props;
    if (userName !== nextProps.userName && nextProps.userName) {
      this.onFetchUser(nextProps.userName);
    }
  }

  onFetchUser (userName) {
    const { fetchUser } = this.props;
    fetchUser(userName);
  }

  renderUser () {
    const { user } = this.props;
    if (user.get('state') === fetchingState.FETCHING) {
      return <CircularProgress />;
    } else if (user.get('data')) {
      return (
      <ListItem
        leftAvatar={<Avatar src={user.getIn([ 'data', 'avatar_url' ])} />}
        primaryText={user.getIn([ 'data', 'name' ])}
        secondaryText={user.getIn([ 'data', 'location' ])}/>
      );
    }
    return <span>No Data</span>;
  }

  render () {
    const { onClose } = this.props;
    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton onClick={onClose}><BackButton /></IconButton>}
          title='User'/>
        {
          this.renderUser()
        }
      </div>
    );
  }
}
