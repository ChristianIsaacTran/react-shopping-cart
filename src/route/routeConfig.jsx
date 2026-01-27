import Homepage from "../pages/homepage/Homepage";
import Shoppage from "../pages/shoppage/Shoppage";
import Cartpage from "../pages/cartpage/Cartpage";
import Errorpage from "../pages/errorpage/Errorpage";
import Root from "../pages/root/Root";
import { Navigate } from "react-router";

/*
In order to redirect the user to the /homepage immediately, 
the <Root /> component uses <Outlet> to render the children routes, then
since there are no URL's given, it immediately renders the default "index"
child which is a force navigate component to the homepage child.
*/

const routeConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Navigate to="homepage" replace /> },
      { path: "homepage", element: <Homepage /> },
      { path: "shop", element: <Shoppage /> },
      { path: "cart", element: <Cartpage />},
    ],
  },
];

export default routeConfig;
