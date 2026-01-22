import { Link } from "react-router";
import Styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={Styles.linkContainer}>
      <div className={Styles.linkOutlineBox}>
        <div className={Styles.skewBox}></div>
        <div className={Styles.shineBox}></div>
        <Link className={Styles.linkText}>Homepage</Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <Link className={Styles.linkText}>Shop</Link>
      </div>
      <div className={Styles.linkOutlineBox}>
        <Link className={Styles.linkText}>Cart</Link>
      </div>
    </nav>
  );
}

export default NavBar;
