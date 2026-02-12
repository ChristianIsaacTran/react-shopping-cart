import { Link } from "react-router";
import Styles from "./NavBar.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

function NavBar({ cart }) {
  const renderCartAmountIcon = () => {
    // if there is nothing in the cart, do nothing
    if (cart.length === 0) {
      return;
    }

    return <div className={Styles.cartIcon}>{cart.length}</div>;
  };

  return (
    <nav className={Styles.linkContainer}>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../homepage">
          Homepage
        </Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../shop">
          Shop
        </Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../cart">
          Cart
        </Link>
        {renderCartAmountIcon()}
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default NavBar;
