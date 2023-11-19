import React from "react";
import "./Card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";

import "swiper/swiper-bundle.css";

function Card({ Item }) {
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.user.info);
  console.log(Item);
  const dispatch = useDispatch();
  return (
    <div className="card">
      <div className="card__container">
        <div>
          <div className="FavİconCss1">
            <div className="FavİconCss2">
              {userRedux?.user.userType === "seller" ? (
                <DeleteOutlined size={20} />
              ) : (
                <HeartOutlined
                  style={{
                    padding: "5px",
                    fontSize: "16px",
                  }}
                />
              )}
            </div>
          </div>
          <div
            onClick={() => {
              navigate(`/home/details/${Item?.id}`);
            }}
          >
            <div className="card_img_cont">
              <img className="card_img" src={Item?.pruduckImage} alt="" />
            </div>
            <div className="card__title">{Item?.name}</div>
            <div className="card__price">{Item?.price} TL</div>
            <div className="card__colors">Renk: {Item?.colors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
