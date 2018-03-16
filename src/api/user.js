import { get } from './request';

export async function fetchUser (baseUrl, userName) {
  const url = `${baseUrl}/users/${userName}`;
  const { body } = await get(url);
  return body;
}
