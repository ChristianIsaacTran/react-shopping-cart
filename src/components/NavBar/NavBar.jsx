import { Link } from "react-router";
import Styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={Styles.linkContainer}>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../homepage">Homepage</Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../shop">Shop</Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText} to="../cart">Cart</Link>
      </div>
    </nav>
  );
}

export default NavBar;
