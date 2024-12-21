import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer = () => {

  const footerLinks = [
    {
      title: 'Menü',
      links: [
        { title: 'Hakkımızda', path: '/home/about' },
        { title: 'Favorilerim', path: '/home/favorites' },
        { title: 'Sepetim', path: '/home/BasketPage' },
        { title: 'Hesabım', path: '/home/profile' },
      ]
    },
    {
      title: 'Kategoriler',
      links: [
        { title: 'Elektronik', path: '/categories/electronics' },
        { title: 'Giyim', path: '/categories/clothing' },
        { title: 'Mobilya', path: '/categories/furniture' },
        { title: 'Kitap', path: '/categories/books' },
        { title: 'Diğer', path: '/categories/other' },
      ]
    },
    // {
    //   title: 'Policy',
    //   links: [
    //     { title: 'Return Policy', path: '/return' },
    //     { title: 'Terms Of Use', path: '/terms' },
    //     { title: 'Security', path: '/security' },
    //     { title: 'Privacy', path: '/privacy' },
    //   ]
    // },
    // {
    //   title: 'Hesabım',
    //   links: [
    //     { title: 'My Account', path: '/account' },
    //     { title: 'Order History', path: '/order-history' },
    //     { title: 'Wishlist', path: '/wishlist' },
    //     { title: 'Newsletter', path: '/newsletter' },
    //   ]

    // },
    {
      title: 'Sosyal',
      icon: true,
      links: [
        { icon: FacebookOutlined, path: 'https://facebook.com' },
        { icon: TwitterOutlined, path: 'https://twitter.com' },
        { icon: InstagramOutlined, path: 'https://instagram.com/memey.ranus' },
        { icon: YoutubeOutlined, path: 'https://www.youtube.com/@NumanSC' },
      ]
    },
    {
      title: 'İletişim',
      icon: true,
      links: [
        { icon: PhoneOutlined, path: 'tel:1234567890' },
        { icon: MailOutlined, path: 'mailto: memetmemetemin@outlook.com' },
      ]
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo logo">
          <Link to="/">trendyol</Link>
        </div>
        {
          footerLinks.map((item, index) => (
            <div className="footer__links__item" key={index}>
              <h3>{item.title}</h3>
              <ul className={`${item.icon ? 'icon' : 'text'}`}>
                {
                  item.links.map((link, index) => (
                    <li key={index} className={`${link.icon ? 'icon' : 'text'}`}>
                      {
                        link.path.includes('http') ?
                          <a href={link.path} target="_blank" rel="noreferrer">{link.icon ? <link.icon /> : link.title}</a>
                          :
                          <Link to={link.path}>{link.icon ? <link.icon /> : link.title}</Link>
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </footer>
  )
}

export default Footer