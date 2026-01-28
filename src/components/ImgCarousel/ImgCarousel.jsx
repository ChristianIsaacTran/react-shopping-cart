import { useEffect, useState } from "react";
import Styles from "./ImgCarousel.module.css";
import NewsCard from "./NewsCard";
import BubbleNav from "./BubbleNav";

function ImgCarousel() {
  // data, loading, and error states for data fetching
  const [fortniteDataArr, setFortniteDataArr] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  // state for keeping track of maximum shift size. Minimum is always 0rem. Shift is 50rem
  const [limit, setLimit] = useState(0);

  // state for left and right button functionality
  const [shift, setShift] = useState(0);

  // API fetch and JSON data processing useEffect
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

        //calculate min and max limit for image shifting based on the total number of MOTDs
        const maxShift = (fortniteMOTDS.length - 1) * 50;
        setLimit(maxShift);

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

  // image carousel automatic shift interval useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      // check if right limit reached, loop to start
      if (shift >= limit) {
        return setShift(0);
      }

      return setShift((previousShift) => previousShift + 50);
    }, 8000);

    // cleanup interval
    return () => clearInterval(interval);
  }, [limit, shift]);

  //   loading state, display if API data is still being fetched
  if (loading) {
    return <div>News loading...</div>;
  }

  //   error state, display if API fetch was unsuccessful (error code 400 or above)
  if (fetchError) {
    return <div>A network error/fetching error occured.</div>;
  }

  //   utility functions for data state render

  //   make an array of NewsCard components to dynamically render under <ul>
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

  // make an array of buttons for the navigation bubbles under the images
  const makeBubbleNav = () => {
    let tempShiftVal = 0;
    const bubbleNavArr = fortniteDataArr.map(() => {
      const tempComponent = <BubbleNav key={crypto.randomUUID()} bubbleShiftValue={tempShiftVal} currentShift={shift} setShiftFunc={setShift}/>;
      tempShiftVal = tempShiftVal + 50;
      return tempComponent;
    });

    return bubbleNavArr;
  };

  //   shifts the <ul> visually to the left to reveal the next MOTD
  const leftButtonHandler = () => {
    // check if left limit has been reached, loop image carousel back to the end
    if (shift <= 0) {
      return setShift(limit);
    }

    // shifting left 50 rem

    return setShift((previousShift) => previousShift - 50);
  };

  //   shifts the <ul> visually to the right to reveal the next MOTD
  const rightButtonHandler = () => {
    // check if right limit has been reached, loop image carousel to the beginning
    if (shift >= limit) {
      return setShift(0);
    }

    // shifting right 50 rem

    return setShift((previousShift) => previousShift + 50);
  };

  // data state, display when API data is fully usable
  return (
    <div className={Styles.componentContainer}>
      <h1 className={Styles.mainTitle}>News</h1>
      <div className={Styles.uiContainer}>
        <button
          type="button"
          className={Styles.left}
          onClick={leftButtonHandler}
        >
          {"<"}
        </button>
        <div className={Styles.carouselContainer}>
          <ul
            className={Styles.carouselList}
            style={{ right: `${shift}rem` }}
          >
            {makeNewsCards()}
          </ul>
          <ul className={Styles.bubbleNav}>{makeBubbleNav()}</ul>
        </div>
        <button
          type="button"
          className={Styles.right}
          onClick={rightButtonHandler}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ImgCarousel;
