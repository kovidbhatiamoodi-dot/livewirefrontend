import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-scroll";
import RegisterModal from "../register/RegisterModal";

import Music from "../../assets/music.svg";
import MiLogo from "../../assets/moodLogo.png";
import Elipes from "../../assets/about_elip.svg";

import First_slider from "../../assets/slider/bigOne.png";
import Second_slider from "../../assets/slider/bigTwo.png";
import Third_slider from "../../assets/slider/bigThree.png";
import Four_slider from "../../assets/slider/bigFour.png";
import Five_slider from "../../assets/slider/bigFive.png";
import Six_slider from "../../assets/slider/bigSix.png";

import Errow_l from "../../assets/errow_l.svg";
import Errow_r from "../../assets/errow_r.svg";
import AboutLine from "../../assets/about_line.svg";
import AboutMain from "../../assets/about_main.svg";
import Cash from "../../assets/prizes/cash.svg";
import Stage from "../../assets/prizes/stage.svg";
import Festival from "../../assets/prizes/festival.svg";
import Guitar from "../../assets/prizes/guitar.svg";
import Phone from "../../assets/prizes/phone.svg";
import Microphone from "../../assets/prizes/microphone.svg";
import Schedule_cash from "../../assets/prizes/schedule.svg";
import Shilong from "../../assets/shilong.svg";
import Mumbai from "../../assets/mumbai.svg";
import Pune from "../../assets/pune.svg";
import Bangalore from "../../assets/banglore.svg";
import Delhi from "../../assets/delhi.svg";
import Cross from "../../assets/Cross.png";

import One from "../../assets/partners/one.svg";
import Two from "../../assets/partners/two.svg";
import Three from "../../assets/partners/three.svg";
import Four from "../../assets/partners/four.svg";

import SomeGood from "../../assets/partners/some_good.png";
import Bluethree from "../../assets/partners/Bluetree.png";
import Merchant from "../../assets/partners/merchant.png";
import KATHA from "../../assets/partners/KATHA.jpg";
import SBRS from "../../assets/partners/SBRS.jpg";
import BAY from "../../assets/partners/BAY.jpg";
import Stu from "../../assets/partners/stu.png";

import Schedule from "../../assets/schedule.svg";
import "./css/home.css";

const SCHEDULE = [
  { city: "PUNE", date: "18th OCTOBER", mode: "OFFLINE", img: Pune, status: "COMPLETED" },
  { city: "AHMEDABAD", date: "25th OCTOBER", mode: "OFFLINE", img: Bangalore, status: "COMPLETED" },
  { city: "MUMBAI", date: "29th NOVEMBER", mode: "OFFLINE", img: Mumbai, round: "mumbai_offline" },
  { city: "GOA", date: "6th DECEMBER", mode: "OFFLINE", img: Bangalore, status: "DETAILS SOON" },
  { city: "DELHI", mode: "ONLINE", img: Delhi, round: "online" },
  { city: "BANGALORE", mode: "ONLINE", img: Bangalore, round: "online" },
  { city: "SHILLONG", mode: "ONLINE", img: Shilong, round: "online" },
  { city: "REST OF INDIA", mode: "ONLINE", img: Pune, round: "online" },
];

