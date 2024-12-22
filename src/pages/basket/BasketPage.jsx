import React, { useEffect, useState } from "react";
import {
  getBasketItems,
  updateBasketItem,
  removeItemFromBasket,
  AddBuyOrder,
} from "../../api/HandleApi";
import "./BasketPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { setBasket } from "../../redux/UserSlice";

const BasketPage = () => {
  const [basket, setLocalBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const userRedux = useSelector((state) => state.user.info);

  //const userId = userRedux.user._id;

  const fetchBasket = async () => {
    setLoading(true);
    try {
      const basketData = await getBasketItems();
      if (!basketData.basket || basketData.basket.length === 0) {
        console.log("Sepet boş.");
        setMessage("Sepetinizde ürün bulunmamaktadır.");
      }
      setLocalBasket(basketData || []);
    } catch (error) {
      console.error("Sepet verileri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBasket = async (productId, quantity) => {
    try {
      await updateBasketItem(productId, quantity + 1);
      fetchBasket();
    } catch (error) {
      console.error("Failed to update basket:", error);
    }
  };

  const removeBasket = async (productId) => {
    try {
      await removeItemFromBasket(productId);
      fetchBasket();
      const basketData = await getBasketItems();
      dispatch(setBasket(basketData));
    } catch (error) {
      console.error("Failed to remove item from basket:", error);
    }
  };

  const subBasket = async (productId, quantity) => {
    if (quantity === 1) {
      removeBasket(productId);
    } else {
      try {
        await updateBasketItem(productId, quantity - 1);
        fetchBasket();
      } catch (error) {
        console.error("Failed to update basket:", error);
      }
    }
  };

  // const handleBuyOrder = async () => {
  //   try {
  //     const buyerId = userId; // Replace with actual buyer ID from user context or state
  //     const sellerId = "defaultSellerId"; // Replace with actual seller ID (could come from products)
  //     const products = basket.flatMap((order) =>
  //       order.products.map((product) => ({
  //         product_id: product.product._id,
  //         quantity: product.quantity,
  //       }))
  //     );

  //     const response = await AddBuyOrder(buyerId, sellerId, products);
  //     if (response) {
  //       console.log("Order created successfully:", response);
  //       fetchBasket(); // Refresh basket after order
  //     }
  //   } catch (error) {
  //     console.error("Failed to create buy order:", error);
  //   }
  // };
  // const handleBuyOrder = async () => {
  //   try {
  //     const buyerId = userRedux.user._id;
  //     const sellerId = "defaultSellerId";
  //     const products = basket.flatMap((order) =>
  //       order.products.map((product) => ({
  //         product_id: product.product._id,
  //         quantity: product.quantity,
  //       }))
  //     );

  //     const response = await AddBuyOrder(buyerId, sellerId, products);
  //     if (response) {
  //       console.log("Order created successfully:", response);
  //       fetchBasket();
  //     }
  //   } catch (error) {
  //     console.error("Failed to create buy order:", error);
  //   }
  // };

  const handleBuyOrder = async () => {
    AddBuyOrder()
      .then((res) => {
        if (res) {
          fetchBasket();
        }
      })
      .catch((error) => {
        console.error("Failed to create buy order:", error);
      });
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) {
    return <p className="loading">Loading your basket...</p>;
  }

  if (!basket || basket.length === 0) {
    return <p className="empty">Your basket is empty.</p>;
  }

  return (
    <section className="basket">
      <div className="container basket-container">
        <h2>Sepetim ({basket[0]?.products?.length || 0})</h2>
        {basket.length > 0 ? (
          <div className="basket-content">
            {basket.map((order) => (
              <div key={order._id} className="basket-item-list">
                {order.products?.map((product) => (
                  <div key={product._id} className="basket-item">
                    <img
                      className="product-image"
                      src={product.product.productImage}
                      alt={product.product.name || "Product Image"}
                    />
                    <div className="product-details">
                      <h4 className="product-name">
                        {product.product.name || "N/A"}
                      </h4>
                      <p className="product-price">
                        Fiyat: {product.product.price || "N/A"} TL
                      </p>
                      <p className="product-quantity">
                        Adet: {product.quantity}
                      </p>
                    </div>
                    <div className="product-actions">
                      <button
                        className="action-button"
                        onClick={() =>
                          subBasket(product.product._id, product.quantity)
                        }
                        aria-label="Decrease Quantity"
                      >
                        <MinusOutlined />
                      </button>
                      <button
                        className="action-button"
                        onClick={() =>
                          addBasket(product.product._id, product.quantity)
                        }
                        aria-label="Increase Quantity"
                      >
                        <PlusOutlined />
                      </button>
                      <button
                        className="action-button remove"
                        onClick={() => removeBasket(product.product._id)}
                        aria-label="Remove Item"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="basket-summary">
              <h2 className="summary-title">Sipariş Özeti</h2>
              <ul className="summary-list">
                <li className="summary-item">
                  <span className="summary-label">Ara Toplam</span>
                  <span className="summary-value">
                    {basket[0]?.totalPrice || "N/A"} TL
                  </span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Kargo</span>
                  <span className="summary-value">Ücretsiz</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Toplam</span>
                  <span className="summary-value">
                    {basket[0]?.totalPrice || "N/A"} TL
                  </span>
                </li>
              </ul>
              <button className="summary-button" onClick={handleBuyOrder}>
                Siparişi Tamamla
              </button>
              <div className="summary-free-shipping">
                <TruckOutlined />
                <span>Ücretsiz kargo fırsatını kaçırmayın!</span>
              </div>
            </div>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </section>
  );
};

export default BasketPage;
