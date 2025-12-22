import { createContext } from "react";
import { useState,useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setInformation(JSON.parse(stored));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ information, setInformation }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