const Home = () => {
  const [registerRound, setRegisterRound] = useState(null);
  const openRegister = (round = "online") => setRegisterRound(round);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    { src: First_slider, alt: "First", title: "PARIKRAMA" },
    { src: Second_slider, alt: "Second", title: "PENTAGRAM" },
    { src: Third_slider, alt: "Third", title: "KRAKEN" },
    { src: Four_slider, alt: "Four", title: "THE F16S" },
    { src: Five_slider, alt: "Five", title: "BHAYANAK MAUT" },
    { src: Six_slider, alt: "Six", title: "SMALLTALK" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1)); // Wrap around at the end
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [images.length]);

  const getVisibleImages = () => {
    if (activeSlide === 0) {
      return [
        images[images.length - 1],
        images[activeSlide],
        images[activeSlide + 1],
      ];
    } else if (activeSlide === images.length - 1) {
      return [images[activeSlide - 1], images[activeSlide], images[0]];
    } else {
      return [
        images[activeSlide - 1],
        images[activeSlide],
        images[activeSlide + 1],
      ];
    }
  };

  const visibleImages = getVisibleImages();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const svgRef = useRef(null);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div class="navbar">
        <div class="mi-logo">
          <Link to="page1" smooth={true} duration={500}>
            <img src={MiLogo} alt="" class="logo" />
          </Link>
        </div>
        <div class="nav-icons">
          <Link to="page2" smooth={true} duration={500}>
            <div className="nav-icon">about us</div>
          </Link>
          <Link to="page3" smooth={true} duration={500}>
            <div className="nav-icon">past winners</div>
          </Link>
          <Link to="page4" smooth={true} duration={500}>
            <div className="nav-icon">prizes</div>
          </Link>
          <Link to="page5" smooth={true} duration={500}>
            <div className="nav-icon">schedule</div>
          </Link>
          <Link to="page6" smooth={true} duration={500}>
            <div className="nav-icon">partners</div>
          </Link>
        </div>
        <div class="register-btn">
          <button class="register" onClick={() => openRegister()}>
            REGISTER
          </button>
        </div>
      </div>

      <div class="arrow">
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
        <div class="arrow-head active"></div>
        <div class="arrow-head"></div>
      </div>

      <div className="page-1-bg" id="page1">
        <div className="page-1">
          <div className="page1-text-container">
            <div className="sub-head">MOOD INDIGO, IIT BOMBAY'S</div>
            <div className="main-head">LIVEWIRE</div>
            <div className="margin-div"></div>
            <div className="sub-head">
              INDIA'S LARGEST AND OLDEST SEMI-PRO BAND COMPETITION
            </div>
          </div>
        </div>
      </div>

      <div className="page-2" id="page2">
        <img src={Elipes} alt={Elipes} className="about_elips" />
        <div className="about_main">
          <img src={AboutMain} alt={AboutMain} />
        </div>
        <img src={AboutLine} alt={AboutLine} className="about_line" />
        <div className="heading_container">
          <div className="about_heading">
            <div className="abo_head_main">
              {windowWidth > 500 ? (
                <>
                  <p>ABOUT</p>
                  {windowWidth > 800 && <p>LIVEWIRE</p>}
                </>
              ) : (
                <p>ABOUT LIVEWIRE</p>
              )}
            </div>
            <div className="abo_head_main_b">
              <p>IT’S TIME FOR YOU TO PARTICIPATE</p>
              <div class="register-btn">
                <button class="register" onClick={() => openRegister()}>
                  REGISTER
                </button>
              </div>
            </div>
          </div>
          <div className="abot_head_b">
            <p>
              LiveWire is the celebration of independent music in India and aims
              to bring out the most unique music from various parts of our
              nation
            </p>

            <p>
              Livewire has been instrumental in promoting the independent music
              scene in India for the past 40 years.
            </p>

            <p>
              Over the years, Livewire has seen the birth of some of the
              country's greatest bands.
            </p>
            <p>It’s your chance to participate and make the most of it!</p>
          </div>
        </div>
      </div>
      <div className="page-3" id="page3">
        <div className="page_main">
          <div className="page_th">
            <img
              src={images[activeSlide].src}
              alt={images[activeSlide].alt}
              className="winner_main"
            />
            <div className="winner_img_div">
              <img src={Errow_l} alt="errow" className="errow_l" />
              {visibleImages.map((image, index) => (
                <div key={index} className="small_image_container">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`small_image ${activeSlide === index ? "active" : ""
                      }`} // Add 'active' class to highlight the current slide
                  />
                </div>
              ))}
              <img src={Errow_r} alt="errow" className="errow_l" />
            </div>
          </div>
          <div className="winner_head">
            <p className="winner_head_main">PAST WINNERS</p>
            <div className="winner_head_a">
              <div className="karen">
                <img src={Music} alt="music" className="music" />
                <p>{images[activeSlide].title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-4" id="page4">
        <div className="page_details">
          <p className="prize_head">PRIZES</p>
          <div className="prize_main">
            <div className="prize_contained">
              <p className="cash_head">Cash Prize</p>

              <img src={Cash} alt="cash" className="cash" />
              <div>
                <p className="cash_head_a">Win Cash Prize of 1.2 Lakhs</p>
              </div>
            </div>
            <div className="prize_contained">
              <p className="cash_head">MOOD INDIGO PERFORMANCE</p>
              <img src={Stage} alt="cash" className="cash" />
              <div>
                <p className="cash_head_a">
                  Get to perform at the Mood Indigo mainstage
                </p>
              </div>
            </div>
            <div className="prize_contained">
              <p className="cash_head">GEAR COUPONS</p>

              <img src={Guitar} alt="cash" className="cash" />
              <div>
                <p className="cash_head_a">
                  Get Gear coupons worth 1.2 Lakh INR from Furtados
                </p>
              </div>
            </div>
          </div>
          <div className="prize_main prize_main_b">
            <div className="prize_contained">
              <p className="cash_head">GIG PERFORMANCE BY BLUETREE</p>

              <img src={Festival} alt="cash" className="cash" />
              <div>
                <p className="cash_head_a">
                  Get a Paid Performance Slot at a gig by Bluetree
                </p>
              </div>
            </div>
            <div className="prize_contained">
              <p className="cash_head">MUSICULTURE</p>

              <img src={Phone} alt="Musiculture" className="cash" />
              <div>
                <p className="cash_head_a">
                  Get a Free Music Publishing and Distribution Deal through Musiculture
                </p>
              </div>
            </div>
            <div className="prize_contained">
              <p className="cash_head">SAREGAMA</p>

              <img src={Microphone} alt="Saregama" className="cash" />
              <div>
                <p className="cash_head_a">
                  Get to record and publish a song with Saregama
                </p>
              </div>
            </div>
            <div className="prize_contained">
              <p className="cash_head">FREE STUDIO TIME IN YOUR CITY</p>
              <img src={Schedule_cash} alt="cash" className="cash" />
              <div>
                <p className="cash_head_a">
                  Studio time to record an entire Album
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-5" id="page5">
        <p className="pagefive_heading">Schedule Plan</p>
        <svg
          ref={svgRef}
          className="line"
          width="13"
          height="1026"
          viewBox="0 0 13 1026"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 98)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 294)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 490)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 686)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 882)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 1078)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 1274)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 1470)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 1666)"
            stroke="white"
          />
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            transform="matrix(1 0 0 -1 0 1862)"
            stroke="white"
          />
          <line
            x1="6.5"
            y1="0.5"
            x2="6.5"
            y2="85.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="881.5"
            x2="6.5"
            y2="1025.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="97.5"
            x2="6.50001"
            y2="281.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="293.5"
            x2="6.50001"
            y2="477.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="489.5"
            x2="6.50001"
            y2="673.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="869.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="1065.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="1261.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="1457.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="1653.5"
            stroke="white"
            stroke-linecap="round"
          />
          <line
            x1="6.5"
            y1="685.5"
            x2="6.50001"
            y2="1849.5"
            stroke="white"
            stroke-linecap="round"
          />
        </svg>
        <div className="pagefive_main">
          <img src={Schedule} alt="schedule" className="scheduel" />
          <div className="shedule_container">
            {SCHEDULE.map((item) => (
              <div className="shedule_main" key={item.city}>
                <div className="shedule_contained">
                  <p className="shedule_heading">{item.city}</p>
                  <div className="shedule_subhead">
                    {item.date && <p>{item.date}</p>}
                    <p>{item.mode}</p>
                    {item.status && <p>{item.status}</p>}
                    {item.round && (
                      <button class="register" onClick={() => openRegister(item.round)}>
                        REGISTER
                      </button>
                    )}
                  </div>
                </div>

                <img src={item.img} alt={item.city} className="shilong_img" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-6" id="page6">
        <div className="page6_main">
          <p className="page_six_head">PARTNERS</p>
          <div className="partners_main">
            <div className="partners_details">
              <p className="partners_heading">Promotion Partner</p>
              <img src={SomeGood} alt={Two} className="partner-img" />
            </div>
            <div className="partners_details">
              <p className="partners_heading">Gig Partner</p>
              <img src={Bluethree} alt={One} className="partner-img" />
            </div>
            <div className="partners_details">
              <p className="partners_heading">Record Label Partner</p>
              <img src={Merchant} alt={Three} className="partner-img" />
            </div>
            <div className="partners_details">
              <p className="partners_heading">Tour Partner</p>
              <img src={Four} alt={Four} className="partner-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="foot-comp" id="27">
          <h3 className="foot-head">ADDRESS</h3>
          <p className="foot-cont">
            Mood Indigo Office,
            <br />
            Student Activity Centre,
            <br />
            IIT Bombay.
          </p>
        </div>

        <div className="foot-comp contact" id="33">
          <p className="foot-head">CONTACT</p>
          <div className="foot-cont">
            <p>
              Yog Sonawane: <a href="tel:+917977058957">+91 79770 58957</a>
            </p>
            <p>
              Ranbir Sinha <a href="tel:+919137622913">+91 91376 22913</a>
            </p>
          </div>
        </div>

        <div className="foot-comp" id="34">
          <h3 className="foot-head">E-MAIL</h3>
          <p className="foot-cont">
            <a href="mailto:yog@moodi.org">
              yog@moodi.org
            </a>
            <br />
            <a href="mailto:ranbir@moodi.org">ranbir@moodi.org</a>
          </p>
        </div>

        <div className="foot-comp" id="35">
          <h3 className="foot-head">FOLLOW US</h3>
          <div className="foot-logos">
            <a
              href="https://www.facebook.com/iitbombay.moodi"
              className="foot-logo"
              aria-label="Facebook"
            >
              <FaFacebookF
                size={window.innerWidth > 800 ? 40 : 20}
                color="white"
                className="foot_logo"
              />
            </a>
            <a
              href="https://www.instagram.com/iitbombay.moodi/"
              className="foot-logo"
              aria-label="Instagram"
            >
              <FaInstagram
                size={window.innerWidth > 800 ? 40 : 20}
                color="white"
                className="foot_logo"
              />
            </a>
            <a
              href="https://twitter.com/iitb_moodi?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              className="foot-logo"
              aria-label="Twitter"
            >
              <FaTwitter
                size={window.innerWidth > 800 ? 40 : 20}
                color="white"
                className="foot_logo"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/mood-indigo/mycompany/"
              className="foot-logo"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                size={window.innerWidth > 800 ? 40 : 20}
                color="white"
                className="foot_logo"
              />
            </a>
          </div>
        </div>
      </div>

      <RegisterModal
        event="livewire"
        closeIcon={Cross}
        open={registerRound !== null}
        initialRound={registerRound || "online"}
        onClose={() => setRegisterRound(null)}
      />
    </div>
  );
};

export default Home;
