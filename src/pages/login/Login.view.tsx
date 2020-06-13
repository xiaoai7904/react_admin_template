import React, { ReactElement } from 'react';
import { Col, Row, Form, Checkbox, Input, Button } from 'antd';
import { CommonProps } from '@/types/CommonProps';
import { useLoginHook } from './Login.hook';

import './Login.less';

export interface LoginProps extends CommonProps {}

export const Login = (props: LoginProps): ReactElement => {
  const { onFinish, username, form } = useLoginHook(props);

  return (
    <div className="login">
      <Row className="login-row" justify="center" align="middle">
        <Col className="login-item" xs={24} sm={24} md={24} lg={24}>
          <div className="login-form">
            <h1 className="login-form-title">账号登录</h1>
            <Form form={form} wrapperCol={{ span: 24 }} initialValues={{ remember: !!username }} name="basic" onFinish={onFinish} onFinishFailed={() => {}}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                <div>
                  <Input placeholder="请输入账号" defaultValue={username} />
                  <i className="login-form-user--icon"></i>
                </div>
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <div>
                  <Input.Password placeholder="请输入密码" />
                  <i className="login-form-password--icon"></i>
                </div>
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住账号</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
