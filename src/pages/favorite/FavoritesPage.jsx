import React, { useEffect, useState } from "react";
import { GetFavorites } from "../../api/HandleApi"; // API fonksiyonunuzu doğru dosyadan içe aktarın

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

  useEffect(() => {
    fetchFavorites(); // Bileşen yüklendiğinde favorileri getir
  }, []);

  if (loading) {
    return <p>Favoriler yükleniyor...</p>; // Yüklenme mesajı
  }

  if (!favorites || favorites.length === 0) {
    return <p>Favori ürününüz bulunmamaktadır.</p>; // Favori yoksa mesaj
  }

  return (
    <div>
      <h2>Favorilerim</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <h3>{favorite.product_id.name}</h3>
            <p>Fiyat: {favorite.product_id.price} TL</p>
            <p>Kategori: {favorite.product_id.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
