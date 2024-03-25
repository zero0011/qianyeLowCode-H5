// actions.js  

export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

export function updateAccessToken(token: string) {
  return {
    type: UPDATE_ACCESS_TOKEN,
    payload: token
  };
}