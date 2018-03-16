import { get } from './request';
export async function getConfiguration () {
  const { body: { urls, keys } } = await get('/config/config.json');
  const { body: version } = await get('/version.json');
  return {
    urls,
    keys,
    version: {
      version: version.version,
      versionFull: `${version.version} build ${version.build} (${version.timestamp})`
    }
  };
}

