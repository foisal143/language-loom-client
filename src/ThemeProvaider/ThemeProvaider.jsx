import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const ThemeContext = createContext(null);
const ThemeProvaider = ({ children }) => {
  const [isDark, setIsdark] = useState(
    JSON.parse(localStorage.getItem('theme'))
  );

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    setIsdark(theme);
  }, [isDark]);
  useEffect(() => {
    document.getElementById('body').style.backgroundColor = isDark
      ? 'black'
      : 'white';
  }, [isDark]);
  const themeInfo = {
    isDark,
    setIsdark,
  };
  return (
    <>
      <ThemeContext.Provider value={themeInfo}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeProvaider;
