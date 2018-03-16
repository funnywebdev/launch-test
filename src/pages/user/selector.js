import { createStructuredSelector } from 'reselect';
import { userSelector } from '../../selectors/user';

export default createStructuredSelector({
  user: userSelector
});
