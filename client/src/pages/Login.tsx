import React, { useState } from "react"
import { Form, type FormProps, Input } from 'antd';
import userModel from "@/lib/userModel";
import { useDispatch } from 'react-redux';
import { updateAccessToken, updateUserInfo } from '@/redux/user/actions';
import { errorMessage } from "@/utils";
import useGoBeforeLoginUrl from "@/hooks/useGoBeforeLoginUrl";
import "@/style/login.less"

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const [type, setType] = useState('login');
  // 使用Form.useForm()创建表单实例  
  const [form] = Form.useForm();  
  const dispatch = useDispatch();
  const goBeforeLoginUrl = useGoBeforeLoginUrl(); // 自定义hook实现路由跳转

  const switchType = () => {
    if (type === 'login') {
      setType('register')
    } else {
      setType('login')
    }
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    type === 'login' ? doLogin(values) : doRegister(values)
  };

  // 手动触发表单的提交  
  const doSubmit = () => {
    form.validateFields()
      .then(values => {
        // 验证通过，执行提交逻辑
        onFinish(values);
      })
      .catch(() => {
        errorMessage('请正确填写表单')
      })
  }

  const doLogin = async (values: FieldType) => {
    try {
      const data = await userModel.doLogin(values);
      dispatch(updateAccessToken(data.access_token));
      dispatch(updateUserInfo(data.userInfo));
      goBeforeLoginUrl();
    } catch(err) {
      console.log(err);
    }
  }

  const doRegister = async (values: FieldType) => {
    try {
      const data = await userModel.doRegister(values);
      dispatch(updateAccessToken(data.access_token));
      dispatch(updateUserInfo(data.userInfo));
      goBeforeLoginUrl();
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="login">
      <div className="page-login">
        <div className="login-page-inner">
          <p className="title">qianyeLowCode-H5</p>
          <Form
            name="basic"
            form={form}
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