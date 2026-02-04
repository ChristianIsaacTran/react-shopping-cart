import { useEffect, useState } from "react";
import Styles from "./FortniteMap.module.css";

function FortniteMap() {
  // loading, error, and data states for the map data
  const [fortniteMapData, setFortniteMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // useState for the current toggled fortnite map
  const [selectedMap, setSelectedMap] = useState(null);

  // fetch the current map image from fortnite API
  useEffect(() => {
    // abort controller used for cleanup function to prevent memory leaks
    const controller = new AbortController();
    const signal = controller.signal;

    const processMapData = (fortniteJSON) => {
      const tempMapObj = { ...fortniteJSON.data.images };

      // set the selected map to initially be the POI map
      setSelectedMap(tempMapObj.pois);

      return tempMapObj;
    };

    const fetchMapData = async () => {
      try {
        const APIresponse = await fetch("https://fortnite-api.com/v1/map", {
          signal,
        }); //signal passed to fetch request to use abort controller

        // check if api response is valid
        if (!APIresponse.ok) {
          throw new Error("API error");
        }

        const APIdata = await APIresponse.json();

        const fortniteMapObj = processMapData(APIdata);

        setFortniteMapData(fortniteMapObj);
      } catch (error) {
        // if its "AbortError", then ignore it. If it's an ACTUAL error, handle it
        if (error.name === "AbortError") {
          return console.log(
            "AbortError: Expected manual cancellation of API fetch, triggered by cleanup function. Ignore Error: FortniteMAP",
          );
        } else {
          setFetchError(error.message);
          setFortniteMapData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();

    // abort fetch during cleanup
    return () => {
      controller.abort();
    };
  }, []);

  //   Data still loading render
  if (loading || fortniteMapData === null) {
    return <h1 className={Styles.loading}>Map data loading...</h1>;
  }

  // API error render
  if (fetchError) {
    return (
      <h1 className={Styles.error}>A network error/fetching error occured.</h1>
    );
  }

  // utility functions for data render

  const toggleHandler = () => {
    if (selectedMap === fortniteMapData.pois) {
      // if the current selected map is the POI map, swap to blank map
      return setSelectedMap(fortniteMapData.blank);
    }

    // otherwise, swap to POI map
    return setSelectedMap(fortniteMapData.pois);
  };

  const renderToggleButton = () => {
    if (selectedMap === fortniteMapData.pois) {
      return (
        <button className={Styles.toggleButton} onClick={toggleHandler}>
          Hide POI{" "}
        </button>
      );
    } else {
      return(<button className={Styles.toggleButton} onClick={toggleHandler}>
        Show POI
      </button>);
    }
  };

  //   data render
  // TODO: a map object is now assigned to fortniteMapData, have a button that toggles hiding the POI or display POIS on the map
  return (
    <section>
      <h1 className={Styles.mapTitle}>Map</h1>
      <div className={Styles.buttonFlexContainer}>{renderToggleButton()}</div>
      <div className={Styles.mapFlexContainer}>
        <img
          src={selectedMap}
          alt="Current fortnite season map"
          className={Styles.fortniteMap}
        />
      </div>
    </section>
  );
}

export default FortniteMap;
