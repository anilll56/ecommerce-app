import React, { useEffect, useState } from "react";
import { getAllProducks } from "../../api/HandleApi"; // API fonksiyonunuzu doğru dosyadan içe aktarın
import { removeFavorite } from "../../api/HandleApi";
import { FaDeleteLeft } from "react-icons/fa6";
import "./CategoriesPage.css";
import CardList from "../../components/CardList/CardList";
import { useParams } from "react-router-dom";

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const fetchCategories = async () => {
    try {
      const productsData = await getAllProducks(category);
      setProducts(productsData);
    } catch (error) {
      console.error("Favoriler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCategory = (category) => {
    switch (category) {
      case "electronics":
        return "Elektronik";
      case "clothing":
        return "Giyim";
      case "furniture":
        return "Mobilya";
      case "books":
        return "Kitap";
      case "other":
        return "Diğer";
      default:
        return category;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [category]);

  if (loading) {
    return (
      <div className="container">
        <p className="loading">Yükleniyor...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container">
        <p className="no-favorites">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <section className="favorites">
      <div className="container">
        <h2 className="favorites-title">{formatCategory(category)}</h2>
        <CardList products={products} />
      </div>
    </section>
  );
};

export default CategoriesPage;
