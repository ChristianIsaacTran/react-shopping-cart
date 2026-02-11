/* eslint-disable no-undef */
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, describe, expect, afterEach, vi } from "vitest";
import TodayShop from "../../components/TodayShop/TodayShop";

describe("TodayShop tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fakeResponse = {
    data: {
      entries: [
        {
          layout: { name: "test item group" },
          finalPrice: 600,
          brItems: [
            {
              images: {
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pY0KhFWr_78Wb0OphHySrfU1BpGYBoCJzA&s",
              },
              name: "The tomatonator",
              rarity: {
                displayValue: "Rare",
              },
            },
          ],
        },
      ],
    },
  };

  it("test if TodayShop gets API data and displays the item group and the card correctly", async () => {
    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    // TODO: assert that the initial card and group card title has been generated
    const groupName = await screen.findByRole("heading", {
      name: "test item group",
    });

    const itemName = await screen.findByRole("heading", {
      name: "The tomatonator",
    });

    const itemImg = await screen.findByAltText("item image");

    const itemPrice = await screen.findByText("600");

    // assert item group name is correct
    expect(groupName.textContent).toBe("test item group");

    // assert item card name is correct
    expect(itemName.textContent).toBe("The tomatonator");

    // assert that the item image is the correct link
    expect(itemImg.src).toBe(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pY0KhFWr_78Wb0OphHySrfU1BpGYBoCJzA&s",
    );

    // assert that the item price is correct
    expect(itemPrice.textContent).toBe("600");
  });

  it("when user presses increment button, it increases input amount by 1", async () => {
    const user = userEvent.setup();

    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    const incrementBtn = await screen.findByRole("button", { name: "+" });

    const inputAmount = await screen.findByRole("spinbutton");

    await user.click(incrementBtn);

    // remember that the value of input is a string
    // assert that the increment button increased the input value from 0 to 1
    expect(inputAmount.value).toBe("1");
  });

  it("when the user presses decrement button, it decreases input amount by 1", async () => {
    const user = userEvent.setup();

    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    const incrementBtn = await screen.findByRole("button", { name: "+" });

    const decrementBtn = await screen.findByRole("button", { name: "-" });

    const inputAmount = await screen.findByRole("spinbutton");

    // increment count by 3
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    // then decrease count by 1
    await user.click(decrementBtn);

    // remember that the value of input is a string
    // assert that the decrement button decreased the count from 3 to 2
    expect(inputAmount.value).toBe("2");
  });

  it("when the user types in the input field, it changes the value", async () => {
    const user = userEvent.setup();

    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    const inputAmount = await screen.findByRole("spinbutton");

    await user.click(inputAmount);

    // assert that the input field is focus-able
    expect(inputAmount).toHaveFocus();

    await user.keyboard("12");

    // assert that the input field matches the typed in valid value of "12"
    expect(inputAmount.value).toBe("12");
  });

  it("when the user tries to input a letter/non-number other than number special characters/valid numbers (+, -, e, etc.), it does nothing", async () => {
    const user = userEvent.setup();

    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    const inputAmount = await screen.findByRole("spinbutton");

    await user.click(inputAmount);

    // assert that the input field is focus-able
    expect(inputAmount).toHaveFocus();

    await user.keyboard("abcd");

    // assert that the input field is unchanged since the letter input is invalid
    expect(inputAmount.value).toBe("0");
  });

});
