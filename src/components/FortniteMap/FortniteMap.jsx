import { useEffect, useState } from "react";
import Styles from "./FortniteMap.module.css";

function FortniteMap() {
  // loading, error, and data states for the map data
  const [fortniteMapData, setFortniteMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // fetch the current map image from fortnite API
  useState(() => {
    const processMapData = (fortniteJSON) => {
      const tempMapObj = { ...fortniteJSON.data.images };

      return tempMapObj;
    };

    const fetchMapData = async () => {
      try {
        const APIresponse = await fetch("https://fortnite-api.com/v1/map");

        // check if api response is valid
        if (!APIresponse.ok) {
          throw new Error("API error");
        }

        const APIdata = await APIresponse.json();

        const fortniteMapObj = processMapData(APIdata);

        setFortniteMapData(fortniteMapObj);
      } catch (error) {
        setFortniteMapData(null);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // API error render
  if (fetchError) {
    return <h1 className={Styles.error}>A network error/fetching error occured.</h1>;
  }

  //   Data still loading render
  if (loading) {
    return <h1 className={Styles.loading}>Map data loading...</h1>;
  }

  //   data render

  // TODO: a map object is now assigned to fortniteMapData, have a button that toggles hiding the POI or display POIS on the map
  return (
    <section>
      <h1 className={Styles.mapTitle}>Map</h1>
    </section>
  );
}

export default FortniteMap;
