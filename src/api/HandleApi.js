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
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("Giriş başarısız. Hata:", res.data.message);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const SignUpEcommerce = async (name, email, password, userType, phone) => {
  let res;

  if (userType === "seller") {
    res = await axios.post(`${url}/register`, {
      name: name,
      email: email,
      password: password,
      userType: userType,
    });
  } else if (userType === "buyer") {
    res = await axios.post(`${url}/register`, {
      name: name,
      email: email,
      password: password,
      userType: userType,
      phone: phone,
    });
  }
  console.log(res, "res.data");
  if (res.data.success) {
    console.log("Kayıt başarılı. Kullanıcı bilgileri:", res);
  } else {
    console.log("Kayıt başarısız. Hata:", res.data.message);
  }

  return res;
};

const AddProduckEcommerce = async (
  name,
  sellerId,
  stock,
  price,
  colors,
  pruduckImage
) => {
  try {
    const res = await axios.post(`${url}/addProduck`, {
      name: name,
      sellerId: sellerId,
      stock: stock,
      price: price,
      colors: colors,
      pruduckImage: pruduckImage,
    });

    if (res.data.success) {
      console.log("Ürün ekleme başarılı. Ürün bilgileri:", res);
    } else {
      console.log("Ürün ekleme başarısız. Hata:", res.data.message);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const GetUserProducts = async (id) => {
  try {
    const res = await axios.post(`${url}/getUserProducts`, {
      userId: id,
    });
    if (res.status === 200) {
      console.log("Ürünler getirildi", res);
    } else {
      console.log("Ürünler getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const getAllProducks = async () => {
  try {
    const res = await axios.get(`${url}/getAllProduck`);
    if (res.status === 200) {
      console.log("Ürünler getirildi", res);
    } else {
      console.log("Ürünler getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const AddBuyOrder = async (
  buyerId,
  sellerId,
  produckId,
  produckName,
  produckPrice,
  produckImage,
  produckColor,
  produckStock
) => {
  try {
    const res = await axios.post(`${url}/addBuyOrder`, {
      buyerId: buyerId,
      sellerId: sellerId,
      produckId: produckId,
      produckName: produckName,
      produckPrice: produckPrice,
      produckImage: produckImage,
      produckColor: produckColor,
      produckStock: produckStock,
    });
    if (res.status === 200) {
      console.log("Ürünler getirildi", res);
    } else {
      console.log("Ürünler getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

export {
  Login,
  SignUpEcommerce,
  AddProduckEcommerce,
  GetUserProducts,
  getAllProducks,
  AddBuyOrder,
};
