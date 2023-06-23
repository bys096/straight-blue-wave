import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pig2 from "../assets/imgs/pig2.png";
import cow from "../assets/imgs/cow.png";
import dragon from "../assets/imgs/dragon.png";
import rat from "../assets/imgs/rat.png";
import rabbit from "../assets/imgs/rabbit.png";
import tiger from "../assets/imgs/tiger.png";

import "../assets/css/main.css";
import {
  FaCheck, FaGithub, FaHome, FaFileAlt, FaCalendarCheck, FaUsers, FaClipboardList, FaVideo, FaLightbulb,
  FaSchool, FaPhoneAlt, FaFacebookF, FaInstagram
} from 'react-icons/fa';
import hero from "../assets/img/hero.png";
import about from "../assets/img/about.jpg";
import newsletter from "../assets/img/newsletter.png";
import portfolio1 from "../assets/img/portfolio-1.jpg";
import portfolio2 from "../assets/img/portfolio-2.jpg";
import portfolio3 from "../assets/img/portfolio-3.jpg";
import portfolio4 from "../assets/img/portfolio-4.jpg";
import portfolio5 from "../assets/img/portfolio-5.jpg";
import portfolio6 from "../assets/img/portfolio-6.jpg";



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
    <div
      style={{
        backgroundColor: "white",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >

      <div class="container-xxl py-5 bg-primary hero-header mb-5">
        <div class="container my-5 py-5 px-lg-5">
          <div class="row g-5 py-5">
            <div class="col-lg-6 text-center text-lg-start">
              <h1 class="text-white mb-4 animated zoomIn">프로젝트 관리를 물 흐르듯이 자연스럽게 Blue Wave</h1>
              <p class="text-white pb-3 animated zoomIn">회의 시작부터 어떻게 해야 할지 막막했던 적이 있나요? <br></br>
                결론이 없는 회의에 지치셨나요? <br></br>
                회의 시작 전 사람들의 일정 조율이 문제였나요? <br></br>
                그런 고민들에 지친 여러분을 위해 준비했습니다. <br></br>
                물이 흐르는 듯 자연스럽게 회의를 진행할 수 있도록 도와주는 서비스</p>
              <a href="/login" class="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">로그인</a>
              <a href="/SignUp" class="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">회원가입</a>
            </div>
            <div class="col-lg-6 text-center text-lg-start">
              <img src={hero} alt="hero"></img>
            </div>
          </div>
        </div>
      </div>

      {/* About Start  */}
      <div class="container-xxl py-5">
        <div class="container px-lg-5">
          <div class="row g-5">
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="section-title position-relative mb-4 pb-2">
                <h6 class="position-relative text-primary ps-4">About Us</h6>
                <h2 class="mt-2">향상된 회의 관리 및 협업을 위한 포괄적인 솔루션</h2>
              </div>
              <p class="mb-4">다양한 기능들로 회의가 처음부터 끝까지 원활한 진행을 도와줍니다. <br></br>
                원활하고 자연스러운 협업을 시작하세요. <br></br>
                모든 회의를 성공적으로 이끌어갑니다.</p>
              <div class="row g-3">
                <div class="col-sm-6">
                  <h6 class="mb-3"><FaCheck className="text-primary me-2" />AI 기반 회의록 자동 생성</h6>
                  <h6 class="mb-0"><FaCheck className="text-primary me-2" />일정 조정 및 동기화</h6>
                </div>
                <div class="col-sm-6">
                  <h6 class="mb-3"><FaCheck className="text-primary me-2" />팀원 관리 및 협업</h6>
                  <h6 class="mb-0"><FaCheck className="text-primary me-2" />회의록 및 게시물 관리</h6>
                </div>
              </div>
              <div class="d-flex align-items-center mt-4">
                <a class="btn btn-primary rounded-pill px-4 me-3" href="">Read More</a>
                <a class="btn btn-outline-primary btn-square me-3" href=""><FaGithub /></a>
              </div>
            </div>
            <div class="col-lg-6">
              <img src={about} alt="about"></img>
            </div>
          </div>
        </div>
      </div>
      {/* About end  */}


      {/* Service Start */}
      <div class="container-xxl py-5">
        <div class="container px-lg-5">
          <div class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="position-relative d-inline text-primary ps-4">Our Services</h6>
            <h2 class="mt-2">우리가 제공하는 솔루션</h2>
          </div>
          <div class="row g-4">
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaFileAlt size={32} />
                </div>
                <h5 class="mb-3">AI 기반 회의록 자동 생성</h5>
                <p>회의 중 실시간 음성을 인식하여 회의록을 만들고 AI를 기반으로 회의록을 요약해 줍니다.</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaCalendarCheck size={32} />
                </div>
                <h5 class="mb-3">일정 조정 및 동기화</h5>
                <p>WBS, 캘린더를 이용하여 프로젝트 단위로 일정을 보다 쉽게 관리할 수 있습니다.</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaUsers size={32} />
                </div>
                <h5 class="mb-3">팀원 관리 및 협업</h5>
                <p>계층형 권한을 이용해 팀원을 보다 쉽게 관리하고 협업 할 수 있습니다.</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaClipboardList size={32} />
                </div>
                <h5 class="mb-3">회의록 및 게시물 관리</h5>
                <p>회의록과 공지사항 등 다양한 게시물들을 나눠서 관리할 수 있습니다.</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaVideo size={32} />
                </div>
                <h5 class="mb-3">실시간 화상 채팅</h5>
                <p>사이트 내에서 지원하는 실시간 화상채팅을 이용해 보세요!</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
              <div class="service-item d-flex flex-column justify-content-center text-center rounded">
                <div class="service-icon flex-shrink-0">
                  <FaLightbulb size={32} />
                </div>
                <h5 class="mb-3">다양한 회의기법 소개</h5>
                <p>회의 진행이 막힐때 회의 기법을 참고하여 진행해 보세요.</p>
                <a class="btn px-3 mt-auto mx-auto" href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}


      {/* Newsletter Start */}
      <div className="container-xxl bg-primary newsletter my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container px-lg-5">
          <div className="row align-items-center" style={{ height: "250px" }}>
            <div className="col-12 col-md-6">
              <h3 className="text-white">우리 팀원들을 소개합니다.</h3>
              <small className="text-white">우리 프로젝트를 빛나게한 재능 있는 사람들</small>
            </div>
            <div className="col-md-6 text-center mb-n5 d-none d-md-block">
              <img src={newsletter} alt="newsletter" />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter end */}


      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container px-lg-5">
          <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="position-relative d-inline text-primary ps-4">Our Team</h6>
            <h2 className="mt-2">팀원</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={pig2} alt="pig2" className="img-fluid rounded w-100"/>
                </div>
                <div className="px-4 py-3">
                  <h5 className="fw-bold m-0">왕인성</h5>
                  <small>기획</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={rat} alt="rat" className="img-fluid rounded w-100" />
                </div>
                <div className="px-4 py-3">
                  <h5 className="fw-bold m-0">반영서</h5>
                  <small>조장/백엔드</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={cow} alt="cow" className="img-fluid rounded w-100" />
                </div>
                <div class="px-4 py-3">
                  <h5 class="fw-bold m-0">문기용</h5>
                  <small>백엔드</small>
                </div>
              </div>
            </div>
          </div>

          <br></br><br></br>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={tiger} alt="tiger" className="img-fluid rounded w-100"/>
                </div>
                <div className="px-4 py-3">
                  <h5 className="fw-bold m-0">민경민</h5>
                  <small>프론트엔드</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={rabbit} alt="rabbit" className="img-fluid rounded w-100" />
                </div>
                <div className="px-4 py-3">
                  <h5 className="fw-bold m-0">조현주</h5>
                  <small>백엔드/디자인</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
              <div className="team-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaGithub /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaFacebookF /></a>
                    <a className="btn btn-square text-primary bg-white my-1" href=""><FaInstagram /></a>
                  </div>
                  <img src={dragon} alt="dragon" className="img-fluid rounded w-100" />
                </div>
                <div class="px-4 py-3">
                  <h5 class="fw-bold m-0">서성빈</h5>
                  <small>프론트엔드</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}


      {/* Footer Start */}
      <div class="container-fluid bg-primary text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5 px-lg-5">
          <div class="row g-5">
            <div class="col-md-6 col-lg-3">
              <h5 class="text-white mb-4">학교 정보</h5>
              <p><FaSchool className="me-3" />영진전문대학교 컴퓨터정보계열</p>
              <p><FaPhoneAlt className="me-3" />TEL: 053-940-5290</p>
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
              <div class="col-md-6 text-center text-md-end">
                <div class="footer-menu">
                  <a href="">Home</a>
                  <a href="">Cookies</a>
                  <a href="">Help</a>
                  <a href="">FQAs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Footer End  */}


    </div>
  );
};

export default DefaultBody;
