import React, { useEffect } from 'react';  
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useGoLogin from '@/hooks/useGoLogin';
import userModel from '@/lib/userModel';

function isUserLoggedIn(): boolean {    
  // 返回true表示已登录，返回false表示未登录
  const loginStatus = userModel.checkLoginState();
  return loginStatus;
}

interface PrivateRouteProps extends RouteProps {  
  component: React.ComponentType<any>;  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => { 
  const goLogin = useGoLogin();

  useEffect(() => {
    // 检查用户是否登录，如果没有则重定向到登录页面 
    if (!isUserLoggedIn()) {   
      goLogin();
    }
  }, []); // 空数组确保只在组件挂载时运行一次
  
  return isUserLoggedIn() ? (  
    <Route {...rest} render={(props) => <Component {...props} />} />  
  ) : (  
    <Redirect to={{ pathname: '/login' }} />  
  );
};

export default PrivateRoute;