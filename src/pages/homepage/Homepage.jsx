import PropTypes from "prop-types";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";

function Homepage() {
  return (
    <>
      <div>
        <Header />
        <NavBar />
      </div>
    </>
  );
}

export default Homepage;
