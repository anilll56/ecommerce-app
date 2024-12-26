import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { getAllProducks } from "../../api/HandleApi";
import "./HomePage.css";
import Card from "../../components/card/Card";
import { useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import Slider from "../../components/Slider/Slider";
import ProductSlider from "../../components/productSlider/ProductSlider";

function Home() {
  const searchInput = useSelector((state) => state.user.searchInput);
  const searchInputValue = useSelector((state) => state.user.searchValue);
  const [producks, setProducks] = useState([]);

  useEffect(() => {
    getAllProducks().then((res) => {
      if (res && res) {
        if (searchInput) {
          if (searchInputValue === "Ürün Adı") {
            const data = res.filter((item) =>
              item.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setProducks(data);
          } else if (searchInputValue === "Renk") {
            const data = res.filter((item) =>
              item.colors.toLowerCase().includes(searchInput.toLowerCase())
            );
            setProducks(data);
          } else if (searchInputValue === "Fiyat") {
            const data = res.filter((item) =>
              String(item.price).includes(searchInput)
            );
            setProducks(data);
          }
        } else {
          setProducks(res);
        }
      }
    });
  }, [searchInputValue, searchInput]);

  return (
    <div className="home-page">
      <div className="container">
        <Slider />
        <div className="home-card-cont">
          {searchInputValue && producks.length === 0 ? (
            <div className="not-found">
              Aradığınız ürün bulunamadı. Lütfen farklı bir ürün arayınız.
            </div>
          ) : (
            <>
              <ProductSlider title="Son Eklenen Ürünler" products={producks} />
              <ProductSlider title="Çok Satanlar" products={[...producks].reverse()} />
            </>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
