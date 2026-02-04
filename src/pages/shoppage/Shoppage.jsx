import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import TodayShop from "../../components/TodayShop/TodayShop";


function Shoppage() {
  return (
    <main>
      <Header />
      <NavBar />
      <Footer />
    </main>
  );
}

export default Shoppage;
