import Styles from "./Card.module.css";
import vbucksLogo from "../../assets/images/fortniteVBucks.png";

function Card({ cryptoKey, itemData }) {
  console.log(itemData);

  //   returns rarity styling depending on the item rarity
  const checkRarity = (isBundle = false) => {
    // check if the item object is a bundle. If it is, have the rarity banner say bundle
    if (isBundle) {
      return (
        <div className={Styles.rarityLine + " " + Styles.bundle}>BUNDLE</div>
      );
    }

    // if normal item, then check rarity
    // converts string rarity to lowercase for easier comparison
    const rarity = itemData.brItems[0].rarity.displayValue.toLowerCase();

    if (rarity === "legendary") {
      // legendary rarity check
      return <div className={Styles.rarityLine + " " + Styles.legendary}></div>;
    } else if (rarity === "epic") {
      // epic rarity check
      return <div className={Styles.rarityLine + " " + Styles.epic}></div>;
    } else if (rarity === "rare") {
      // rare rarity check
      return <div className={Styles.rarityLine + " " + Styles.rare}></div>;
    } else if (rarity === "uncommon") {
      // uncommon rarity check
      return <div className={Styles.rarityLine + " " + Styles.uncommon}></div>;
    } else if (rarity === "common") {
      // common rarity check
      return <div className={Styles.rarityLine + " " + Styles.common}></div>;
    } else if (rarity === "icon series") {
      // icon series rarity check
      return <div className={Styles.rarityLine + " " + Styles.icon}></div>;
    } else if (rarity === "marvel series") {
      // marvel series rarity check
      return <div className={Styles.rarityLine + " " + Styles.marvel}></div>;
    } else if (rarity === "gaming legends series") {
      // gaming legends series rarity check
      return (
        <div className={Styles.rarityLine + " " + Styles.gamingLegends}></div>
      );
    } else if (rarity === "star wars series") {
      // star wars series rarity check
      return <div className={Styles.rarityLine + " " + Styles.starWars}></div>;
    } else if (rarity === "dc series") {
      // DC series rarity check
      return <div className={Styles.rarityLine + " " + Styles.dc}></div>;
    } else if (rarity === "slurp series") {
      // slurp series rarity check
      return <div className={Styles.rarityLine + " " + Styles.slurp}></div>;
    } else if (rarity === "shadow series") {
      // shadow series rarity check
      return <div className={Styles.rarityLine + " " + Styles.shadow}></div>;
    } else if (rarity === "lava series") {
      // lava series rarity check
      return <div className={Styles.rarityLine + " " + Styles.lava}></div>;
    } else if (rarity === "frozen series") {
      // frozen series rarity check
      return <div className={Styles.rarityLine + " " + Styles.frozen}></div>;
    } else if (rarity === "dark series") {
      // dark series rarity check
      return <div className={Styles.rarityLine + " " + Styles.dark}></div>;
    }

    return <div>rarity not found...</div>;
  };

  // checks if the item is a bundle, regular item, jamtrack, etc. and renders the respective information
  const renderItemType = () => {
    if (Object.hasOwn(itemData, "bundle")) {
      // check if item is a bundle

      return (
        <>
          <img
            src={itemData.bundle.image}
            alt="bundle image"
            className={Styles.cardImg}
          />
          <div className={Styles.bottomContainer}>
            {checkRarity(true)}
            <h3 className={Styles.cardName}>{itemData.bundle.name}</h3>
            <div className={Styles.vbucksGroup}>
              <p className={Styles.cardPrice}>{itemData.finalPrice}</p>
              <img
                src={vbucksLogo}
                alt="vbucks logo"
                className={Styles.vbucksLogo}
              />
            </div>
          </div>
        </>
      );
    } else if (Object.hasOwn(itemData, "tracks")) {
      // check if item is a jamtrack

      //   all jam tracks are of uncommon rarity
      return (
        <>
          <img
            src={itemData.tracks[0].albumArt}
            alt="album art"
            className={Styles.cardImg}
          />
          <div className={Styles.bottomContainer}>
            <div className={Styles.rarityLine + " " + Styles.uncommon}></div>
            <h3 className={Styles.cardName}>{itemData.tracks[0].title}</h3>
            <div className={Styles.vbucksGroup}>
              <p className={Styles.cardPrice}>{itemData.finalPrice}</p>
              <img
                src={vbucksLogo}
                alt="vbucks logo"
                className={Styles.vbucksLogo}
              />
            </div>
          </div>
        </>
      );
    } else if (Object.hasOwn(itemData, "brItems")) {
      // check if item is a normal item

      //   check rarity of the individual item and gets styling depending on the rarity
      return (
        <>
          <img
            src={
              itemData.brItems[0].images.icon ||
              itemData.brItems[0].images.featured
            }
            alt="item image"
            className={Styles.cardImg}
          />
          <div className={Styles.bottomContainer}>
            {checkRarity()}
            <h3 className={Styles.cardName}>{itemData.brItems[0].name}</h3>
            <div className={Styles.vbucksGroup}>
              <p className={Styles.cardPrice}>{itemData.finalPrice}</p>
              <img
                src={vbucksLogo}
                alt="vbucks logo"
                className={Styles.vbucksLogo}
              />
            </div>
          </div>
        </>
      );
    }

    return <h1>Error: item data not found. Check API and component </h1>;
  };

  return (
    <li className={Styles.listItem} key={cryptoKey}>
      {renderItemType()}
    </li>
  );
}

export default Card;
