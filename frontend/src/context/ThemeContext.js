import { createContext, useContext } from "react";

export const ThemeContex = createContext({ themeMode: "light" });

export const ThemeProvider = ThemeContex.Provider;

export default function useTheme() {
  return useContext(ThemeContex);
}
