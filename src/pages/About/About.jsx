import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about__content">
          <h1 className="about__title">Hakkımızda</h1>
          <p className="about__text">
            Hocam buraya bir şeyler yazın canınızı yerim
          </p>
          <p className="about__text">
            Buraya da bir şeyler yazın
          </p>
        </div>
        <div className="about__img">
          <img crossOrigin="anonymous" src="https://cdnuploads.aa.com.tr/uploads/Contents/2018/04/19/thumbs_b_c_7e7fd9dfb8574aed7b854dca84a250e8.jpg" alt="about" />
        </div>
      </div>
    </div>
  )
}

export default About