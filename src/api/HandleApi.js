import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:5858";

const Login = async (email, password) => {
  try {
    const res = await axios.post(`${url}/auth/login`, {
      email: email,
      password: password,
    });

    if (res.data.success) {
      const token = res.data.token;
      alert("Giriş başarılı.");

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Optionally save user data in localStorage (or update state)
      // localStorage.setItem("user", JSON.stringify(res.data.user));
    } else {
      console.log("Giriş başarısız. Hata:", res.data.message);
      alert(res.data.message);
    }

    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    throw error;
  }
};

const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.get(`${url}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const userInfo = res.data;
      console.log("Kullanıcı bilgileri alındı:", userInfo);
      return userInfo;
    } else {
      toast.error("Tekrar giriş yapınız");
      console.log("Kullanıcı bilgileri alınamadı:", res.data.message);
      return null;
    }
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
    return null;
  }
};

const SignUpEcommerce = async (
  name,
  email,
  password,
  userType,
  phone,
  address,
  balance
) => {
  try {
    const payload = {
      name,
      email,
      password,
      userType,
      phone,
    };

    if (userType === "customer") {
      if (!address || balance === undefined) {
        throw new Error("Address and balance are required for customers.");
      }
      payload.address = address;
      payload.balance = balance;
    }

    const res = await axios.post(`${url}/auth/register`, payload);

    if (res.data.success) {
      toast.success("Kayıt başarılı.");
      console.log("Kayıt başarılı. Kullanıcı bilgileri:", res.data);
    } else {
      console.error("Kayıt başarısız. Hata:", res.data.message);
    }

    return res.data;
  } catch (error) {
    console.error("Error during signup:", error.message);
    toast.error(`Kayıt başarısız: ${error.message}`);
    return { success: false, message: error.message };
  }
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
  productImage,
  productDescription,
  productCategory
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    // Log the data being sent
    console.log("Sending data:", {
      name,
      seller_id: sellerId,
      stock,
      price,
      colors,
      productImage,
      productDescription,
      productCategory,
    });

    const res = await axios.post(
      `${url}/product/add`,
      {
        name: name,
        seller_id: sellerId,
        stock: stock,
        price: price,
        colors: colors,
        productImage: productImage,
        productDescription: productDescription,
        productCategory: productCategory,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201 && res.data.success) {
      console.log(
        "Ürün ekleme başarılı. Ürün bilgileri:",
        res.data.sellerProduct
      );
      return res.data.sellerProduct;
    } else {
      console.log("Ürün ekleme başarısız. Hata:", res.data.message);
      return null;
    }
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
      console.log("Ürünler getirildi", res.data.products);
      return res.data.products;
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
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.post(
      `${url}/order/customer`,
      { userId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      const orders = res.data;
      console.log("Ürünler getirildi", orders);
      return orders;
    } else {
      console.log("Ürünler getirilemedi. Hata:", res.data.message);
      return null;
    }
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
