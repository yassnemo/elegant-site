import { useTheme } from "@/lib/theme-provider";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <label className="relative inline-block">
      <input 
        type="checkbox" 
        className="toggle-checkbox" 
        checked={theme === "dark"}
        onChange={toggleTheme} 
      />
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <Icon className="sun-icon" icon="feather:sun" />
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <Icon className="moon-icon" icon="feather:moon" />
        </div>
      </div>
    </label>
  );
}