import { Navigate, Outlet } from "react-router";
import { useState, useEffect } from "react";

function Root() {
  /*
    This is the main cart state that will hold the cart data to give to the other components: 
    navbar, cartpage, and shoppage

   - all pages will have the cart state available to them as a context. To call, use the useOutletContext() in child route
   */
  const [cartArr, setCartArr] = useState([]);

  console.log(cartArr);


  return (
    <>
      
      <Outlet context={[cartArr, setCartArr]} />
    </>
  );
}

export default Root;
