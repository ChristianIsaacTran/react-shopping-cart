import Styles from "./NewsCard.module.css";

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

export default NewsCard;
