import Styles from "./CardGroup.module.css";
import Card from "./Card";
import PropTypes from "prop-types";

function CardGroup({ itemGroupName, items }) {

  const generateCards = () => {
    let cardArr = [];

    // for each item in the items prop, make a <li> card/Card component
    cardArr = items.map((item) => {
      return <Card key={item.uniqueKey} itemData={item} cryptoKey={item.uniqueKey}  />;
    });

    return cardArr;
  };

  return (
    <div>
      <h1 className={Styles.groupTitle}>{itemGroupName}</h1>
      <ul className={Styles.itemList}>{generateCards()}</ul>
    </div>
  );
}

CardGroup.propTypes = {
    itemGroupName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired

}

export default CardGroup;
