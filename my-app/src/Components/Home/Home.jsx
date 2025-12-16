import React from "react";
import '../../style/Home.css'
import BannerImg from '../../assets/BannerImg.png';
import { FaUser } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { MdAddToPhotos } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";
import { FaStackOverflow } from "react-icons/fa";
import { SiSmart } from "react-icons/si";
import { BiSolidReport } from "react-icons/bi";
import { FaChartPie } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Footer from "./Footer";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home-banner">
        <img src={BannerImg} alt="Banner" className="home-banner-img" />
        <div className="home-banner-content">
          <h1>Track And Manage Your Expenses Effortlessly.</h1>
          <p>Sign Up And Start Your Journey Today.</p>
        </div>
      </div>

      <div className="section-two">
        <h2>Simple Process You Need To Follow</h2>
        <div className="process-section">
          <span>
            <i>{<FaUser />}</i>Register
          </span>
          <span>
            {" "}
            <i>{<PiSignInBold size={25} />}</i>Login
          </span>
          <span>
            <i>{<MdAddToPhotos size={30} />}</i>Add Category
          </span>
          <span>
            <i>{<MdAddToPhotos size={30} />}</i>Add Transaction
          </span>
          <span>
            <i>{<RxDashboard size={30} />}</i>Check And Track In Dashboard
          </span>
        </div>
      </div>

      <div className="section-three">
        <h2>What Featurs You Get!</h2>

        <div className="feature-section">
          <div className="feature-card">
            <div className="icon-wrapper green">
              <i className="fa-solid fa-gauge-simple">
                <TbMoneybag size={35} />
              </i>
            </div>
            <h3>Have perfect control On Your Money</h3>
            <p>
              over all your cash expenses, bank accounts, E-Wallets and crypto
              wallets.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper pink">
              <i className="fa-solid fa-chart-pie">
                <FaStackOverflow size={35} />
              </i>
            </div>
            <h3>Get a quick overview</h3>
            <p>
              about your total incomes and expenses at a glance and in one
              place.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper blue">
              <i className="fa-solid fa-sack-dollar">
                <SiSmart size={35} />
              </i>
            </div>
            <h3>Use our smart budgets Sollution</h3>
            <p>
              to save money for a new car, dreamy vacation or top university.
            </p>
          </div>

          <div className="feature-section">
            <div className="feature-card">
              <div className="icon-wrapper green">
                <i className="fa-solid fa-gauge-simple">
                  <BiSolidReport size={35} />
                </i>
              </div>
              <h3>Get Insightfull Report</h3>
              <p>
                over all your cash expenses, bank accounts, E-Wallets and crypto
                wallets.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-wrapper pink">
                <i className="fa-solid fa-chart-pie">
                  <FaChartPie size={35} />
                </i>
              </div>
              <h3>Vizualize Chart Dashboard</h3>
              <p>
                about your total incomes and expenses at a glance and in one
                place.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-wrapper blue">
                <i className="fa-solid fa-sack-dollar">
                  <FaFilter size={35} />
                </i>
              </div>
              <h3>Transaction Filtering</h3>
              <p>
                to save money for a new car, dreamy vacation or top university.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
