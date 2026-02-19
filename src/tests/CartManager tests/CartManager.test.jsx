import { describe, expect, it, vi, afterEach } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartManager from "../../components/CartManager/CartManager";
import { useState } from "react";

// making a fake react component to pass a test cart useState to the cartManager component
function FakeCartManager() {
  const fakeItemID1 = crypto.randomUUID();

  const tempCart = [
    {
      item: {
        brItems: [
          {
            images: {
              icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTov-ISe8YB9cQIf7WrXOlFfLGo6_wWsV8smA&s",
            },
            rarity: { displayValue: "Icon Series" },
            name: "Travis Scott Fortrite",
          },
        ],
        uniqueKey: fakeItemID1,
        finalPrice: 900,
      },
      amount: 3,
      price: 900,
      cartID: fakeItemID1,
    },
  ];

  const [fakeCart, setFakeCart] = useState(tempCart);

  return <CartManager cart={fakeCart} setCart={setFakeCart} />;
}

describe("CartManager displays cart item data correctly", () => {
  it("Cart displays item in cart", () => {
    render(<FakeCartManager />);

    const itemName = screen.getByRole("heading", {
      name: "Travis Scott Fortrite",
    });

    // assert item name exists
    expect(itemName.textContent).toBe("Travis Scott Fortrite");

    const itemImg = screen.getByAltText("item image");

    // assert item image exists
    expect(itemImg.src).toBe(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTov-ISe8YB9cQIf7WrXOlFfLGo6_wWsV8smA&s",
    );

    const itemPrice = screen.getByText("900");

    // assert item price exists
    expect(itemPrice.textContent).toBe("900");
  });

  it("Cart increases amount of item in cart if user clicks increment + button", async () => {
    const user = userEvent.setup();

    render(<FakeCartManager />);

    const incrementBtn = await screen.findByRole("button", { name: "+" });

    await user.click(incrementBtn);

    const itemAmount = await screen.findByRole("spinbutton");

    // assert that the value in input field to be incremented by 1 when increment button is clicked
    expect(itemAmount.value).toBe("4");
  });

  it("Cart decreases amount of item in cart if user clicks decrement - button", async () => {
    const user = userEvent.setup();

    render(<FakeCartManager />);

    const decrementBtn = await screen.findByRole("button", { name: "-" });

    await user.click(decrementBtn);

    const itemAmount = await screen.findByRole("spinbutton");

    // assert that the value in input field to be decremented by 1 when increment button is clicked
    expect(itemAmount.value).toBe("2");
  });

  it("Cart allows amount editing in input field by clicking the edit item button", async () => {
    const user = userEvent.setup();

    render(<FakeCartManager />);

    const incrementBtn = await screen.findByRole("button", { name: "+" });

    const editBtn = await screen.findByRole("button", { name: "Edit Item" });

    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(editBtn);

    const itemAmount = await screen.findByRole("spinbutton");

    expect(itemAmount.value).toBe("5");
    screen.debug();
  });

  it("Item deletes itself from cart if user clicks remove button", async () =>{
    const user = userEvent.setup();

    render(<FakeCartManager />);

    const removeBtn = await screen.findByRole("button", {name: "Remove"});

    await user.click(removeBtn);

    const emptyCartMsg = await screen.findByText("Cart is empty!");

    // assert that the screen displays the empty cart message when the cart item gets removed and there are no items in cart
    expect(emptyCartMsg).toBeDefined();
  });
});
