export const apiBaseUrlSelector = (state) => state.getIn([ 'app', 'global', 'configuration', 'urls', 'api' ]);
