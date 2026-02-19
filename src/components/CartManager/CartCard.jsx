/*
 copy logic from TodayShop component's Card.jsx to create cards, but 
 list them out going down with the item information. 

 It's going to be a <ul> in the parent CartManager, that lists all items in the cart, each with the 
 item information and functionalities like changing the item amount logic (with some tweaks). 
*/

import Styles from "./CartCard.module.css";
import vbucksLogo from "../../assets/images/fortniteVBucks.png";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

function CartCard({ setCart, cart, itemData, cryptoKey, currentCartItem }) {
  // useState for the item amount input field. Inputs are always strings.
  // set initial state to be the amount in currentCartItem, but as a string.
  const [amountValue, setAmountValue] = useState(
    currentCartItem.amount.toString(),
  );

  // used to display "edited cart!" message after user submits form successfully
  const [visible, setVisible] = useState({ visiblity: false, key: 0 });

  // used to reference input to clear errors on valid submission after error catch
  const inputRef = useRef(null);

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

  //  function returns jsx element to add a number variable input, and an increment and decrement button to item
  const addNumberInput = () => {
    // handles user input change, prevents the use of + and e in numerical input, and any input outside the range
    const amountOnChangeHandler = (e) => {
      // check if input field is empty, then replace with zero
      if (e.target.value === "") {
        // edit cart number when amount is empty (zero)
        return setAmountValue("0");
      }

      // input number received, convert to int to get rid of preceding zeroes
      let tempNum = parseInt(e.target.value);

      // regex for only number inputs, check if input is NOT a number
      const onlyNumbers = /^\d+$/;

      if (!onlyNumbers.test(tempNum) || tempNum > 99 || tempNum < 0) {
        e.target.setCustomValidity(
          "Has to be within 0-99 range and only numbers!",
        );

        // set and display validity error for input
        e.target.reportValidity();
        return;
      }

      //   convert back to string when done
      tempNum = tempNum.toString();

      //   if no error, clear validity message.
      setAmountValue(tempNum);
      e.target.setCustomValidity("");
    };

    // increment click handler, changes the useState up by one
    const incrementHandler = () => {
      // check if amount is within boundaries of 0-99. If out of bounds, prevent increment
      const testValue = parseInt(amountValue) + 1;
      if (testValue > 99) {
        return;
      }

      setAmountValue((previousValue) => {
        let tempNum = parseInt(previousValue);

        tempNum = tempNum + 1;

        return tempNum.toString();
      });
    };

    // decrement click handler, changes the useState down by one
    const decrementHandler = () => {
      // check if amount is within boundaries of 0-99. If out of bounds, prevent decrement
      const testValue = parseInt(amountValue) - 1;
      if (testValue < 0) {
        return;
      }

      setAmountValue((previousValue) => {
        let tempNum = parseInt(previousValue);

        tempNum = tempNum - 1;

        return tempNum.toString();
      });
    };

    // When the form is submitted, prevent default and add the current item with amount as an object to the cartArr with setCart prop
    // TODO: prevent duplicate items from being added. If the item already exists in the cart, add the amount to the existing array item
    const formSubmitHandler = (e) => {
      try {
        e.preventDefault();

        // get value from form submission
        const submittedItemAmount = parseInt(e.target.amount.value);

        // when submitted, find and change the amount of the item in the cart to the submitted value.
        let tempArr = [...cart];

        // find the current item inside the cart array, change the cart amount when found
        tempArr = tempArr.map((cartEntry) => {
          if (currentCartItem.item === cartEntry.item) {
            cartEntry.amount = submittedItemAmount;
          }

          return cartEntry;
        });

        setCart(tempArr);

        /*
      The button will trigger the re-render which will cause the 
      <div> to have a new "key" prop, which means react will unmount/mount the 
      <div> treating it as a whole new element which will replay the animation again because it's 
      considering the <div> with a new key to be a new element.
      */
        setVisible((previousValue) => {
          const tempObj = { ...previousValue };

          tempObj.visiblity = true;

          tempObj.key = tempObj.key + 1;

          return tempObj;
        });
      } catch (error) {
        console.log(error);
      }
    };

    // this function is used to clear any errors after catching an onchange error to allow submission of previous
    const clearErrorAfterCaughtError = () => {
      // regex for only number inputs, check if input is NOT a number
      const onlyNumbers = /^\d+$/;

      const tempNum = parseInt(inputRef.current.value);

      // check if the current input is valid. if it is, clear input errors
      if (onlyNumbers.test(tempNum)) {
        inputRef.current.setCustomValidity("");
        return;
      }
    };

    // removes the item from the cart
    const removeHandler = () => {
      let tempArr = [...cart];

      // filter out the removed item from the cart array, then set the cart array to be the filtered array
      tempArr = tempArr.filter((cartEntry) => {
        if (currentCartItem.item !== cartEntry.item) {
          return cartEntry;
        }
      });

      setCart(tempArr);
    };

    return (
      <form className={Styles.inputFlexContainer} onSubmit={formSubmitHandler}>
        <div className={Styles.amountContainer}>
          <button
            className={Styles.decrement}
            onClick={decrementHandler}
            type="button"
          >
            -
          </button>
          <input
            ref={inputRef}
            className={Styles.itemAmount}
            type="number"
            value={amountValue}
            max={99}
            min={0}
            onChange={amountOnChangeHandler}
            name="amount"
          />
          <button
            className={Styles.increment}
            onClick={incrementHandler}
            type="button"
          >
            +
          </button>
        </div>
        {visible.visiblity && (
          <div key={visible.key} className={Styles.show}>
            Edited Cart!
          </div>
        )}
        <button
          className={Styles.addToCart}
          type="submit"
          onClick={clearErrorAfterCaughtError}
        >
          Edit Item
        </button>
        <button className={Styles.remove} onClick={removeHandler}>
          Remove
        </button>
      </form>
    );
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
          {addNumberInput()}
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
          {addNumberInput()}
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
          {addNumberInput()}
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

CartCard.propTypes = {
  cryptoKey: PropTypes.string.isRequired,
  itemData: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  currentCartItem: PropTypes.object.isRequired,
};

export default CartCard;
