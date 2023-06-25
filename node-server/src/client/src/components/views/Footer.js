import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../assets/css/main.css";
import { FaSchool, FaPhoneAlt } from "react-icons/fa";

import portfolio1 from "../../assets/img/portfolio-1.jpg";
import portfolio2 from "../../assets/img/portfolio-2.jpg";
import portfolio3 from "../../assets/img/portfolio-3.jpg";
import portfolio4 from "../../assets/img/portfolio-4.jpg";
import portfolio5 from "../../assets/img/portfolio-5.jpg";
import portfolio6 from "../../assets/img/portfolio-6.jpg";
const Footer = () => {
  return (
    <div
      class="container-fluid bg-dullAqua text-light footer mt-5 pt-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ zIndex: "100", width: "100%" }}
    >
      <div class="container py-5 px-lg-5">
        <div class="row g-5">
          <div class="col-md-6 col-lg-6">
            <h5 class="text-white mb-4">학교 정보</h5>
            <p>
              <FaSchool className="me-3" />
              영진전문대학교 컴퓨터정보계열
            </p>
            <p>
              <FaPhoneAlt className="me-3" />
              TEL: 053-940-5290
            </p>
          </div>
          <div class="col-md-6 col-lg-3">
            <h5 class="text-white mb-4">Project Gallery</h5>
            {/* 이미지 교체하기 */}
            <div class="row g-2">
              <div class="col-4 ">
                <img src={portfolio1} alt="portfolio1" className="img-fluid" />
              </div>
              <div class="col-4">
                <img src={portfolio2} alt="portfolio2" className="img-fluid" />
              </div>
              <div class="col-4">
                <img src={portfolio3} alt="portfolio3" className="img-fluid" />
              </div>
              <div class="col-4">
                <img src={portfolio4} alt="portfolio4" className="img-fluid" />
              </div>
              <div class="col-4">
                <img src={portfolio5} alt="portfolio5" className="img-fluid" />
              </div>
              <div class="col-4">
                <img src={portfolio6} alt="portfolio6" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container px-lg-5">
        <div class="copyright">
          <div class="row">
            <div
              class="col-md-6 text-center text-md-end"
              style={{ textAlign: "center" }}
            >
              <div class="footer-menu">
                <a href="">Home</a>
                <a href="">Cookies</a>
                <a href="">Help</a>
                <a href="">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
