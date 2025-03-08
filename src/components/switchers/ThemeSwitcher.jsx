import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui";

export function ThemeSwitcher() {
  const { theme: currentTheme, changeTheme } = useTheme();

  return (
    <Button
      shape="icon"
      className="relative  overflow-hidden "
      onClick={() => changeTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      <Moon
        size={16}
        className={`absolute   transition-transform duration-300 ${
          currentTheme === "light" ? " translate-y-10 " : " translate-y-0"
        }`}
      />
      <SunMedium
        size={20}
        className={`absolute transition-transform duration-300 ${
          currentTheme === "light" ? " translate-y-0 " : " translate-y-10"
        }`}
      />
    </Button>
  );
}
