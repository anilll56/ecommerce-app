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
      toast.success("Giriş başarılı.");

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Optionally save user data in localStorage (or update state)
      // localStorage.setItem("user", JSON.stringify(res.data.user));
    } else {
      console.log("Giriş başarısız. Hata:", res.data.message);
      alert(res.message);
    }

    return res;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(`Giriş başarısız: ${error.response.data.message}`);
    } else {
      toast.error("Giriş başarısız." + error);
    }
    console.error("Error during login:", error);
  }
};

const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");

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
      return userInfo;
    } else {
      toast.error("Tekrar giriş yapınız");
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
      toast.success("Şifre değiştirme başarılı.");
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

const GetUserProducts = async (sellerId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/product/seller?sellerId=${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
    } else {
      console.log("Ürünler getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};
const getAllProducks = async (category) => {
  try {
    const token = localStorage.getItem("token");
    const urlParam = category ? `?category=${category}` : "";
    const res = await axios.get(`${url}/product/all${urlParam}`, {
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

// const AddBuyOrder = async (buyerId, sellerId, products) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("Token bulunamadı, lütfen giriş yapın.");
//     return null;
//   }

//   try {
//     const res = await axios.post(
//       `${url}/order/create`,
//       {
//         customer_id: buyerId,
//         seller_id: sellerId,
//         products: products,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.status === 201) {
//       console.log("Şipariş verildi", res);
//       toast.success("Ürün satın alındı.");
//     } else {
//       console.log("Şipariş verilemedi. Hata:", res.data.message);
//     }
//     return res;
//   } catch (error) {
//     console.error("Axios isteği sırasında hata:", error);
//     throw error;
//   }
// };

const AddBuyOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.post(
      `${url}/order/create`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      return res;
    } else {
      console.log("Ürünler getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const GetSellerOrders = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token bulunamadı, lütfen giriş yapın.");
    return null;
  }

  try {
    const res = await axios.get(`${url}/order/seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const orders = res.data;
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
const GetBuyerOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.get(`${url}/order/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const orders = res.data;
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
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token bulunamadı, lütfen giriş yapın.");
    return null;
  }

  try {
    const res = await axios.put(
      `${url}/order/update/${id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      console.log("başarıyla güncellendi", res);
      toast.success("Sipariş durumu güncellendi.");
    } else {
      console.log("güncellenemedi. Hata:", res.data.message);
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

const GetFavorites = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.get(`${url}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log("Favoriler getirildi:", res.data);
      return res.data;
    } else {
      console.log("Favoriler getirilemedi. Hata:", res.data.message);
      return null;
    }
  } catch (error) {
    console.error("Favoriler alınırken hata oluştu:", error);
    throw error;
  }
};

const removeFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token bulunamadı, lütfen giriş yapın.");
    return null;
  }

  try {
    const response = await axios.delete(
      `${url}/favorites/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Favori başarıyla kaldırıldı:", response.data);
      toast.success("Favoriden kaldırıldı.");
      return response.data;
    } else {
      console.error("Favori kaldırılamadı. Hata:", response.data.message);
      toast.error(response.data.message || "Favori kaldırılamadı.");
      return null;
    }
  } catch (error) {
    console.error("Favori kaldırırken hata oluştu:", error);
    toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    throw error;
  }
};

const getBasketItems = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.get(`${url}/basket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      console.log("Sepet öğeleri getirildi:", res.data);
      return res.data;
    } else {
      toast.error("Sepet öğeleri alınamadı.");
      return null;
    }
  } catch (error) {
    console.error("Sepet öğeleri alınırken hata oluştu:", error);
    toast.error("Bir hata oluştu.");
    throw error;
  }
};

const addItemToBasket = async (productId, quantity) => {
  console.log("productId:", productId);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.post(
      `${url}/basket/add`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      console.log("Ürün sepete eklendi:", res.data);
      toast.success("Ürün sepete eklendi.");
      return res.data;
    } else {
      toast.error("Ürün sepete eklenemedi.");
      return null;
    }
  } catch (error) {
    console.error("Ürün eklerken hata oluştu:", error);
    toast.error("Bir hata oluştu.");
    throw error;
  }
};

const removeItemFromBasket = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }

    const res = await axios.delete(`${url}/basket/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      toast.success("Ürün sepetten kaldırıldı.");
      return res.data;
    } else {
      toast.error("Ürün sepetten kaldırılamadı.");
      return null;
    }
  } catch (error) {
    console.error("Ürün kaldırılırken hata oluştu:", error);
    toast.error("Bir hata oluştu.");
    throw error;
  }
};

const updateBasketItem = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }
    const res = await axios.put(
      `${url}/basket/update`,
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Sepet güncellendi.");
      return res.data;
    } else {
      toast.error("Sepet öğesi güncellenemedi.");
      return null;
    }
  } catch (error) {
    console.error("Sepet güncellenirken hata oluştu:", error);
    toast.error("Bir hata oluştu.");
    throw error;
  }
};

const getSellers = async () => {
  try {
    const res = await axios.get(`${url}/auth/sellers`);

    if (res.status === 200) {
      console.log("Satıcılar getirildi", res);
    } else {
      console.log("Satıcılar getirilemedi. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const createComment = async (productId, comment, rating) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token bulunamadı, lütfen giriş yapın.");
      return null;
    }
    const res = await axios.post(
      `${url}/comment/create`,
      {
        product: productId,
        text: comment,
        rate: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 201) {
      console.log("Yorum bağlanışı basarılı", res);
    } else {
      console.log("Yorum bağlanışı başarısız. Hata:", res);
    }
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const getCommentsByProduct = async (productId) => {
  try {
    const res = await axios.get(`${url}/comment/${productId}`);
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const res = await axios.get(`${url}/product/${id}`);
    return res;
  } catch (error) {
    console.error("Axios isteği sırasında hata:", error);
    throw error;
  }
};

const addFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token bulunamadı, lütfen giriş yapın.");
    return null;
  }

  try {
    const response = await axios.post(
      `${url}/favorites/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      console.log("Favori başarıyla eklendi:", response.data);
      toast.success("Favoriye eklendi.");
      return response.data;
    } else {
      console.error("Favori eklenemedi. Hata:", response.data.message);
      toast.error(response.data.message || "Favori eklenemedi.");
      return null;
    }
  } catch (error) {
    console.error("Favori eklerken hata oluştu:", error);
    toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
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
  GetFavorites,
  addFavorite,
  removeFavorite,
  getBasketItems,
  addItemToBasket,
  removeItemFromBasket,
  updateBasketItem,
  getSellers,
  createComment,
  getCommentsByProduct,
  getProductById,
};
