import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {Link, useOutletContext} from "react-router";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";
import Footer from "../../components/Footer/Footer";
import FortniteMap from "../../components/FortniteMap/FortniteMap";
import Styles from "./Homepage.module.css";

function Homepage() {
  // cart useState, from parent route "root"
  const [cartArr, setCartArr] = useOutletContext();

  return (
    <>
      <main>
        <Header />
        <NavBar cart={cartArr}/>
        <ImgCarousel />
        <FortniteMap />
        <Footer />
      </main>
    </>
  );
}

export default Homepage;
