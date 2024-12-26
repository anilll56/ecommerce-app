import React from "react";
import "./Profile.css";
import { Avatar, Form, Input, Button, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AddProduckEcommerce,
  GetUserProducts,
  GetSellerOrders,
  GetBuyerOrders,
  UpdateOrderStatus,
  addItemToBasket,
} from "../../api/HandleApi";
import Card from "../../components/card/Card";
import CardList from "../../components/CardList/CardList";

function Profile() {
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.info);
  const [activeSide, setActiveSide] = useState("userInfo");
  const [openModal, setOpenModal] = useState(false);
  const [modalInputValue, setModalInputValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const changePassword = () => {
    if (
      modalInputValue.newPassword === modalInputValue.confirmPassword &&
      modalInputValue.newPassword.length > 5
    ) {
      console.log("changePassword");
    }
  };

  const handleTabClick = (tab) => {
    setActiveSide(tab);
  };

  return (
    <div className="profile">
      <div className="container profile-container">
        <div className="profile-left-side">
          <div className="profile-name-cont">
            <div className="profile-name">{reduxUser?.user?.name}</div>
          </div>
          <div
            onClick={() => handleTabClick("userInfo")}
            className="profile-left-side-settings"
          >
            <div className="profile-left-side-settings-item">
              Kullanıcı Bilgilerim
            </div>
            <div
              className="profile-left-side-settings-item"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Şifre Değiştir
            </div>
          </div>
          <div className="profile-left-side-settings">
            {reduxUser?.user?.userType === "seller" ? (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("MyProducts")}
              >
                Ürünlerim
              </div>
            ) : (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("orders")}
              >
                Siparişlerim
              </div>
            )}
            {reduxUser?.user?.userType === "seller" ? (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("waitingOrders")}
              >
                Bekleyen Siparişler
              </div>
            ) : (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("orderHistory")}
              >
                Geçmiş Siparişlerim
              </div>
            )}
            {reduxUser?.user?.userType === "seller" ? (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("addProduct")}
              >
                Ürün Ekle
              </div>
            ) : (
              <div
                className="profile-left-side-settings-item"
                onClick={() => handleTabClick("reorder")}
              >
                Tekrar Satın Al
              </div>
            )}
          </div>
        </div>
        <div className="profile-right-side">
          {activeSide === "userInfo" && <ProfileInfo />}
          {activeSide === "addProduct" && <AddProduck />}
          {activeSide === "MyProducts" && <MyProducks />}
          {activeSide === "orders" && <MyOrders />}
          {activeSide === "waitingOrders" && <WaitingOrders />}
          {activeSide === "orderHistory" && <OrderHistory />}
          {activeSide === "reorder" && <Reorder />}
        </div>
      </div>
      <Modal
        title="Change Password"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Input
          placeholder="Old Password"
          type="password"
          className="change-password-input"
          onChange={(e) => {
            setModalInputValue({
              ...modalInputValue,
              oldPassword: e.target.value,
            });
          }}
        />
        <Input
          placeholder="New Password"
          type="password"
          className="change-password-input"
          onChange={(e) => {
            setModalInputValue({
              ...modalInputValue,
              newPassword: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          className="change-password-input"
          onChange={(e) => {
            setModalInputValue({
              ...modalInputValue,
              confirmPassword: e.target.value,
            });
          }}
        />
        <Button
          type="primary"
          className="change-password-btn"
          onClick={() => {
            changePassword();
          }}
        >
          Güncelle
        </Button>
      </Modal>
    </div>
  );
}

export default Profile;

function Producks() {
  return <div>SS</div>;
}

function ProfileInfo(params) {
  const [updateProfileInputs, setUpdateProfileInputs] = useState({
    name: "",
    price: "",
    skills: [],
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const reduxUser = useSelector((state) => state.user.info);
  return (
    <div className="profile-info">
      <div className="profile-info-container">
        <div className="personel-info-title">Personal Information</div>
        {/* <div className="profile-avatar">
          <Avatar size={64} icon={<AiOutlineUser />} />
        </div> */}
        <div className="profile-info-items">
          <div className="profile-info-item">
            <div className="profile-info-item-title">Name</div>
            <div className="profile-info-item-value">
              {reduxUser?.user?.name}
            </div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-item-title">Email</div>
            <div className="profile-info-item-value">
              {reduxUser?.user?.email}
            </div>
          </div>
          {reduxUser?.user?.userType === "buyer" && (
            <>
              <div className="profile-info-item">
                <div className="profile-info-item-title">Balance</div>
                <div className="profile-info-item-value">
                  {reduxUser?.user?.balance}
                </div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-item-title">Address</div>
                <div className="profile-info-item-value">
                  {reduxUser?.user?.address}
                </div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-item-title">Phone</div>
                <div className="profile-info-item-value">
                  {reduxUser?.user?.phone}
                </div>
              </div>
            </>
          )}
        </div>
        <Form
          name="basic"
          className="profile-info-form"
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label={"Name"} name={"Name"} valuePropName>
            <Input
              placeholder={reduxUser?.user?.name || ""}
              onChange={(e) =>
                setUpdateProfileInputs({
                  ...updateProfileInputs,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          {reduxUser?.user?.userType === "buyer" && (
            <>
              <Form.Item label="address" name="address" valuePropName>
                <Input
                  placeholder={reduxUser?.user?.address}
                  onChange={(e) =>
                    setUpdateProfileInputs({
                      ...updateProfileInputs,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </>
          )}
          {reduxUser?.user?.userType === "buyer" && (
            <>
              <Form.Item label="Price" name="Price" valuePropName>
                <Input
                  type="number"
                  placeholder={reduxUser?.user?.price}
                  onChange={(e) =>
                    setUpdateProfileInputs({
                      ...updateProfileInputs,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="update-profile-btn"
              onClick={() => {
                // updateProfile();
              }}
            >
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
function MyProducks(params) {
  const [producks, setProducks] = useState([]);
  const reduxUser = useSelector((state) => state.user.info);
  useEffect(() => {
    GetUserProducts(reduxUser?.user?._id).then((res) => {
      setProducks(res.data.products);
    });
  }, [reduxUser?.user?.id]);
  return (
    <div className="my-products-container">
      <div className="my-producks-title">Ürünlerim</div>
      <CardList products={producks} />
    </div>
  );
}

function AddProduck() {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.info);
  const [AddProduckInputs, setAddProduckInputs] = useState({
    name: "",
    stock: 0,
    price: 0,
    colors: [],
    productImage: "",
    productDescription: "",
    productCategory: "",
  });

  const addProduck = () => {
    AddProduckEcommerce(
      AddProduckInputs.name,
      reduxUser?.user?._id,
      AddProduckInputs.stock,
      AddProduckInputs.price,
      AddProduckInputs.colors,
      AddProduckInputs.productImage,
      AddProduckInputs.productDescription,
      AddProduckInputs.productCategory
    ).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <Form
          {...formItemLayout}
          style={{
            width: "100%",
          }}
        >
          <Form.Item label="Ürün Adı">
            <Input
              className="add-product-input"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Resmi(Url)">
            <Input
              className="add-product-input"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  productImage: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Fiyatı">
            <Input
              className="add-product-input"
              type="number"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  price: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Renkler">
            <Input
              className="add-product-input"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  colors: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Stok">
            <Input
              className="add-product-input"
              type="number"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  stock: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Açıklaması">
            <Input
              className="add-product-input"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  productDescription: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Ürün Kategorisi">
            <Input
              className="add-product-input"
              onChange={(e) =>
                setAddProduckInputs({
                  ...AddProduckInputs,
                  productCategory: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="add-product-btn"
              onClick={() => {
                addProduck();
              }}
            >
              Ürün Ekle
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

function MyOrders(params) {
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.user.info);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    GetBuyerOrders()
      .then((orders) => {
        if (orders) {
          let data = orders.filter(
            (item) => item.status !== "Cancelled" && item.status !== "Shipped"
          );
          setMyOrders(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching buyer orders:", error);
      });
  }, []);
  return (
    <div className="my-orders-container">
      <div className="my-orders-title">Siparişlerim</div>
      <div className="waiting-orders-items">
        {myOrders?.map((item) => {
          console.log("item", item);
          return (
            <div className="waiting-orders-item">
              <div className="waiting-orders-item-cont">
                <div
                  className="waiting-orders-item-img-cont"
                  onClick={() =>
                    navigate(`/home/details/${item.products[0].product._id}`)
                  }
                >
                  <img
                    className="waiting-orders-item-img"
                    src={item?.products[0]?.product?.productImage}
                    alt="s"
                  />
                </div>
                <div className="waiting-orders-item-name">
                  {item.products[0].product.name}
                </div>
                <div className="waiting-orders-item-price">
                  {item.products[0].quantity * item.products[0].product.price}{" "}
                  TL
                </div>
                <div className="waiting-orders-item-color">
                  {item.products[0].product.colors}
                </div>
                <div className="waiting-orders-item-pieces">
                  {item.products[0].product.price}
                </div>
                <div className="waiting-orders-item-status">{item.status}</div>
                <div className="waiting-orders-item-buttons">
                  <Button
                    onClick={() => {
                      UpdateOrderStatus(item._id, "Cancelled");
                    }}
                  >
                    İptal Et
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function WaitingOrders() {
  const reduxUser = useSelector((state) => state.user.info);
  const [waitingOrders, setWaitingHistory] = useState([]);

  const handleGetSellerOrders = () => {
    GetSellerOrders(reduxUser.user.id).then((res) => {
      let data = res
        .map((order) =>
          order.products.map((product) => ({
            ...product,
            orderId: order._id,
            customer_id: order.customer_id,
            orderDate: order.orderDate,
            totalPrice: order.totalPrice,
            status: order.status,
          }))
        )
        .flat()
        .filter(
          (item) => item.status !== "Cancelled" && item.status !== "Delivered"
        );
      setWaitingHistory(data);
    });
  };

  useEffect(() => {
    handleGetSellerOrders();
  }, [reduxUser.user.id]);

  return (
    <div className="waiting-orders-container">
      <div className="waiting-orders-title">Bekleyen Siparişler</div>
      <div className="waiting-orders-items">
        {waitingOrders?.map((item) => (
          <div className="waiting-orders-item" key={item._id}>
            <div className="waiting-orders-item-cont">
              <div className="waiting-orders-item-img-cont">
                <img
                  className="waiting-orders-item-img"
                  src={item?.product?.productImage}
                  alt="s"
                />
              </div>
              <div className="waiting-orders-item-name">
                {item.product.name}
              </div>
              <div className="waiting-orders-item-price">
                {item.quantity * item.product.price} TL
              </div>
              <div className="waiting-orders-item-color">
                {item.product.colors}
              </div>
              <div className="waiting-orders-item-pieces">
                {item.product.price}
              </div>
              <div className="waiting-orders-item-status">{item.status}</div>
              <div className="waiting-orders-item-buttons">
                {item.status === "Shipped" ? (
                  <Button
                    onClick={() => {
                      UpdateOrderStatus(item.orderId, "Delivered").then(
                        (res) => {
                          GetSellerOrders(reduxUser.user.id).then((res) => {
                            let data = res
                              .map((order) =>
                                order.products.map((product) => ({
                                  ...product,
                                  orderId: order._id,
                                  customer_id: order.customer_id,
                                  orderDate: order.orderDate,
                                  totalPrice: order.totalPrice,
                                  status: order.status,
                                }))
                              )
                              .flat()
                              .filter(
                                (item) =>
                                  item.status !== "Cancelled" &&
                                  item.status !== "Delivered"
                              );
                            setWaitingHistory(data);
                          });
                        }
                      );
                    }}
                  >
                    Teslim Et
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      UpdateOrderStatus(item.orderId, "Shipped").then((res) => {
                        GetSellerOrders(reduxUser.user.id).then((res) => {
                          let data = res
                            .map((order) =>
                              order.products.map((product) => ({
                                ...product,
                                orderId: order._id,
                                customer_id: order.customer_id,
                                orderDate: order.orderDate,
                                totalPrice: order.totalPrice,
                                status: order.status,
                              }))
                            )
                            .flat()
                            .filter(
                              (item) =>
                                item.status !== "Cancelled" &&
                                item.status !== "Delivered"
                            );
                          setWaitingHistory(data);
                        });
                      });
                    }}
                  >
                    Kargoya ver
                  </Button>
                )}
                <Button
                  onClick={() => {
                    UpdateOrderStatus(item.orderId, "Cancelled").then((res) => {
                      GetSellerOrders(reduxUser.user._id).then((res) => {
                        let data = res
                          .map((order) =>
                            order.products.map((product) => ({
                              ...product,
                              orderId: order._id,
                              customer_id: order.customer_id,
                              orderDate: order.orderDate,
                              totalPrice: order.totalPrice,
                              status: order.status,
                            }))
                          )
                          .flat()
                          .filter(
                            (item) =>
                              item.status !== "Cancelled" &&
                              item.status !== "Delivered"
                          );
                        setWaitingHistory(data);
                      });
                    });
                  }}
                >
                  İptal Et
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderHistory(params) {
  const reduxUser = useSelector((state) => state.user.info);

  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    GetBuyerOrders()
      .then((orders) => {
        if (orders) {
          let data = orders.filter(
            (item) => item.status === "Cancelled" || item.status === "Delivered"
          );
          setOrderHistory(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching buyer orders:", error);
      });
  }, []);

  return (
    <div className="order-history-container">
      <div className="order-history-title">Geçmiş Siparişlerim</div>
      <div className="waiting-orders-items">
        {orderHistory?.map((item) => {
          return (
            <div className="waiting-orders-item">
              <div className="waiting-orders-item-cont">
                <div
                  className="waiting-orders-item-img-cont"
                  onClick={() =>
                    navigate(`/home/details/${item.products[0].product._id}`)
                  }
                >
                  <img
                    className="waiting-orders-item-img"
                    src={item?.products[0]?.product?.productImage}
                    alt="s"
                  />
                </div>
                <div className="waiting-orders-item-name">
                  {item.products[0].product.name}
                </div>
                <div className="waiting-orders-item-price">
                  {item.products[0].quantity * item.products[0].product.price}{" "}
                  TL
                </div>
                <div className="waiting-orders-item-color">
                  {item.products[0].product.colors}
                </div>
                <div className="waiting-orders-item-pieces">
                  {item.products[0].product.price}
                </div>
                <div className="waiting-orders-item-status">{item.status}</div>
                <div className="waiting-orders-item-buttons">
                  <Button
                    onClick={() =>
                      addItemToBasket(item.products[0].product._id, 1)
                    }
                  >
                    Tekrar Satın Al
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Reorder(params) {
  const reduxUser = useSelector((state) => state.user.info);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderSelected, setOrderSelected] = useState({
    produckColor: "",
    produckPieces: 1,
  });
  useEffect(() => {
    GetBuyerOrders()
      .then((orders) => {
        if (orders) {
          let data = orders.filter((item) => item.status === "Delivered");
          setOrderHistory(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching buyer orders:", error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="order-history-container">
      <div className="order-history-title">Geçmiş Siparişlerim</div>
      <div className="waiting-orders-items">
        {orderHistory?.map((item) => {
          return (
            <div className="waiting-orders-item">
              <div className="waiting-orders-item-cont">
                <div
                  className="waiting-orders-item-img-cont"
                  onClick={() =>
                    navigate(`/home/details/${item.products[0].product._id}`)
                  }
                >
                  <img
                    className="waiting-orders-item-img"
                    src={item.products[0].product.productImage}
                    alt="s"
                  />
                </div>
                <div className="waiting-orders-item-name">
                  {item.products[0].product.name}
                </div>
                <div className="waiting-orders-item-price">
                  {item.products[0].quantity * item.products[0].product.price}{" "}
                  TL
                </div>
                <div className="waiting-orders-item-color">
                  {item.products[0].product.colors}
                </div>
                <div className="waiting-orders-item-pieces">
                  {item.products[0].product.price}
                </div>
                <div className="waiting-orders-item-status">{item.status}</div>
                <div className="waiting-orders-item-buttons">
                  <Button
                    onClick={() =>
                      addItemToBasket(item.products[0].product._id, 1)
                    }
                  >
                    Tekrar Satın Al
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
