import axios from "axios";
const url = "http://127.0.0.1:8000/api";

const Login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/login`, {
      email: email,
      password: password,
    });

    if (res.data.success) {
      const user = res.data.user;
      console.log("Giriş başarılı. Kullanıcı bilgileri:", user);
    } else {
      console.log("Giriş başarısız. Hata:", res.data.message);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const SignUp = async (name, email, password, userType, phone) => {
  try {
    if (userType === "seller") {
      const res = await axios.post(`${url}/signup`, {
        name: name,
        email: email,
        password: password,
        userType: userType,
      });
    } else if (userType === "buyer") {
      const res = await axios.post(`${url}/signup`, {
        name: name,
        email: email,
        password: password,
        userType: userType,
        phone: phone,
      });

      if (res.data.success) {
        const user = res.data.user;
        console.log("Kayıt başarılı. Kullanıcı bilgileri:", user);
      } else {
        console.log("Kayıt başarısız. Hata:", res.data.message);
      }

      return res;
    } else {
      console.log("Geçersiz userType:", userType);
    }
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

export { Login, SignUp };
