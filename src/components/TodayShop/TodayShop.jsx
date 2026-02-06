import { useState, useEffect } from "react";
import Styles from "./TodayShop.module.css";
import CardGroup from "./CardGroup";

function TodayShop() {
  // TODO: make the item shop generate cards for today's item shop

  const [loading, setLoading] = useState(true);
  const [shopData, setShopData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // abort controller for api fetch cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    const processShopData = (shopJSON) => {
      // copy the JSON data for easier manipulation
      let tempCopyArr = [...shopJSON.data.entries];

      // separate all items in the array into item groups. note: make sure to include an initial value to start with for accumulator. In this case, {}
      const groupItems = tempCopyArr.reduce((groupObj, currentItem) => {
        // generate a UUID property for use in the key property for the current item
        currentItem["uniqueKey"] = crypto.randomUUID();

        if (
          groupObj[currentItem.layout.name] !== null &&
          groupObj[currentItem.layout.name] !== undefined
        ) {
          // if there is already an array for this item group, add to it
          groupObj[currentItem.layout.name].push(currentItem);
        } else {
          // if there is no array for this item group, make one and add the current object to it
          groupObj[currentItem.layout.name] = [];
          groupObj[currentItem.layout.name].push(currentItem);
        }
        return groupObj;
      }, {});

      return groupItems;
    };

    const fetchShopData = async () => {
      try {
        const APIResponse = await fetch("https://fortnite-api.com/v2/shop", {
          signal,
        });

        const shopJSON = await APIResponse.json();

        const processedData = processShopData(shopJSON);

        setShopData(processedData);
      } catch (error) {
        if (error.name === "AbortError") {
          return console.log(
            "AbortError: Expected manual cancellation of API fetch, triggered by cleanup function. Ignore Error: TodayShop",
          );
        } else {
          setError(error.message);
          setShopData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();

    return () => {
      controller.abort();
    };
  }, []);

  //   loading state
  if (loading) {
    return <h1 className={Styles.loading}>Today's Shop is Loading...</h1>;
  }

  //   error state
  if (error) {
    return (
      <h1 className={Styles.error}> A network error/fetching error occured.</h1>
    );
  }

  //   TODO: make card child-components and render them in an <ul>
  //   data state
  const generateCardGroup = () => {
    const renderArr = [];

    // iterate through the shop data's keys and values, making cards and card groups for each key-value pair
    for (const [itemGroupName, itemArr] of Object.entries(shopData)) {
      
        renderArr.push(
        <CardGroup key={itemArr[0].uniqueKey} itemGroupName={itemGroupName} items={itemArr} />,
      );
    }

    return renderArr;
  };

  return (
    <section>
      <h1 className={Styles.shopTitle}>Today's Item Shop</h1>
      {shopData && generateCardGroup()}
    </section>
  );
}

export default TodayShop;
