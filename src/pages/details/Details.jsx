import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import ReactImageMagnify from "react-image-magnify";
import { AddBuyOrder, getAllProducks } from "../../api/HandleApi";
import { useSelector } from "react-redux";

function Details() {
  const { id } = useParams();
  const userRedux = useSelector((state) => state.user.info);
  const [orderSelected, setOrderSelected] = useState({
    produckColor: "",
    produckPieces: 0,
  });
  const [produck, setProduck] = useState([]);
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
      console.log(res, "res");
    });
  };
  console.log(produck, "produck");
  return (
    <div className="CardContent">
      <div className="CardLeft">
        <div className="CardPics">
          <div className="Cardİmg">
            <ReactImageMagnify
              {...{
                smallImage: {
                  src: "https://picsum.photos/1200/1800",
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                },
                largeImage: {
                  src: "https://picsum.photos/1200/1800",
                  width: 2000,
                  height: 2000,
                },
              }}
            />
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
            <button className="AddBasket" onClick={() => BuyProduck()}>
              Satın Al
            </button>
            <div
              className="AddFavorite"
              //  onClick={() => dispatch(addFavorite({ id: id }))}
            >
              <FiHeart className="Cardİcon"></FiHeart>
            </div>
          </div>
          <div className="Carddd">renk Seçenekleri : {produck.colors}</div>
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
    </div>
  );
}

export default Details;
