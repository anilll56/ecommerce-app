import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Form, Input, Button, Radio } from "antd";
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
    userType: "buyer",
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
        }
      });
    }
  };
  return (
    <div className="signUp-page">
      <div className="signUp-container">
        <h1 className="signUp-header">Kayıt Ol</h1>
        <div className="signUp-form">
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1rem",
            }}
            form={form}
            name="horizontal_login"
            initialValues={{ userType: "buyer" }}
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              name="userType"
              style={{ margin: "0" }}
              rules={[
                {
                  required: true,
                  message: "Please select user type!",
                },
              ]}
            >
              <Radio.Group onChange={handleUserTypeChange}>
                <Radio value="buyer">Alıcı</Radio>
                <Radio value="seller">Satıcı</Radio>
              </Radio.Group>
            </Form.Item>
              
            <Form.Item
              style={{ margin: "0" }}
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
              style={{ margin: "0" }} 
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
              style={{ margin: "0" }}
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
                style={{ margin: "0" }}
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
                style={{ margin: "0" }}
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
                style={{ margin: "0" }}
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
            <Form.Item shouldUpdate style={{ margin: "0" }}>
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
                  Kayıt Ol
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="signUp-footer">
          <div>Zaten bir hesabınız var mı?</div>
          <Button
            type="link"
            size="large"
            onClick={() => {
              navigate("/login");
            }}
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
