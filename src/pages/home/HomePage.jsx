import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { getAllProducks } from "../../api/HandleApi";
import "./HomePage.css";
import Card from "../../components/card/Card";
function Home() {
  const [producks, setProducks] = useState([]);
  useEffect(() => {
    getAllProducks().then((res) => {
      console.log(res.data.sellerProduck, "ressss");
      setProducks(res.data.sellerProduck);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>Producks</h1>
      </div>
      <div className="home-card-cont">
        <Row gutter={16}>
          {producks.map((producks) => {
            console.log(producks, "producksaaa");
            return (
              <Col span={4} key={producks.id}>
                <Card Item={producks} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
