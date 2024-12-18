import React, { useEffect } from "react";
import "./Card.css";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, HeartOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { addFavorite, removeFavorite } from "../../redux/UserSlice";
import { HeartFilled } from "@ant-design/icons";
import Rating from 'react-rating';

import "swiper/swiper-bundle.css";
import { DeleteProduck } from "../../api/HandleApi";

function Card({ Item }) {
  const userRedux = useSelector((state) => state.user.info);
  const favItem = useSelector((state) => state.user.favorites);
  const isFav = favItem?.find((fav) => fav.id === Item?.id);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await DeleteProduck(Item?._id);
    window.location.reload();
  };

  useEffect(() => {
    console.log("Item", Item);
  }, [Item]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  }

  return (
    <div className="product-card">
      <div className={`product-card__wishlist ${isFav ? 'active' : ''}`} >
        <HeartFilled onClick={() => {
          isFav ? dispatch(removeFavorite(Item)) : dispatch(addFavorite(Item))
        }} />
      </div>
      <div className="product-card__img">
        <Link to={userRedux?.user?.userType !== "seller" ? `/home/details/${Item?._id}` : "#"} className="product-card__link">
          <img src={Item.productImage} alt={Item.name} title={Item.name} />
        </Link>
      </div>
      <Link to={userRedux?.user?.userType !== "seller" ? `/home/details/${Item?._id}` : "#"} className="product-card__link">
        <div className="product-card__content">
          <h3 className="product-card__title" title={Item.name}><span>{Item.seller_id?.name}</span> {Item.name}</h3>
          <div className="product-card__rating">
            <Rating
              initialRating={Item.productRating}
              emptySymbol={<StarOutlined style={{ color: '#ccc' }} />}
              fullSymbol={<StarFilled style={{ color: '#f39c12' }} />}
              readonly />
            <span>({Item.productRating})</span>
          </div>
          <p className="product-card__price" title={formatPrice(Item.price)}>{formatPrice(Item.price)}</p>
        </div>
      </Link>
      <button className="product-card__add-to-cart" onClick={() => {
        // dispatch(addItem(Item))
      }}>Sepete Ekle</button>
    </div>
  );
}

export default Card;
