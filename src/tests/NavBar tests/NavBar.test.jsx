import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routeConfig from "../../route/routeConfig";

describe("navigation bar renders other pages", () => {
  it("click on homepage link, routes to /homepage", async () => {
    // run userEvent.setup to create a userEvent instance to simulate user events
    const user = userEvent.setup();

    /* 
    create memory router to check if router changes URL. Optional "initialEntries" can be provided to make an initial router history on render, 
    but if left out, the router will start at the root "/" by default. Used to set an initial location in memory router.
    */
    const router = createMemoryRouter(routeConfig);

    // using RouterProvider to make a new router for the test.
    render(<RouterProvider router={router} />);

    // assert that the router starts at the /homepage (gets redirected from root to the homepage element)
    expect(router.state.location.pathname).toEqual("/homepage");

    const homepageLink = screen.getByRole("link", { name: "Homepage" });

    // simulate user clicking on homepage button
    await user.click(homepageLink);

    // expect ending route when clicking the homepage button will be the /homepage route
    expect(router.state.location.pathname).toEqual("/homepage");
  });

  it("click on shop link, routes to /shop", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routeConfig);

    render(<RouterProvider router={router} />);

    const shoppageLink = screen.getByRole("link", { name: "Shop" });

    // simulate user clicking on shop button
    await user.click(shoppageLink);

    expect(router.state.location.pathname).toEqual("/shop");
  });

  it("click on cart link, routes to /cart", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routeConfig);

    render(<RouterProvider router={router} />);

    const cartpageLink = screen.getByRole("link", { name: "Cart" });

    // simulate user clicking on shop button
    await user.click(cartpageLink);

    expect(router.state.location.pathname).toEqual("/cart");
  });
});
