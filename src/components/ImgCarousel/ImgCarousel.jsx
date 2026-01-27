import { useEffect, useState } from "react";
import Styles from "./ImgCarousel.module.css";

function ImgCarousel() {
  // data, loading, and error states for data fetching
  const [fortniteDataArr, setFortniteDataArr] = useState(null);
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
      console.log("done");
    }
  }, []);

  //   loading state, display if API data is still being fetched
  if (loading) {
    return <div>News loading...</div>;
  }

//   error state, display if API fetch was unsuccessful (error code 400 or above)
if (fetchError) {
    return <div>A network error/fetching error occured.</div>
}


// data state, display when API data is fully usable
  return(
    <div className={Styles.carouselContainer}>
        <button>{"<"}</button>
        <ul>images here</ul>
        <button>{">"}</button>
    </div>
  );
}

export default ImgCarousel;
