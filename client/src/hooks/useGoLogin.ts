import React from "react";
import { useHistory } from "react-router";

function useGoLogin() {

  const history =  useHistory();

  const goLogin = () => {
    // 将路由fullpath 保存在缓存中，用于登录完成后跳转
		const indexOf = window.location.href.indexOf('#/')
		const currentUrl = window.location.href.slice(indexOf + 1, window.location.href.length);
    window.sessionStorage.setItem('beforeLoginUrl', currentUrl);
    history.push('/login');
  }

  return goLogin;
}

export default useGoLogin;