import Styles from "./NewsCard.module.css";
import PropTypes from "prop-types";

function NewsCard({ newsImg, newsDescription, newsTitle }) {
  return (
    <li className={Styles.newsItem}>
      <img className={Styles.newsImg} src={newsImg} alt="fortnite news image" />
      <div className={Styles.newsContent}>
        <h1 className={Styles.newsTitle}>{newsTitle}</h1>
        <p className={Styles.newsDesc}>{newsDescription}</p>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  newsImg: PropTypes.string.isRequired,
  newsDescription: PropTypes.string.isRequired,
  newsTitle: PropTypes.string.isRequired,
};

export default NewsCard;
