import PropTypes from "prop-types";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";
import Footer from "../../components/Footer/Footer";
import FortniteMap from "../../components/FortniteMap/FortniteMap";
import Styles from "./Homepage.module.css";

function Homepage() {
  return (
    <>
      <main>
        <Header />
        <NavBar />
        <ImgCarousel />
        <FortniteMap />
        <Footer />
      </main>
    </>
  );
}

export default Homepage;
