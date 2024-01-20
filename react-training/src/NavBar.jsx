import PropTypes from "prop-types";
import { useContext, useState } from "react";
import UserContext from "./UserContext";

NavBar.propTypes = {
  setUserName: PropTypes.func,
  children: PropTypes.element,
};

function NavBar({ children }) {
  const [count, setCount] = useState(0);
  const { userName, setUserName } = useContext(UserContext);
  return (
    <nav className="flex items-center justify-around w-full p-4 text-white bg-black">
      {children} {userName}
      <ul className="flex items-center justify-center gap-2">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <button
        className="p-2 bg-blue-600 rounded-md hover:bg-blue-400 active:bg-blue-950"
        onClick={() => {
          setCount(count + 1);
          setUserName("Eric");
        }}
      >
        Count is {count}
      </button>
    </nav>
  );
}

export default NavBar;
