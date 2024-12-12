import React, { useEffect, useState } from "react";
import { getBasketItems } from "../../api/HandleApi";

const BasketPage = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch basket items and update state
  const fetchBasket = async () => {
    try {
      const basketData = await getBasketItems();
      setBasket(basketData || []);
    } catch (error) {
      console.error("Failed to fetch basket data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) {
    return <p>Loading your basket...</p>;
  }

  if (!basket || basket.length === 0) {
    return <p>Your basket is empty.</p>;
  }

  return (
    <div>
      <h2>Your Basket</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {basket.map((order) => (
          <div key={order._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
            <h3>Order ID: {order._id}</h3>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <p>Product ID: {product.product}</p>
                  <p>Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasketPage;
