import Styles from "./Header.module.css";

function Header() {
    return(
        <header className={Styles.headerBox}>
            <h1 className={Styles.title}>Fortnite Item Shop </h1>
            <h6 className={Styles.disclaimer}>*this is a fake representation of the fortnite item shop. This is not associated with epic games in any way and is used purely for web development practice.*</h6>
        </header>

    );
}

export default Header;