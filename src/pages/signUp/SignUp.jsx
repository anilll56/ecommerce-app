import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Form, Input, Button, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import { SignUpEcommerce } from "../../api/HandleApi";
import InputMask from "react-input-mask";
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
    userType: "customer",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    balance: "",
  });

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleUserTypeChange = (e) => {
    const userType = e.target.value;
    setSignUpInputs({
      ...signUpInputs,
      userType,
      address: userType === "customer" ? signUpInputs.address : "",
      balance: userType === "customer" ? signUpInputs.balance : "",
    });
  };

  const handleInputChange = (field, value) => {
    setSignUpInputs({ ...signUpInputs, [field]: value });
  };

  const handleSignUp = async () => {
    try {
      const { username, email, password, userType, phone, address, balance } =
        signUpInputs;

      if (!username || !email || !password || !userType || !phone) {
        message.error("Please fill in all required fields!");
        return;
      }

      // Additional validations for customer
      if (
        userType === "customer" &&
        (!address || balance === "" || isNaN(balance))
      ) {
        message.error(
          "Please provide a valid address and balance for customers!"
        );
        return;
      }

      const response = await SignUpEcommerce(
        username,
        email,
        password,
        userType,
        phone,
        address,
        parseFloat(balance) // Ensure balance is a number
      );

      if (response.success) {
        navigate("/login");
      } else {
        message.error(response.message || "Registration failed.");
      }
    } catch (error) {
      message.error("An error occurred during registration.");
      console.error("Sign-up error:", error);
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
            }}
            form={form}
            name="sign_up_form"
            initialValues={{ userType: "customer" }}
            layout="vertical"
            onFinish={handleSignUp}
          >
            <Form.Item name="userType" rules={[{ required: true }]}>
              <Radio.Group
                onChange={handleUserTypeChange}
                value={signUpInputs.userType}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Radio value="customer">Alıcı</Radio>
                <Radio value="seller">Satıcı</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: /^90 \d{3} \d{3} \d{4}$/,
                  message:
                    "Please enter a valid phone number in the format 90 XXX XXX XXXX",
                },
              ]}
            >
              <InputMask
                mask="90 999 999 9999"
                maskChar={null}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    prefix={<PhoneOutlined />}
                    placeholder="Phone"
                    size="large"
                    type="tel"
                  />
                )}
              </InputMask>
            </Form.Item>

            {signUpInputs.userType === "customer" && (
              <>
                <Form.Item
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="Address"
                    size="large"
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="balance"
                  rules={[
                    { required: true, message: "Please input your balance!" },
                  ]}
                >
                  <Input
                    type="number"
                    prefix={<DollarCircleOutlined />}
                    placeholder="Balance"
                    size="large"
                    onChange={(e) =>
                      handleInputChange("balance", e.target.value)
                    }
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                className="signUp-btn"
                type="primary"
                size="large"
                htmlType="submit"
                disabled={!clientReady}
              >
                Kayıt Ol
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="signUp-footer">
          <div>Zaten bir hesabınız var mı?</div>
          <Button type="link" size="large" onClick={() => navigate("/login")}>
            Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
