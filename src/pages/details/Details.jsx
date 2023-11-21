import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import ReactImageMagnify from "react-image-magnify";
import { AddBuyOrder, getAllProducks } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import { Modal, Input, Button } from "antd";
import { RingLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { addFavorite } from "../../redux/UserSlice";
import { FaHeart } from "react-icons/fa";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userRedux = useSelector((state) => state.user.info);
  const [orderSelected, setOrderSelected] = useState({
    produckColor: "red",
    produckPieces: 20,
  });
  const [produck, setProduck] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    getAllProducks().then((res) => {
      const data = res.data.sellerProduck;
      const selectedProduck = data.find((item) => item.id.toString() === id);

      if (selectedProduck) {
        setProduck(selectedProduck);
      } else {
        console.error(`Product with id ${id} not found`);
      }
    });
  }, [id]);
  const BuyProduck = () => {
    AddBuyOrder(
      userRedux.user.id,
      produck.sellerId,
      id,
      produck.name,
      produck.price,
      produck.pruduckImage,
      orderSelected.produckColor,
      orderSelected.produckPieces
    ).then((res) => {
      setOpenModal(false);
      console.log(res, "res");
    });
  };
  const favItem = useSelector((state) => state.user.favorites);
  const isFav = favItem?.find((fav) => fav.id === produck?.id);
  return (
    <div className="CardContent">
      <div className="CardLeft">
        <div className="CardPics">
          <div className="Cardİmg">
            {loading ? (
              <div
                className="sweet-loading"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RingLoader
                  color="#f27a1a"
                  loading={loading}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    src: produck.pruduckImage,
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                  },
                  largeImage: {
                    src: produck.pruduckImage,
                    width: 2000,
                    height: 2000,
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className="CardAbout">
          <div className="Cardss">En Çok Satan Ürün</div>
          <div className="Carddd">{produck.name}</div>
          <div className="Cardss">
            Satıcı :<Link to="/">Trendyol</Link>
          </div>
          <h4 className="CardPrice">{produck.price} TL</h4>
          <div className="CardAddTo">
            <button className="AddBasket" onClick={() => setOpenModal(true)}>
              Satın Al
            </button>
            <div className="AddFavorite">
              {isFav ? (
                <FaHeart
                  size={30}
                  style={{
                    color: "#f27a1a",
                  }}
                />
              ) : (
                <FiHeart
                  size={30}
                  onClick={() => {
                    dispatch(addFavorite(produck));
                  }}
                />
              )}
            </div>
          </div>
          <div className="Carddd">Renk Seçenekleri : {produck.colors}</div>
          <div className="Carddd">Ürün Adedi : {produck.stock}</div>
          <div className="CardSp">
            <div>Öne Çıkan Bilgiler :</div>
            <div className="CardPLC">
              <div>Renk : Beyaz</div>
              <div>Sıcaklık Kontrolü : Var</div>
            </div>
            <div className="CardPLC">
              <div>Zamanlayıcı : Var</div>
              <div> Garanti Süresi : 2 Yıl</div>
            </div>
          </div>
          <div className="CardPLC2">
            <li>15 gün içinde ücretsiz iade. Detaylı bilgi için tıklayız</li>
            <li>Bu ürün Trendyol tarafından gönderilecektir.</li>
            <li>
              Xiaomi Mi Smart Air Fritöz, sağlıklı, çıtır ve az yağlı yemekler
              pişirir
            </li>
          </div>
          <div>
            <img
              src="https://cdn.dsmcdn.com/web/web-installment-campaigns/3mv3.png"
              alt="11"
            ></img>
          </div>
        </div>
      </div>
      <div className="CardRight">
        <div className="CardRightC1">
          <div className="c1cs">Ürünün Kampanyaları</div>
          <hr></hr>
          <div className="c1css">Kargo Bedava</div>
        </div>
        <div className="CardRightC2">
          <div className="c1cs">Trendyol</div>
          <hr></hr>
          <div className="c1css">Mağazayı Gör</div>
          <hr></hr>
          <div className="c1css">Ürün Soruları (155)</div>
        </div>
      </div>
      <Modal
        title="Ürünü Al"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Input
          placeholder="Ürün Adedeini Giriniz"
          className="buy-order-input"
          type="number"
          onChange={(e) => {
            setOrderSelected({
              ...orderSelected,
              produckPieces: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Ürün Rengini seçiniz"
          className="buy-order-input"
          onChange={(e) => {
            setOrderSelected({
              ...orderSelected,
              produckColor: e.target.value,
            });
          }}
        />
        <Button
          type="primary"
          className="buy-order-button"
          onClick={() => {
            BuyProduck();
          }}
        >
          Satın Al
        </Button>
      </Modal>
    </div>
  );
}

export default Details;
