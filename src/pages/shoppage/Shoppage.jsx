import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import TodayShop from "../../components/TodayShop/TodayShop";

function Shoppage() {
  // cart useState, from parent route "root"
  const [cartArr, setCartArr] = useOutletContext();

  console.log("SHOP PAGE: ");
  console.log(cartArr);

  return (
    <main>
      <Header />
      <NavBar cart={cartArr} />
      <TodayShop setCart={setCartArr} cart={cartArr} />
      <Footer />
    </main>
  );
}

export default Shoppage;
