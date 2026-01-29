import PropTypes from "prop-types";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";
import Footer from "../../components/Footer/Footer";
import Styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <div>
        <Header />
        <NavBar />
        <ImgCarousel />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
