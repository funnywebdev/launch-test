import * as api from '../api/global';

export const CONFIGURE = 'CONFIGURE';

export function init () {
  return async (dispatch) => {
    const configuration = await api.getConfiguration();
    dispatch({ type: CONFIGURE, configuration });
  };
}
