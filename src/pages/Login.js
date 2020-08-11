import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Layout } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import { fakeAuth } from '@/router';

const { Content } = Layout;

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' } };
  const [ buttonDisabled, setButtonDisabled ] = useState(true);
  const [ form ] = Form.useForm();

  function onFinish(e) {
    e.preventDefault();
    form.validateFields()
    .then(() => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
    })
  }

  const onValuesChange = (changedValues, allValues) => {
    const list = Object.keys(allValues);
    const isValid = list.length === 2 && list.every((key) => allValues[key] || (allValues[key] || '').toString().trim());
    setButtonDisabled(!isValid);
  }

  return (
    <Layout className="login-wrap">
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100vh' }}
        >
          <Col flex="0 0 328px">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <img src={require('@/assets/logo.png')} alt="logo" style={{ width: 200, height: 58 }} />
            </div>
            <Form
              form={form}
              hideRequiredMark
              colon={false}
              labelAlign="left"
              name="login"
              onValuesChange={onValuesChange}
              {...formLayout}
            >
              <Form.Item
                name="email"
                rules={[
                  { message: '이메일을 입력하세요' },
                ]}
              >
                <Input placeholder="이메일 입력" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { message: '비밀번호를 입력하세요' },
                ]}
                style={{ marginBottom: 20 }}
              >
                <Input.Password onPressEnter={onFinish} placeholder="비밀번호 입력" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  block
                  onClick={onFinish}
                  disabled={buttonDisabled}
                  style={{ marginBottom: 14 }}
                >
                  로그인
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Login;
