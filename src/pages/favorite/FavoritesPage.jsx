import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/card/Card";

function FavoritesPage() {
  const userRedux = useSelector((state) => state.user.info);
  const favItems = useSelector((state) => state.user?.favorites);
  return (
    <div>
      <h1>Favorilerim</h1>
      <div>
        {favItems?.map((item) => (
          <div>
            <Card Item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
