# react shopping cart project from the odin project

- Things to focus on:
  - Think about folder structure and what components I need. Think about the entire sections of the project in a component mindset.
  - Organize components and folders with local CSS from last lesson. My personal goal is to utilize CSS modules.
  - Track and document what every component does. Make sure to keep track of state and useEffects() and all that. Keep
    file dependencies modular and contained in the component itself.

Project Requirements:

- In total, should have 3 pages:

  1. a homepage
  2. a shop page
  3. a cart page

- Should let the user navigate between the pages with a navigation bar which will be shown on all pages at all times.

- Homepage can be designed with whatever I want. Images, and other stuff is mainly there to test the concepts I've learned.

- Shop page requirements:

  - Should contain card elements for each product shown to the user.
  - Each card should have an input field on it which lets the user manually type how many of the product they want, or
    a increment/decrement button next to it for fine tuning the amount of products. Can also have a Add-to-Cart button as well.
  - Items that are displayed in the shop page should be fetched from an API.

- Cart page requirements:

  - When there are any items added to the cart, the cart page link in the navbar should have a number next to it to indicate
    how many total items are in the cart currently. This number next to the navbar link should update in real time as the user is adding
    stuff to the cart.
  - On the cart page, the user should be able to see all the items added to the cart and the quanitites of each item, and allow the
    user to increase/decrease the quantity of items in their cart. Should ALSO INCLUDE AN OPTION TO REMOVE/DELETE ITEM FROM THE CART.
  - The odin project specifies that there is no requirement to implement a checkout/payment system.

- Clear out any "missing in props validation" (react type checking with PropTypes)

- Test out the app thoroughly with RTL (react-testing-library)

  - One thing the project notes is to not accidentally test the "react-router-dom" directly since this is an external library. It just means
    to not test that the actual act of routing works, but I SHOULD test if the behavior as routing happens works (like if the UI renders correctly
    after routing).

- Style application how I would like.

- Make sure to deploy it on the Paas (platform as a service). Last time I used Netlify, and there is a note on the project itself to
  include as an option for SPA's and redirects.

# Tasks done:

(1/15/2026) Installed vitest and RTL with NPM and included NPM scripts and setup in the config and JSON files

(1/15/2026) Installed react-router library to create SPA (single page application)

(1/15/2026) Installed PropTypes for prop type checking in react. note: we --save instead of --save-dev because prop-types is used during production, not just development.
