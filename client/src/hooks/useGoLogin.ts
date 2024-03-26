import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "@/redux/actions";

function useGoLogin() {

  const history =  useHistory();
  const dispatch = useDispatch();

  const goLogin = () => {
    // 将路由fullpath 保存在缓存中，用于登录完成后跳转
		const currentUrl = window.location.pathname;
    window.sessionStorage.setItem('beforeLoginUrl', currentUrl);
    dispatch(updateAccessToken(''));
    history.push('/login');
  }

  return goLogin;
}

export default useGoLogin;