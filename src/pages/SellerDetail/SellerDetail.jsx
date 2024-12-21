import React, { useEffect, useState } from "react";
import { GetUserProducts } from "../../api/HandleApi"; // API fonksiyonunuzu doğru dosyadan içe aktarın
import './SellerDetail.css';
import CardList from "../../components/CardList/CardList";
import { useParams } from "react-router-dom";
import { FaStore } from "react-icons/fa";

const SellerDetail = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { sellerId } = useParams();

    const fetchCategories = async () => {
        try {
            const productsData = await GetUserProducts(sellerId);
            setProducts(productsData.data.products);
        } catch (error) {
            console.error("Satıcı ürünleri yüklenirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [sellerId]);

    if (loading) {
        return <p>Ürünler yükleniyor...</p>;
    }

    if (!products || products.length === 0) {
        return <div className="container">
            <p className="not-found">Satıcı ürünleri bulunamadı.</p>
        </div>
    }

    return (
        <section className="seller-detail">
            <div className="container">
                <div className="seller-detail-header">
                    <div className="seller-icon">
                        <FaStore className="store-icon" />
                    </div>
                    <div className="seller-info">
                        <h2 className="seller-name">{products[0]?.seller_id?.name}</h2>
                        <p className="seller-products-count">{products.length} ürün</p>
                    </div>
                </div>

                <CardList products={products} />
            </div>
        </section>
    );
};

export default SellerDetail;
