import React, { useEffect, useState } from "react";
import {
  getBasketItems,
  updateBasketItem,
  removeItemFromBasket,
  AddBuyOrder,
} from "../../api/HandleApi";
import "./BasketPage.css";
import { useSelector } from "react-redux";

const BasketPage = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
      setBasket(basketData || []);
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
      <div className="container">
        <h2>Your Basket</h2>
        {basket.length > 0 ? (
          <div className="basket-grid">
            {basket.map((order) => (
              <div key={order._id} className="order-card">
                <h3>Order ID: {order._id}</h3>
                <p>Total Price: ${order.totalPrice || "N/A"}</p>
                <p>
                  Created At: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="order-details">
                  <ul>
                    {order.products &&
                      order.products.map((product) => (
                        <li key={product._id}>
                          <img
                            src={
                              product.product.productImage || "placeholder.jpg"
                            }
                            alt={product.product.name || "Product Image"}
                          />
                          <div className="product-info">
                            <p>Product Name: {product.product.name || "N/A"}</p>
                            <p>Price: ${product.product.price || "N/A"}</p>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                          <div className="product-buttons">
                            <button
                              onClick={() =>
                                addBasket(product.product._id, product.quantity)
                              }
                            >
                              Add
                            </button>
                            <button
                              onClick={() =>
                                subBasket(product.product._id, product.quantity)
                              }
                            >
                              Subtract
                            </button>
                            <button
                              onClick={() => removeBasket(product.product._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{message}</p>
        )}

        <div>
          {basket.length > 0 && (
            <button onClick={handleBuyOrder} className="buy-button">
              Satın Al
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BasketPage;
