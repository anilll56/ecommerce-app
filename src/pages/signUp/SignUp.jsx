import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
function SignUp() {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [userType, setUserType] = useState("client");
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <div className="signUp-page">
      <div className="signUp-container">
        <div className="sign-up-checkboxs">
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="client"
              onChange={handleUserTypeChange}
              checked={userType === "client"}
            />
            <div>Client</div>
          </div>
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="freelancer"
              onChange={handleUserTypeChange}
              checked={userType === "freelancer"}
            />
            <div>Freelancer</div>
          </div>
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
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
                className="login-input"
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
              />
            </Form.Item>
            {userType === "freelancer" && (
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <EnvironmentOutlined className="site-form-item-icon" />
                  }
                  placeholder="Address"
                  size="large"
                  className="login-input"
                />
              </Form.Item>
            )}
            {userType === "freelancer" && (
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone"
                  size="large"
                  className="login-input"
                />
              </Form.Item>
            )}
            {userType === "freelancer" && (
              <Form.Item
                name="balance"
                rules={[
                  {
                    required: true,
                    message: "Please input your balance!",
                  },
                ]}
              >
                <Input
                  type="number"
                  prefix={
                    <DollarCircleOutlined className="site-form-item-icon" />
                  }
                  placeholder="Balance"
                  size="large"
                  className="login-input"
                />
              </Form.Item>
            )}
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
                >
                  Log in
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
