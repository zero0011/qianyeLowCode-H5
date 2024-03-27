import React from "react";
import { useHistory } from "react-router";

function useGoBeforeLoginUrl() {
  const history = useHistory();

  const goBeforeLoginUrl = () => {
    const url = window.sessionStorage.getItem('beforeLoginUrl');
    if (!url || url.includes('/login')) {
      // 如果url不存在或者包含'/login'，则重定向到首页  
      history.push('/');
    } else {
      // 否则，跳转到之前的url，并清空sessionStorage中的值  
      history.push(url);
      window.sessionStorage.setItem('beforeLoginUrl', '');
    }
  }

  return goBeforeLoginUrl;
}

export default useGoBeforeLoginUrl;