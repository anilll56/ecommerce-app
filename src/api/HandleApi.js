import axios from "axios";
import { toast } from "react-toastify";
const url = "http://127.0.0.1:8000/api";

const Login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/auth/login`, {
      email: email,
      password: password,
    });

    if (res.data.success) {
      // const user = res.data.user;
      const token = res.data.token;

      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      console.log("Giriş başarısız. Hata:", res.data.message);
    }

    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const getUserInfo = async () => {
  console.log("çalıştı");

  try {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.get(`${url}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      const userInfo = res.data.user;
      console.log("Kullanıcı bilgileri alındı:", userInfo);
      return userInfo;
    } else {
      toast.error("tekrar giriş yapınız");
      console.log("Kullanıcı bilgileri alınamadı:", res.data.message);
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
    return null;
  }
};

const SignUpEcommerce = async (name, email, password, userType, phone) => {
  let res;

  if (userType === "seller") {
    res = await axios.post(`${url}/auth/register`, {
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
    toast.success("Kayıt başarılı.");
    console.log("Kayıt başarılı. Kullanıcı bilgileri:", res);
  } else {
    console.log("Kayıt başarısız. Hata:", res.data.message);
  }

  return res;
};
const ChangePassword = async (id, password, newPassword) => {
  try {
    const res = await axios.post(`${url}/auth/changePassword`, {
      id: id,
      password: password,
      newPassword: newPassword,
    });

    if (res.data.success) {
      console.log("Şifre değiştirme başarılı. Kullanıcı bilgileri:", res);
    } else {
      console.log("Şifre değiştirme başarısız. Hata:", res.data.message);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
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
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${url}/product/add`,
      {
        name: name,
        seller_id: sellerId,
        stock: stock,
        price: price,
        colors: colors,
        pruduckImage: pruduckImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const token = localStorage.getItem("token");
    const res = await axios.post(`${url}/user/getUserProducts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/product/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const res = await axios.post(`${url}/order/add`, {
      buyerId: buyerId,
      sellerId: sellerId,
      produckId: produckId,
      produckName: produckName,
      produckPrice: produckPrice,
      produckImage: produckImage,
      produckColor: produckColor,
      produckPieces: produckStock,
      status: "order-sended",
    });
    if (res.status === 200) {
      console.log("Şipariş verildi", res);
      toast.success("Ürün  satın alındı.");
    } else {
      console.log("Şipariş verilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const GetSellerOrders = async (id) => {
  try {
    const res = await axios.post(`${url}/user/getSellerOrders`, {
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
const GetBuyerOrders = async (id) => {
  try {
    const res = await axios.post(`${url}/user/getBuyerOrders`, {
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
const UpdateOrderStatus = async (id, status) => {
  try {
    const res = await axios.post(`${url}/order/updateStatus`, {
      id: id,
      status: status,
    });
    if (res.status === 200) {
      console.log("başarıyla güncellendi", res);
      toast.success("Sipariş durumu güncellendi.");
    } else {
      console.log("güncellenemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const DeleteProduck = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${url}/product/delete`,
      {
        id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      console.log("başarıyla silindi", res);
      toast.success("Ürün başarıyla silindi.");
    } else {
      console.log("silinemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

export {
  Login,
  getUserInfo,
  SignUpEcommerce,
  AddProduckEcommerce,
  GetUserProducts,
  getAllProducks,
  AddBuyOrder,
  ChangePassword,
  GetSellerOrders,
  GetBuyerOrders,
  UpdateOrderStatus,
  DeleteProduck,
};
