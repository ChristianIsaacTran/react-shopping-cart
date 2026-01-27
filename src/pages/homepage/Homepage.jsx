import PropTypes from "prop-types";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";
import Styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <div>
        <Header />
        <NavBar />
        <ImgCarousel />
      </div>
    </>
  );
}

export default Homepage;
