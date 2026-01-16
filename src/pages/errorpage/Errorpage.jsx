import { Link } from "react-router";

function Errorpage() {
  return (
    <div>
      uh oh! Page not found. 
      <Link to="/">Go back to homepage</Link>
    </div>
  );
}

export default Errorpage;
