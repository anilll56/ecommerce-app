import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about__content">
          <h1 className="about__title">Hakkımızda</h1>
          <p className="about__text">
            Trendyol, alışverişin kolay ve keyifli bir deneyim haline gelmesi için tasarlanmış modern bir e-ticaret platformudur. Müşterilerimize geniş bir ürün yelpazesi sunarak, kaliteli ürünleri
            uygun fiyatlarla buluşturmayı hedefliyoruz. Adımızdaki "yol", bizi tanımlayan iki önemli unsuru temsil eder: keşif ve güven. <br />
            <br /> Trendyol’da alışveriş, yalnızca bir tıklama uzağınızda; güvenilir altyapımız ve hızlı teslimat çözümlerimizle her siparişinizde size en iyi hizmeti sunmak için buradayız.
            Misyonumuz, teknolojiyi yenilikçi bir şekilde kullanarak herkesin hayatını kolaylaştıran, sürdürülebilir ve müşteri odaklı bir alışveriş deneyimi sunmaktır. Trendyol’da siz yalnızca
            alışveriş yapmazsınız, aynı zamanda değerli bir topluluğun parçası olursunuz.
            <p className="about__text">
              <br />
              Bize katılın ve Trendyol ile alışverişin yeni yolunu keşfedin!
            </p>
          </p>
        </div>
        <div className="about__img">
          <img src="https://www.kurumsalkiraci.com/upload/trendyola-kiralik-yerim-var-yerinizi-trendyola-kurumsalkiraci.com-farki-ile-ulastirin.jpg" alt="about" />
        </div>
      </div>
    </div>
  );
};

export default About;
