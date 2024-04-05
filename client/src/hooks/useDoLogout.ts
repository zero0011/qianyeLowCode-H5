import React from "react";
import useGoLogin from "./useGoLogin";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "@/redux/user/actions";

function useDoLogout() {
  const dispatch = useDispatch();
  const goLogin =  useGoLogin();

  const doLogout = () => {
    dispatch(updateAccessToken(''));
    window.sessionStorage.setItem('beforeLoginUrl', '');
    goLogin();
  }
  
  return doLogout;
}

export default useDoLogout;