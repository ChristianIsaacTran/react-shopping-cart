import PropTypes from "prop-types";
import { useState } from "react";
import {Link} from "react-router";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Cartpage() {
  return (
    <main>
      <Header /> 
      <NavBar />
      <div>This is the cart page</div>
      <Footer />
    </main>
  );
}

export default Cartpage;
