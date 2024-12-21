import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import "./Navbar.css";
import { Dropdown, Input, Select, Space } from "antd";
import { setSearchInput, setSearchValue } from "../../redux/UserSlice";
import { Tooltip } from "antd";
import { AppstoreOutlined, BookOutlined, HomeOutlined, LaptopOutlined, SearchOutlined, SkinOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { SettingOutlined, LogoutOutlined, ProfileOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispath = useDispatch();
  const [search, setSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="navbar">
      <div className="container navbar-container">
        <nav className="sticky">
          {!isMobile && (
            <div className="navbarTop">
              <Link to="/signup"><li className="liNoBullets">Trendyolda Satış yap</li></Link>
              <Link to="/home/about"><li className="liNoBullets">Hakkımızda</li></Link>
            </div>
          )}

          <div className="navbarMain">
            <div className="nav-logo">
              <Link to="/home">
                <img alt="logo" src="https://cdn.dsmcdn.com/web/logo/ty-web.svg" />
              </Link>
            </div>

            {isMobile ? (
              <button
                className="mobile-menu-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            ) : (
              <>
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

                <div className="leftMain">
                  <div className="ss">
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <UserOutlined />
                          {info?.user?.name}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                  <div className="ss">
                    <Link to={localStorage.getItem("token") ? "/home/favorites" : "/login"} className="hoverr1">
                      <div>Favorilerim</div>
                      <div className="hoverr11">{favItems.length}</div>
                    </Link>
                  </div>
                  <div className="ss">
                    <Link to="/home/BasketPage" className="hoverr1">
                      <div>Sepetim</div>
                      <div className="hoverr11">0</div>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-search">
                <Input
                  placeholder="Aradığınız ürünü yazınız"
                  className="navbar-search-input"
                  type="text"
                  onChange={(e) => {
                    dispath(setSearchInput(e.target.value));
                  }}
                  suffix={<SearchOutlined className="navbar-search-input-icon" />}
                />
              </div>
              <div className="mobile-links">
                <Link to="/signup">Trendyolda Satış yap</Link>
                <Link to="/home/about">Hakkımızda</Link>
                <Link to={localStorage.getItem("token") ? "/home/favorites" : "/login"}>
                  Favorilerim ({favItems.length})
                </Link>
                <Link to="/home/BasketPage">Sepetim (0)</Link>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UserOutlined />
                      {info?.user?.name}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="mobile-categories">
                {categories.map((category) => (
                  <Link key={category.key} to={`/categories/${category.key}`}>
                    {category.icon}
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!isMobile && (
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
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
