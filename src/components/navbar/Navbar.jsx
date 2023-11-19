import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const menuRef = useRef(null);
  const [search, setSearch] = useState(false);

  return (
    <div className="navbar">
      <nav className="sticky">
        <div className="navbarTop">
          <li className="liNoBullets">İndirim Kuponlarım </li>
          <li className="liNoBullets">Trendyolda Satış yap</li>
          <li className="liNoBullets">Yardım&Destek </li>
        </div>
        <div className="navbarMain">
          <div className="imgcss">
            <Link to="/">
              <img
                alt="s"
                src="https://cdn.dsmcdn.com/web/logo/ty-web.svg"
              ></img>
            </Link>
          </div>
          <div ref={menuRef}>
            <div
              onClick={() => {
                setSearch(!search);
              }}
            >
              <div className="inputdiv">
                <input
                  className={search === true ? "inputcss1" : "inputcss"}
                  placeholder="Aradığınız ürün , kategori veya markayı yazınız"
                  type="text"
                ></input>
                <div className="gg-search"></div>
              </div>
            </div>
          </div>
          <div className="leftMain">
            <div className="ss">
              <div>
                <Link to="/home/profile" className="hoverr1">
                  <div>Profile</div>
                </Link>
              </div>
            </div>
            <div className="ss">
              <div>
                <Link to="/Favorites" className="hoverr1">
                  <div>Favorilerim</div>
                  <div className="hoverr11">0 </div>
                </Link>
              </div>
            </div>
            <div className="ss">
              <Link to="/BasketPage" className="hoverr1">
                <div>Sepetim</div>
                <div className="hoverr11">0</div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
