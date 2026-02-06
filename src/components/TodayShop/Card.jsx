function Card({ cryptoKey, itemData }) {
  console.log(itemData);

  // checks if the item is a bundle, regular item, jamtrack, etc. and renders the respective information
  const renderItemType = () => {
    if (Object.hasOwn(itemData, "bundle")) {
      // check if item is a bundle
      return (
        <>
          <h3>{itemData.bundle.name}</h3>
          <img src={itemData.bundle.image} alt="bundle image" />
          <p>{itemData.finalPrice}</p>
        </>
      );
    } else if (Object.hasOwn(itemData, "tracks")) {
      // check if item is a jamtrack
      return (
        <>
          <h3>{itemData.tracks[0].title}</h3>
          <img src={itemData.tracks[0].albumArt} alt="album art" />
          <p>{itemData.finalPrice}</p>
        </>
      );
    } else if(Object.hasOwn(itemData, "brItems")) {
        // check if item is a normal item
        return(<>
        <h3>{itemData.brItems[0].name}</h3>
        <img src={itemData.brItems[0].images.icon} alt="item image" />
        <p>{itemData.finalPrice}</p>
        </>);
    }

    return(<h1>Error: item data not found. Check API and component </h1>);
  };

  return <li key={cryptoKey}>{renderItemType()}</li>;
}

export default Card;
