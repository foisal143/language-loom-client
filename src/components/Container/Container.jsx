import { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvaider/ThemeProvaider';

const Container = ({ children }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className={`w-full h-full px-5 lg:px-12 my-24 ${
        isDark ? 'bg-black text-white' : 'bg-white'
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
