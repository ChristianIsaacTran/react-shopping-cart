import Styles from "./Card.module.css";
import vbucksLogo from "../../assets/images/fortniteVBucks.png";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

function Card({ cryptoKey, itemData, setCart, cart }) {
  // useState for the item amount input field. Inputs are always strings
  const [amountValue, setAmountValue] = useState("0");

  /* 
  visual state used to display "added to cart" when user click add to cart
    - visibility: bool = used to prevent initial render from playing animation without clicking the "Add to cart button"
    - key: number = used to change the key prop on the <div> every re-render which causes react to replay the animation 

    ** plan is when the user clicks on the "Add to Cart" button, it triggers a re-render which then causes the visibility to become true 
    which then dynamically renders the <div> with a key. Everytime AFTER the initial "Add to Cart" click, it causes the <div> to have a new 
    key which then upon re-render, replays the "Added to Cart" animation due to react thinking it's a new element.
  */
  const [visible, setVisible] = useState({
    visiblity: false,
    key: 0,
    amountExceedError: false,
  });

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

    // utility function that gets the name of the item for comparison
    const getNameOfItem = (item) => {
      if (Object.hasOwn(item, "bundle")) {
        return item.bundle.name;
      } else if (Object.hasOwn(item, "tracks")) {
        return item.tracks[0].title;
      } else if (Object.hasOwn(item, "brItems")) {
        return item.brItems[0].name;
      }

      return null;
    };

    // utility function that checks if the item is already in the cart.
    const checkItemInCart = () => {
      let inCart = false;

      const currentItemName = getNameOfItem(itemData);

      cart.forEach((cartEntry) => {
        const cartEntryItemName = getNameOfItem(cartEntry.item);

        if (cartEntryItemName === currentItemName) {
          inCart = true;
        }
      });

      return inCart;
    };

    // When the form is submitted, prevent default and add the current item with amount as an object to the cartArr with setCart prop
    // TODO: prevent duplicate items from being added. If the item already exists in the cart, add the amount to the existing array item
    const formSubmitHandler = (e) => {
      try {
        e.preventDefault();

        // get value from form submission
        const submittedItemAmount = parseInt(e.target.amount.value);

        // check if the item already is in the cart
        if (checkItemInCart()) {
          // if the amount for the item is 0, do nothing
          if (submittedItemAmount === 0) {
            return;
          }

          // otherwise, add to the existing cart amount
          let tempCartArr = [...cart];

          let amountError = false;

          const currentItemName = getNameOfItem(itemData);

          tempCartArr = tempCartArr.map((cartEntry) => {
            // find item in cart
            const cartEntryItemName = getNameOfItem(cartEntry.item);

            if (cartEntryItemName === currentItemName) {
              const testAmount = cartEntry.amount + submittedItemAmount;

              // check if amount added to cart exceeds the amount limit
              if (testAmount > 99 || testAmount < 0) {
                setVisible((previousValue) => {
                  const tempObj = { ...previousValue };

                  tempObj.visiblity = true;

                  tempObj.key = tempObj.key + 1;

                  tempObj.amountExceedError = true;

                  return tempObj;
                });

                amountError = true;
              }

              // error case, return the cart unchanged if added amount exceeds 0-99 item limit in cart
              if (amountError) {
                return cartEntry;
              }

              // no error, then add amount to cart entry
              setVisible((previousValue) => {
                const tempObj = { ...previousValue };

                tempObj.visiblity = true;

                tempObj.key = tempObj.key + 1;

                tempObj.amountExceedError = false;

                return tempObj;
              });

              cartEntry.amount = testAmount;
              return cartEntry;
            }

            // if not the matched item, return the other items 
            return cartEntry;
          });

          // edit cart and display message
          setCart(tempCartArr);
          return;
        }

        // if the amount for the item is 0, do nothing
        if (submittedItemAmount === 0) {
          return;
        }

        // copy cart to an temp array for manipulation
        const tempArr = [...cart];

        // create an object that groups the item object and the amount that the user submitted
        const tempObj = {
          item: { ...itemData },
          amount: submittedItemAmount,
          price: itemData.finalPrice,
        };

        tempArr.push(tempObj);

        // set array to the new array with the added item
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

          tempObj.amountExceedError = false;

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
        {visible.visiblity &&
          (visible.amountExceedError ? (
            <div
              key={visible.key}
              className={`${Styles.show} ${Styles.amountExceedError}`}
            >
              Item cart amount exceeds limit!
            </div>
          ) : (
            <div key={visible.key} className={Styles.show}>
              Added to Cart!
            </div>
          ))}
        <button
          className={Styles.addToCart}
          type="submit"
          onClick={clearErrorAfterCaughtError}
        >
          Add to Cart
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

Card.propTypes = {
  cryptoKey: PropTypes.string.isRequired,
  itemData: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default Card;
