import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import "./Navbar.css";
import { Dropdown, Input, Select, Space } from "antd";
import { setSearchInput, setSearchValue } from "../../redux/UserSlice";
import { Tooltip } from "antd";
import { AppstoreOutlined, BookOutlined, HomeOutlined, LaptopOutlined, SearchOutlined, SkinOutlined } from "@ant-design/icons";
import { SettingOutlined, LogoutOutlined, ProfileOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispath = useDispatch();
  const menuRef = useRef(null);
  const [search, setSearch] = useState(false);
  const info = useSelector((state) => state.user?.info);
  const favItems = useSelector((state) => state.user?.favorites);
  const options = [
    {
      value: "Ürün Adı",
      label: "Ürün Adı",
    },
    {
      value: "Renk",
      label: "Renk",
    },
    {
      value: "Fiyat",
      label: "Fiyat",
    },
  ];
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
            localStorage.removeItem("token");
            dispath(logout());
            window.location.reload();
          }}
        >
          Log out
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const categories = [
    {
      key: "electronics",
      label: "Elektronik",
      icon: <LaptopOutlined />,
    },
    {
      key: "clothing",
      label: "Giyim",
      icon: <SkinOutlined />,
    },
    {
      key: "furniture",
      label: "Mobilya",
      icon: <HomeOutlined />,
    },
    {
      key: "books",
      label: "Kitap",
      icon: <BookOutlined />,
    },
    {
      key: "other",
      label: "Diğer",
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <div className="navbar">
      <div className="container navbar-container">
        <nav className="sticky">
          <div className="navbarTop">
            <Link to="/signup"><li className="liNoBullets">Trendyolda Satış yap</li></Link>
            <Link to="/home/about"><li className="liNoBullets">Hakkımızda</li></Link>
          </div>
          <div className="navbarMain">
            <div className="imgcss">
              <Link to="/home">
                <img alt="s" src="https://cdn.dsmcdn.com/web/logo/ty-web.svg"></img>
              </Link>
            </div>
            <div ref={menuRef}>
              <div
                className="searchInputContainer"
                onClick={() => {
                  setSearch(!search);
                }}
              >
                <div className="inputdiv">
                  {/* <Select
                  options={options}
                  defaultValue={"Ürün Adı"}
                  className="search-input-select"
                  size="large"
                  onChange={(e) => {
                    dispath(setSearchValue(e));
                  }}
                /> */}
                  <Input
                    placeholder="Aradığınız ürünü yazınız"
                    className="navbar-search-input"
                    type="text"
                    onChange={(e) => {
                      dispath(setSearchInput(e.target.value));
                    }}
                    suffix={
                      <Tooltip title="Ara">
                        <SearchOutlined className="navbar-search-input-icon" />
                      </Tooltip>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="leftMain">
              <div className="ss">
                <div>
                  <Dropdown
                    local
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
                  {
                    <Link to={localStorage.getItem("token") ? "/home/favorites" : "/login"} className="hoverr1">
                      <div>Favorilerim</div>
                      <div className="hoverr11">{favItems.length}</div>
                    </Link>
                  }
                </div>
              </div>
              <div className="ss">
                <Link to="/home/BasketPage" className="hoverr1">
                  <div>Sepetim</div>
                  <div className="hoverr11">0</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="navbarBottom categories">
            <ul>
              {categories.map((category) => (
                <li key={category.key}>
                  <Link to={`/categories/${category.key}`}>
                    {category.icon}
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
