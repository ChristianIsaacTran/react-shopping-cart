import PropTypes from "prop-types";
import Styles from "./CartManager.module.css";
import vbucksLogo from "../../assets/images/fortniteVBucks.png";
import CartCard from "./CartCard.jsx";
import { useState, useEffect } from "react";

function CartManager({ cart, setCart }) {
  // total useState to store total cart value
  const [totalVBucks, setTotalVBucks] = useState(0);

  //   style useState to tell cart to not use grid layout if the cart is empty
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // goes through cart array and calculates the total amount of vbucks in the cart
    const calculateTotal = () => {
      // if there is nothing in the cart, display a 0 amount for total vbucks
      if (cart.length === 0) {
        setIsEmpty(true);
        return setTotalVBucks(0);
      }

      const cartTotalPrice = cart.reduce((previousTotal, currentItem) => {
        previousTotal = previousTotal + currentItem.amount * currentItem.price;
        return previousTotal;
      }, 0);

      setIsEmpty(false);
      return setTotalVBucks(cartTotalPrice);
    };

    calculateTotal();
  }, [cart]);

  // goes through cart array and makes an array of card components to dynamically render
  const renderItemCards = () => {
    // if the cart is empty, then return a div that says that it's empty
    if (isEmpty) {
      return <div className={Styles.cartEmpty}>Cart is empty!</div>;
    }

    let tempArr = [];

    // make an array of CartCard.jsx components from cart array
    tempArr = cart.map((cartEntry) => {
      return (
        <CartCard
          itemData={cartEntry.item}
          key={cartEntry.item.uniqueKey}
          cryptoKey={cartEntry.item.uniqueKey}
          currentCartItem={cartEntry}
          cart={cart}
          setCart={setCart}
        />
      );
    });

    // return an array of CartCard components
    return tempArr;
  };

  return (
    <section>
      <h1 className={Styles.cartTitle}>Cart</h1>
      <ul className={isEmpty ? Styles.listEmpty : Styles.cartList}>{renderItemCards()}</ul>
      <h1 className={Styles.total}>
        Total: {totalVBucks}
        <img
          className={Styles.totalVBucksImg}
          src={vbucksLogo}
          alt="vbucks logo"
        />
      </h1>
    </section>
  );
}

CartManager.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CartManager;
