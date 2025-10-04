'use client'
import { useTheme } from "@/context/theme-context";
import * as Toggle from "@radix-ui/react-toggle";
import {  Moon, SunMedium } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle.Root
      pressed={theme}
      onPressedChange={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle theme"
    >
      {theme ? (
        <Moon className="h-5 w-5 text-yellow-400" />
      ) : (
        <SunMedium className="h-5 w-5 text-gray-700" />
      )}
    </Toggle.Root>
  );
};