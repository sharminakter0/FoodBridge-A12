// import { useTheme } from '../hooks/use-theme';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './UseTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}className="p-2 rounded-full hover:bg-green-200 transition-colors"aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5  bg-blue-100 rounded-full " />) : (
        <FiSun className="w-5 h-5 bg-blue-100 rounded-full text-black" />)}
    </button>);
}
export default ThemeToggle;