import React, { useState } from "react"
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import userModel from "@/lib/userModel";
import { useDispatch } from 'react-redux';
import { updateAccessToken } from '@/redux/actions';
import "@/style/login.less"

type FieldType = {
  username: string;
  password: string;
};

function Login() {

  const [type, setType] = useState('login');
  const dispatch = useDispatch();

  // TODO: 登录和注册
  const doSubmit = () => {

  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
  }

  const switchType = () => {
    if (type === 'login') {
      setType('register')
    } else {
      setType('login')
    }
  }

  return (
    <div className="login">
      <div className="page-login">
        <div className="login-page-inner">
          <p className="title">qianyeLowCode-H5</p>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input className="login-input" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password className="login-input" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <div className="btn-hover-container">
                <div className="btn-hover" onClick={doSubmit}>{type === 'login' ? '登录' : '注册'}</div>
              </div>
            </Form.Item>
          </Form>

          <div className="switch-do-type marginB20" onClick={switchType}>
            <i className="iconfont icon-iconfontzhizuobiaozhun47"></i>
            <span>{type === 'login' ? '立即注册' : '马上登录'}</span>
          </div>

          <p className="login-page-bottom">Copyright © 2024 <span className="primary">qianyeQuark-H5版权所有</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login