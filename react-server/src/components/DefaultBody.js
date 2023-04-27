import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/logo.png";
import cat from "../assets/imgs/cat.jpg";
import fox from "../assets/imgs/fox.jpg";
import pig from "../assets/imgs/pig.jpg";

const DefaultBody = () => {
  const settings = {
    dots: true, // 하단에 dot 표시
    infinite: true, // 무한 슬라이드
    speed: 5000, // 3초마다 슬라이드 전환
    autoplay: true, // 자동 재생
    autoplaySpeed: 5000, // 3초마다 자동 재생
    slidesToShow: 1, // 보여질 슬라이드 수
    slidesToScroll: 1, // 스크롤링할 슬라이드 수
    centerMode: true, // 슬라이드 중앙에 배치
    centerPadding: 0, // 슬라이드 간격 0으로 설정
  };
  const imgStyle = {
    width: "50%",
    height: "auto",
    textAlign: "center",
    margin: "0 auto",
    display: "block",
  };
  return (
    <>
      <div style={{ margin: "100px 0 20px", textAlign: "center" }}>
        <h1 style={{ color: "deepskyblue" }}>프로젝트 관리를</h1>
        <h1 style={{ color: "dodgerblue", margin: "50px 0 50px" }}>
          물 흐르듯이
        </h1>
        <h1 style={{ color: "blue", margin: "50px 0" }}>블루 웨이브</h1>
      </div>

      <div style={{ margin: "0 0 50px" }}>
        <img src={logo} alt="logo" style={imgStyle}></img>
      </div>

      <Slider {...settings}>
        <div>
          <img src={cat} alt="고양이" style={imgStyle} />
        </div>
        <div>
          <img src={fox} alt="여우" style={imgStyle} />
        </div>
        <div>
          <img src={pig} alt="돼지" style={imgStyle} />
        </div>
      </Slider>
    </>
  );
};

export default DefaultBody;