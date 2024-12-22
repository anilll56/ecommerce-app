import React, { useEffect, useState } from "react";
import { GetFavorites } from "../../api/HandleApi";
import { removeFavorite } from "../../api/HandleApi";
import { FaDeleteLeft } from "react-icons/fa6";
import "./FavoritesPage.css";
import CardList from "../../components/CardList/CardList";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const favoritesData = await GetFavorites();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Favoriler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      fetchFavorites();
    } catch (error) {
      console.error("Favori silinirken hata:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Favoriler yükleniyor...</p>;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container">
        <p className="no-favorites">Favorilerde ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <section className="favorites">
      <div className="container">
        <h2 className="favorites-title">Favorilerim</h2>
        <CardList products={favorites} />
      </div>
    </section>
  );
};

export default FavoritesList;
