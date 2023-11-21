import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import { Login } from "../../api/HandleApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  const login = () => {
    Login(loginInputs.email, loginInputs.password).then((response) => {
      if (response.status === 200) {
        navigate("/home");
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div>
          <h1>Log In</h1>
        </div>
        <div className="signUp-form">
          <Form
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
            }}
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
                className="login-input"
                onChange={(e) => {
                  setLoginInputs({ ...loginInputs, email: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
                className="login-input"
                onChange={(e) => {
                  setLoginInputs({ ...loginInputs, password: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  className="login-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={
                    !clientReady ||
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                  onClick={() => {
                    login();
                  }}
                >
                  Log in
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="login-footer">
          <div>Dont have an account?</div>
          <div>
            <Button
              type="link"
              size="large"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
