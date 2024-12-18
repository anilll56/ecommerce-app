import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { addItemToBasket, AddBuyOrder, getProductById, createComment, getCommentsByProduct } from "../../api/HandleApi";
import { useSelector } from "react-redux";
import { Modal, Input, Button } from "antd";
import { RingLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { addFavorite } from "../../redux/UserSlice";
import { FaHeart } from "react-icons/fa";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import Rating from 'react-rating'
import { toast } from "react-toastify";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userRedux = useSelector((state) => state.user.info);
  const [orderSelected, setOrderSelected] = useState({
    produckColor: "red",
    produckPieces: 20,
  });
  const [product, setProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    comment: "",
    rate: 0,
  });

  const handleCommentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rate) => {
    console.log(rate);
    setComment({
      ...comment,
      rate: rate,
    });
  };
  const handleCommentSubmit = async () => {
    try {
      const response = await createComment(id, comment.comment, comment.rate);

      if (response.status === 201) {
        console.log("Yorum bağlanışı basarılı", response);
      } else {
        console.log("Yorum bağlanışı baise", response);
      }
    } catch (error) {
      console.error("Yorum bağlanışı Başarısız. Hata:", error);
    }
  };

  useEffect(() => {
    getDetails()
  }, [id]);


  const getDetails = async () => {
    const res = await getProductById(id)
    const commentRes = await getCommentsByProduct(id)
    res.data.product.comments = commentRes.data
    setProduct(res.data.product)
  }

  const BuyProduck = () => {
    const products = [
      {
        product: id,
        name: product.name,
        price: product.price,
        image: product.productImage,
        color: orderSelected.produckColor,
        quantity: orderSelected.produckPieces,
      },
    ];

    AddBuyOrder(userRedux.user._id, product.seller_id, products).then((res) => {
      setOpenModal(false);
      console.log(res, "res");
    });
  };

  const addToBasket = () => {
    const quantity = 1;
    const productId = id;

    addItemToBasket(productId, quantity)
      .then((res) => {
        console.log("Ürün sepete eklendi:", res);
        alert("Ürün sepete başarıyla eklendi!");
      })
      .catch((error) => {
        console.error("Sepete ekleme hatası:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('tr-TR').format(new Date(date));
  };

  const favItem = useSelector((state) => state.user.favorites);
  const isFav = favItem?.find((fav) => fav.id === product?.id);


  return (
    <div className="product-detail">
      <div className="container-lg">
        <section className="product-detail__container">
          {/* <div className="product-detail__gallery">
            {product.images.map((image, index) => (
              <div className="product-detail__gallery--item" key={index} onClick={() => setActiveImage(image)}>
                <img crossOrigin="anonymous" src={image} alt={product.title} key={index} />
              </div>
            ))}
          </div> */}
          <div className="product-detail__image">
            <img src={product.productImage} alt={product.name} />
          </div>
          <div className="product-detail__content">
            <h3 className="product-detail__content--title"><span>{product.seller_id?.name}</span> {product.name}</h3>
            <div className="product-detail__content--rating">
              <Rating
                initialRating={product.productRating}
                emptySymbol={<StarFilled style={{ color: '#ccc' }} />}
                fullSymbol={<StarFilled style={{ color: '#f39c12' }} />}
                readonly
              />
              <span>({product.productRating})</span>
              <span className="product-detail__content--reviews">
                {/* onClick={() => window.scrollTo({
                  top: document.getElementById('comments').offsetTop,
                  behavior: 'smooth'
                })}>({product.reviews.length} reviews) */}
              </span>
            </div>
            <p className="product-detail__content--description">{product.productDescription}</p>
            <p className="product-detail__content--price">{formatPrice(product.price)}</p>
            <div className="product-detail__content--buttons">
              <button className="product-detail__content--button button-favorite" onClick={() => { }}>Favorilere Ekle</button>
              <button className="product-detail__content--button button-cart" onClick={() => {
                // dispatch(addItem(product))
              }}>Sepete Ekle</button>
            </div>

          </div>
        </section>
        {/* <ProductSlider title="Related products" products={relatedProducts} /> */}
        <div className="comments" id="comments">
          <h2 className="comments-title">Yorumlar</h2>
          <div className="comment-form">
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <div className="form-header">
                  <label htmlFor="comment">Yorumunuz</label>
                  <div className="rating">
                    <Rating
                      initialRating={comment.rate}
                      emptySymbol={<StarFilled style={{ color: '#ccc' }} />}
                      fullSymbol={<StarFilled style={{ color: '#f39c12' }} />}
                      onChange={handleRatingChange}
                    />
                  </div>
                </div>
                <textarea id="comment" name="comment" rows="2" placeholder="Yorumunuzu buraya yazın..." value={comment.comment} onChange={handleCommentChange}></textarea>
              </div>
              <button type="submit" className="comment-button">Yorum Yap</button>
            </form>
          </div>
          <ul className="comments-list">
            {product.comments?.map((comment) => (
              <li key={comment._id}>
                <div className="comment-user">
                  <UserOutlined />
                </div>
                <div className="comment-content">
                  <div className="comment-info">
                    <Rating
                      initialRating={comment.rate}
                      emptySymbol={<StarFilled icon={StarFilled} style={{ color: '#ccc' }} />}
                      fullSymbol={<StarFilled icon={StarFilled} style={{ color: '#f39c12' }} />}
                      readonly
                    />
                    <p className='comment-date'>{formatDate(comment.date)}</p>
                    <span className='comment-separator'></span>
                    <p>{comment.user?.name}</p>
                  </div>
                  <p className='comment-text'>{comment.text}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Details;
