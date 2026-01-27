import { useEffect, useState } from "react";
import Styles from "./ImgCarousel.module.css";
import NewsCard from "./NewsCard";

function ImgCarousel() {
  // data, loading, and error states for data fetching
  const [fortniteDataArr, setFortniteDataArr] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const processFortniteData = (fortniteJSON) => {
        // extract and copy the MOTD object array to a temp and return that
        const tempArr = [...fortniteJSON.data.br.motds];

        return tempArr;
      };

      const fetchFortniteData = async () => {
        // fetch today's fortnite news
        const fortniteAPIResponse = await fetch(
          "https://fortnite-api.com/v2/news",
        );
        const fortniteJSON = await fortniteAPIResponse.json();
        const fortniteMOTDS = processFortniteData(fortniteJSON);
        setFortniteDataArr(fortniteMOTDS);
      };

      fetchFortniteData();
    } catch (error) {
      setFetchError(error.message);
      setFortniteDataArr(null);
    } finally {
      // if fetch went well, then change loading to false to trigger final render upon re-render of data
      setLoading(false);
    }
  }, []);

  //   loading state, display if API data is still being fetched
  if (loading) {
    return <div>News loading...</div>;
  }

  //   error state, display if API fetch was unsuccessful (error code 400 or above)
  if (fetchError) {
    return <div>A network error/fetching error occured.</div>;
  }

  //   utility functions for data state render
  const makeNewsCards = () => {
    const tempCardArr = fortniteDataArr.map((news) => {
      return (
        <NewsCard
          key={crypto.randomUUID()}
          newsImg={news.image}
          newsDescription={news.body}
          newsTitle={news.title}
        />
      );
    });

    return tempCardArr;
  };

  // data state, display when API data is fully usable
  return (
    <div className={Styles.uiContainer}>
      <button className={Styles.left}>{"<"}</button>
      <div className={Styles.carouselContainer}>
        <ul className={Styles.carouselList}>{makeNewsCards()}</ul>
      </div>
      <button className={Styles.right}>{">"}</button>
    </div>
  );
}

export default ImgCarousel;
