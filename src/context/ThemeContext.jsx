import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const getTheme = () => {
  const theme = window.localStorage.getItem("theme");
  return ["undefined", "null"].includes(theme) || !theme ? "dark" : theme;
};
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getTheme);

  const changeTheme = (newTheme, firstTime) => {
    if (theme === newTheme && !firstTime) return;

    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.className = `${newTheme}`;
  };
  useEffect(() => {
    changeTheme(getTheme(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ModalProvider");

  return context;
}
