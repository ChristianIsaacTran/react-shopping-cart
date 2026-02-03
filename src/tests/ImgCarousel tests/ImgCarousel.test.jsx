/* eslint-disable no-undef */
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";

describe("Image Carousel makes API calls", () => {
  // TODO: make tests testing behavior of carousel buttons and mock the API

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Ensure that the MOTD is being fetched and displayed properly in Img Carousel", async () => {
    // Make a fake response to have the mocked fetch return
    const fakeResponse = {
      data: {
        br: {
          motds: [
            {
              image:
                "https://i.pinimg.com/originals/c5/1b/02/c51b0262b65c1764d74cd9af2683f696.jpg",
              body: "Should've played bucky. Should've played any kind of damage, we ended up losing and it's all your fault, you should learn how this game works.",
              title: "Should've played bucky!",
            },
          ],
        },
      },
    };

    // let vitest know that we are mocking the fetch on the window object, pretty much replacing the fetch with our own version
    global.fetch = vi.fn(() => {
      // immediately tell the fetch to resolve and return a JSON with the response we made above
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(fakeResponse),
      });
    });

    // render image carousel and assert that the fake MOTD ui element is there
    render(<ImgCarousel />);

    // assert that fetch request has been called
    expect(fetch).toHaveBeenCalled();

    /*
    note: 
    After mocking fetch and rendering the component, we can use await to wait for the rendering of the component to be finished. Make 
    sure when working with anything external like API fetches to make this test async so that we can tell things to wait. 

    We also use the screen.findBy instead of .getBy because we are doing asynchronous operations, and .getBy gets things immediately and 
    doesn't wait for the await we put.
    */
    const newsCardTitle = await screen.findByRole("heading", {
      name: /Should've played bucky!/i,
    });

    const newsCardDescription = await screen.findByText(
      /Should've played bucky. Should've played any kind of damage, we ended up losing and it's all your fault, you should learn how this game works./i,
    );

    const newsCardImage = await screen.findByRole("img");

    // assert that they exist in the HTML
    expect(newsCardTitle).toBeInTheDocument();
    expect(newsCardDescription).toBeInTheDocument();
    expect(newsCardImage).toBeInTheDocument();

    // assert their text content
    expect(newsCardTitle.textContent).toBe("Should've played bucky!");
    expect(newsCardDescription.textContent).toBe(
      "Should've played bucky. Should've played any kind of damage, we ended up losing and it's all your fault, you should learn how this game works.",
    );
  });

  it("Img Carousel displays an error message if the API fails", async () => {
    // mock the API again, but this time mock the fetch failing the API request
    global.fetch = vi.fn(() => {
      return Promise.reject(new Error("API is down"));
    });

    render(<ImgCarousel />);

    // assert that the fetch is being called
    expect(fetch).toHaveBeenCalled();

    const errorMsg = await screen.findByRole("heading", {
      name: "A network error/fetching error occured.",
    });

    // assert that error message exists and being displayed upon API fetch failure
    expect(errorMsg).toBeInTheDocument();
  });
});
