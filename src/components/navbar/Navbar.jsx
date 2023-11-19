import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
function Navbar() {
  const menuRef = useRef(null);
  const [search, setSearch] = useState(false);
  const info = useSelector((state) => state.user?.info);
  const items = [
    {
      key: "1",
      label: <Link to="/home/profile">Profile</Link>,
      icon: <ProfileOutlined />,
    },
    {
      key: "2",
      label: <Link to="/home/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Log out
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];
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
            <Link to="/home">
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
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UserOutlined />
                      {info?.user?.name}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
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
