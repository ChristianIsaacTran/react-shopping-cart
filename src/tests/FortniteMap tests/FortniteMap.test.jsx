/* eslint-disable no-undef */
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import FortniteMap from "../../components/FortniteMap/FortniteMap";

describe("Fortnite Map render POI and blank map tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // fake response object for mock API fetch. Images are funny fortnite images found online to test
  const fakeResponse = {
      data: {
        images: {
          blank:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lcYgJfxtk77uHgqQF6vpTQzyrirfyzyduQ&s",
          pois: "https://i.pinimg.com/originals/90/c2/39/90c239072e05dcf5f27dde0dd13ebf2f.jpg",
        },
      },
    };


  it("Default POI map is generated from API upon component render", async () => {
    // mocking API fetch and returning the fake response for testing
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true, //set response ok attribute to true to force API success
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<FortniteMap />);

    // test to verify fetch has been called
    expect(fetch).toHaveBeenCalled();

    const mapImage = await screen.findByAltText("Current fortnite season map");

    // assert that the image src is the POI one when launching webpage
    expect(mapImage.src).toBe(
      "https://i.pinimg.com/originals/90/c2/39/90c239072e05dcf5f27dde0dd13ebf2f.jpg",
    );
  });

  it("User clicks on hide POI button and it swaps the POI map for the blank map, and vice versa", async () => {
    // user event to simulate button clicking
    const user = userEvent.setup();

    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true, //set response ok attribute to true to force API success
        json: () => {
          return Promise.resolve(fakeResponse);
        },
      });
    });

    render(<FortniteMap />);

    expect(fetch).toBeCalled();

    const mapSwapButton = await screen.findByRole("button");

    const mapImg = await screen.findByAltText("Current fortnite season map");

    // assert initial POI map to be displayed
    expect(mapImg.src).toBe("https://i.pinimg.com/originals/90/c2/39/90c239072e05dcf5f27dde0dd13ebf2f.jpg");

    // when the user clicks the "hide pois" button, it should toggle between the POI map and the blank map
    await user.click(mapSwapButton);
    
    // assert that the map swapped to the blank map URL 
    expect(mapImg.src).toBe("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lcYgJfxtk77uHgqQF6vpTQzyrirfyzyduQ&s");

    await user.click(mapSwapButton);

    // assert that the map swapped back to the POI map after clicking the button again
    expect(mapImg.src).toBe("https://i.pinimg.com/originals/90/c2/39/90c239072e05dcf5f27dde0dd13ebf2f.jpg");

    /*
    note: reminder that userEvents are asynchronous and require an await since they return promises and this allows the 
    program to wait for other factors such as re-renders that are triggered by the userEvent
    */  
  });
});
