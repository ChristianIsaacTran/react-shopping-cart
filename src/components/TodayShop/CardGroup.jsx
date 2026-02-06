import Styles from "./CardGroup.module.css";
import Card from "./Card";

function CardGroup({ itemGroupName, items }) {
  console.log(itemGroupName);

  const generateCards = () => {
    let cardArr = [];

    // for each item in the items prop, make a <li> card/Card component
    cardArr = items.map((item) => {
      return <Card key={item.uniqueKey} itemData={item} />;
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

export default CardGroup;
