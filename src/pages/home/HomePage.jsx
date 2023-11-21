import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { getAllProducks } from "../../api/HandleApi";
import "./HomePage.css";
import Card from "../../components/card/Card";
import { useSelector } from "react-redux";

function Home() {
  const searchInput = useSelector((state) => state.user.searchInput);
  const searchInputValue = useSelector((state) => state.user.searchValue);
  const [producks, setProducks] = useState([]);
  useEffect(() => {
    getAllProducks().then((res) => {
      if (searchInput) {
        if (searchInputValue === "Ürün Adı") {
          const data = res.data.sellerProduck.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          );
          setProducks(data);
        } else if (searchInputValue === "Renk") {
          const data = res.data.sellerProduck.filter((item) =>
            item.colors.toLowerCase().includes(searchInput.toLowerCase())
          );
          setProducks(data);
        } else if (searchInputValue === "Fiyat") {
          const data = res.data.sellerProduck.filter((item) =>
            String(item.price).includes(searchInput)
          );
          setProducks(data);
        }
      } else {
        setProducks(res.data.sellerProduck);
      }
    });
  }, [searchInputValue, searchInput]);

  return (
    <div>
      <div>
        <h1>Producks</h1>
      </div>
      <div className="home-card-cont">
        {searchInputValue && producks.length === 0 ? (
          <div>
            Aradığınız ürün bulunamadı. Lütfen farklı bir ürün arayınız.
          </div>
        ) : (
          producks.map((item) => (
            <div>
              <Card Item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
