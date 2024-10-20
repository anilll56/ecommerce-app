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
} from "../../api/HandleApi";
import Card from "../../components/card/Card";

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
      <div className="profile-container">
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
          Update
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
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
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
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                // updateProfile();
              }}
            >
              Update
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
    GetUserProducts(reduxUser?.user?.id).then((res) => {
      setProducks(res.data);
    });
  }, [reduxUser?.user?.id]);
  return (
    <div className="my-producks">
      <div className="my-producks-container">
        <div className="my-producks-title">Ürünlerim</div>
        <div className="my-producks-items">
          {producks?.map((item) => {
            return <Card Item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

function AddProduck() {
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user.info);
  const [AddProduckInputs, setAddProduckInputs] = useState({
    name: "",
    stock: 0,
    price: 0,
    colors: [],
    productImage: "",
  });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const addProduck = () => {
    AddProduckEcommerce(
      AddProduckInputs.name,
      reduxUser?.user?.id,
      AddProduckInputs.stock,
      AddProduckInputs.price,
      AddProduckInputs.colors,
      AddProduckInputs.productImage
    ).then((res) => {
      window.location.reload();
    });
  };
  console.log(reduxUser?.user?.id, "reduxUser");
  console.log(AddProduckInputs, "AddProduckInputs");
  return (
    <div className="add-product">
      <div className="add-product-container">
        <div className="add-product-title">Add Product</div>
        <div className="add-product-form">
          <Form
            {...formItemLayout}
            style={{
              width: "100%",
            }}
          >
            <Form.Item label="Produck Name">
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
            <Form.Item label="Produck Image">
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
            <Form.Item label="Produck Price">
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
            <Form.Item label="Produck Colors">
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
            <Form.Item label="Produck Stock">
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
            <Form.Item>
              <Button
                type="primary"
                className="add-product-btn"
                onClick={() => {
                  addProduck();
                }}
              >
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
function MyOrders(params) {
  const reduxUser = useSelector((state) => state.user.info);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    GetBuyerOrders(reduxUser.user.id).then((res) => {
      let data = res.data.filter((item) => item.status !== "cancelled");
      setMyOrders(data);
    });
  }, []);
  return (
    <div className="my-orders">
      <div className="my-orders-container">
        <div className="my-orders-title">Siparişlerim</div>
        <div className="waiting-orders-items">
          {myOrders?.map((item) => {
            return (
              <div className="waiting-orders-item">
                <div className="waiting-orders-item-cont">
                  <div className="waiting-orders-item-img-cont">
                    <img
                      className="waiting-orders-item-img"
                      src={item.produckImage}
                      alt="s"
                    />
                  </div>
                  <div className="waiting-orders-item-name">
                    {item.produckName}
                  </div>
                  <div className="waiting-orders-item-price">
                    {item.produckPieces * item.produckPrice} TL
                  </div>
                  <div className="waiting-orders-item-color">
                    {item.produckColor}
                  </div>
                  <div className="waiting-orders-item-pieces">
                    {item.produckPieces}
                  </div>
                  <div className="waiting-orders-item-status">
                    {item.status}
                  </div>
                  <div className="waiting-orders-item-buttons">
                    <Button
                      onClick={() => {
                        UpdateOrderStatus(item.id, "cancelled");
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
    </div>
  );
}
function WaitingOrders(params) {
  const reduxUser = useSelector((state) => state.user.info);
  const [waitingOrders, setWaitingHistory] = useState([]);
  useEffect(() => {
    GetSellerOrders(reduxUser.user.id).then((res) => {
      let data = res.data.filter(
        (item) => item.status !== "cancelled" && item.status !== "delivered"
      );
      setWaitingHistory(data);
    });
  }, []);
  return (
    <div className="waiting-orders">
      <div className="waiting-orders-container">
        <div className="waiting-orders-title">Bekleyen Siparişler</div>
        <div className="waiting-orders-items">
          {waitingOrders?.map((item) => {
            return (
              <div className="waiting-orders-item">
                <div className="waiting-orders-item-cont">
                  <div className="waiting-orders-item-img-cont">
                    <img
                      className="waiting-orders-item-img"
                      src={item.produckImage}
                      alt="s"
                    />
                  </div>
                  <div className="waiting-orders-item-name">
                    {item.produckName}
                  </div>
                  <div className="waiting-orders-item-price">
                    {item.produckPrice} TL
                  </div>
                  <div className="waiting-orders-item-color">
                    {item.produckColor}
                  </div>
                  <div className="waiting-orders-item-pieces">
                    {item.produckPieces}
                  </div>
                  <div className="waiting-orders-item-status">
                    {item.status}
                  </div>
                  <div className="waiting-orders-item-buttons">
                    {item.status === "shipped" ? (
                      <Button
                        onClick={() => {
                          UpdateOrderStatus(item.id, "delivered").then(
                            (res) => {
                              GetSellerOrders(reduxUser.user.id).then((res) => {
                                let data = res.data.filter(
                                  (item) => item.status !== "cancelled"
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
                          UpdateOrderStatus(item.id, "shipped").then((res) => {
                            GetSellerOrders(reduxUser.user.id).then((res) => {
                              let data = res.data.filter(
                                (item) => item.status !== "cancelled"
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
                        UpdateOrderStatus(item.id, "cancelled").then((res) => {
                          GetSellerOrders(reduxUser.user.id).then((res) => {
                            let data = res.data.filter(
                              (item) => item.status !== "cancelled"
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrderHistory(params) {
  const reduxUser = useSelector((state) => state.user.info);
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    GetBuyerOrders(reduxUser.user.id).then((res) => {
      setOrderHistory(res.data);
    });
  }, []);

  return (
    <div className="order-history">
      <div className="order-history-container">
        <div className="order-history-title">Geçmiş Siparişlerim</div>
        <div className="waiting-orders-items">
          {orderHistory?.map((item) => {
            return (
              <div className="waiting-orders-item">
                <div className="waiting-orders-item-cont">
                  <div className="waiting-orders-item-img-cont">
                    <img
                      className="waiting-orders-item-img"
                      src={item.produckImage}
                      alt="s"
                    />
                  </div>
                  <div className="waiting-orders-item-name">
                    {item.produckName}
                  </div>
                  <div className="waiting-orders-item-price">
                    {item.produckPrice} TL
                  </div>
                  <div className="waiting-orders-item-color">
                    {item.produckColor}
                  </div>
                  <div className="waiting-orders-item-pieces">
                    {item.produckPieces}
                  </div>
                  <div className="waiting-orders-item-status">
                    {item.status}
                  </div>
                  <div className="waiting-orders-item-buttons">
                    <Button>Tekrar Satın Al</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
