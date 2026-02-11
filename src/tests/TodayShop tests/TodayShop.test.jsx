/* eslint-disable no-undef */
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, describe, expect, afterEach, vi } from "vitest";
import TodayShop from "../components/TodayShop/TodayShop";

describe("TodayShop tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fakeResponse = {
    brItems: [
      {
        images: {
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pY0KhFWr_78Wb0OphHySrfU1BpGYBoCJzA&s",
        },
        name: "The tomatonator",
        finalPrice: 600,
      },
    ],
  };

  it("test if TodayShop gets API data and displays it", () => {
    // mock fortnite API and return the fakeResponse as the json file
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      });
    });

    render(<TodayShop />);

    expect(fetch).toHaveBeenCalled();

    // TODO: assert that the initial card and group card title has been generated 
  });
});
