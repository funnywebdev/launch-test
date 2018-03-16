import * as api from '../api/user';
import { makeApiActionCreator } from './utils';

export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';

export const fetchUser = makeApiActionCreator(api.fetchUser, USER_FETCH_START, USER_FETCH_SUCCESS, USER_FETCH_ERROR);
