import PropTypes from "prop-types";
import { useState } from "react";
import {Link, useOutletContext} from "react-router";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CartManager from "../../components/CartManager/CartManager";

function Cartpage() {
  // cart useState, from parent route "root"
  const [cartArr, setCartArr] = useOutletContext();

  return (
    <main>
      <Header /> 
      <NavBar cart={cartArr}/>
      <CartManager cart={cartArr} setCart={setCartArr}/>
      <Footer />
    </main>
  );
}

export default Cartpage;
