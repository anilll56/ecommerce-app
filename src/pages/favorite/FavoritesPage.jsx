import React, { useEffect, useState } from "react";
import { GetFavorites } from "../../api/HandleApi"; // API fonksiyonunuzu doğru dosyadan içe aktarın
import { removeFavorite } from "../../api/HandleApi";
import { FaDeleteLeft } from "react-icons/fa6";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Favorileri getir ve state'e kaydet
  const fetchFavorites = async () => {
    try {
      const favoritesData = await GetFavorites();
      setFavorites(favoritesData); // API'den dönen favorileri state'e kaydet
      console.log(favorites);
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
    return <p>Favori ürününüz bulunmamaktadır.</p>;
  }

  return (
    <div>
      <h2>Favorilerim</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <h3>{favorite.product.name}</h3>
            <p>Fiyat: {favorite.product.price} TL</p>
            <p>Kategori: {favorite.product.category}</p>
            <button onClick={() => handleRemoveFavorite(favorite._id)}>
              <FaDeleteLeft />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
