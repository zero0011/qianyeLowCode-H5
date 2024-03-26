// actions.js  

export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_USER_PERMISSION = 'UPDATE_USER_PERMISSION';

export function updateAccessToken(token: string) {
  return { type: UPDATE_ACCESS_TOKEN, token };
}

export function updateUserInfo(userInfo: any) {
  return { type: UPDATE_USER_INFO, userInfo };
}

export function updateUserPermission(permissionsList: any) {
  return { type: UPDATE_USER_PERMISSION, permissionsList };
}