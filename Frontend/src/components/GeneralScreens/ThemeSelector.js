import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { BiSun, BiMoon } from "react-icons/bi";

const ThemeSelector = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === "light" ? <BiMoon /> : <BiSun />}
    </button>
  );
};

export default ThemeSelector;
