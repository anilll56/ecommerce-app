import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Form, Input, Button, Checkbox } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SignUpEcommerce } from "../../api/HandleApi";
import {
  UserOutlined,
  LockOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [signUpInputs, setSignUpInputs] = useState({
    userType: "seller",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    balance: "",
  });
  const handleUserTypeChange = (e) => {
    setSignUpInputs({ userType: e.target.value });
  };

  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  console.log(signUpInputs, "signUpInputs");
  const handleSignUp = () => {
    if (
      signUpInputs.userType === "seller" ||
      signUpInputs.userType === "buyer"
    ) {
      SignUpEcommerce(
        signUpInputs.username,
        signUpInputs.email,
        signUpInputs.password,
        signUpInputs.userType,
        signUpInputs.phone,
        signUpInputs.balance,
        signUpInputs.address,
        signUpInputs.phone
      ).then((res) => {
        if (res.status === 200) {
          navigate("/login");
          console.log(res, "res111111111111111");
        }
      });
    }
  };
  return (
    <div className="signUp-page">
      <div className="signUp-container">
        <div className="sign-up-checkboxs">
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="seller"
              onChange={handleUserTypeChange}
              checked={signUpInputs.userType === "seller"}
            />
            <div>Seller</div>
          </div>
          <div>
            <Checkbox
              type="radio"
              name="userType"
              value="buyer"
              onChange={handleUserTypeChange}
              checked={signUpInputs.userType === "buyer"}
            />
            <div>Buyer</div>
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
                onChange={(e) => {
                  setSignUpInputs({
                    ...signUpInputs,
                    username: e.target.value,
                  });
                }}
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
                onChange={(e) => {
                  setSignUpInputs({ ...signUpInputs, email: e.target.value });
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
                  setSignUpInputs({
                    ...signUpInputs,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Item>
            {signUpInputs.userType === "buyer" && (
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
                  onChange={(e) => {
                    setSignUpInputs({
                      ...signUpInputs,
                      address: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            )}
            {signUpInputs.userType === "buyer" && (
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
                  onChange={(e) => {
                    setSignUpInputs({
                      ...signUpInputs,
                      phone: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            )}
            {signUpInputs.userType === "buyer" && (
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
                  onChange={(e) => {
                    setSignUpInputs({
                      ...signUpInputs,
                      balance: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            )}
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  className="signUp-btn"
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
                    handleSignUp();
                  }}
                >
                  Sign Up
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="signUp-back">
          <DoubleLeftOutlined
            className="signUp-back-icon"
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
