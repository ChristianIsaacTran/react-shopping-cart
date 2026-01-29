import githubIcon from "../../assets/images/github.svg";
import Styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={Styles.footer}>
      <h3 className={Styles.credit}>Made by Christian Tran</h3>
      <div className={Styles.githubContainer}>
        <h3 className={Styles.githubTitle}>Github</h3>
        <a href="https://github.com/ChristianIsaacTran" className={Styles.githubLink}>
          <img className={Styles.githubImg} src={githubIcon} alt="github link" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
