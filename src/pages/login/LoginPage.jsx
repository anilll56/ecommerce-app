import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  Login,
  getBasketItems,
  GetFavorites,
} from "../../api/HandleApi";
import { setUser, setBasket, setFavorites } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
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
  const login = async () => {
    try {
      const response = await Login(loginInputs.email, loginInputs.password);
      if (response.status === 200) {
        const res = await getUserInfo();
        if (res) {
          const user = res;
          dispatch(setUser({ user }));
          navigate("/home");
        }
        const basketData = await getBasketItems();
        dispatch(setBasket(basketData));
        const favorites = await GetFavorites();
        dispatch(setFavorites(favorites));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-header">Giriş Yap</h1>
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
            layout="inline"
            onFinish={onFinish}
          >
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
                  setLoginInputs({ ...loginInputs, email: e.target.value });
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
                  setLoginInputs({ ...loginInputs, password: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item shouldUpdate style={{ width: "100%", margin: "0" }}>
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
                  Giriş
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="login-footer">
          <div>Hesabınız yok mu?</div>
          <div>
            <Button
              type="link"
              size="large"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
