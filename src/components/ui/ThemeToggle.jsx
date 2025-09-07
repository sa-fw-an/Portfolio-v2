import React, { useRef, memo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const container = useRef();

  return (
    <div
      ref={container}
      className="toggle-bar fixed flex opacity-0 flex-row justify-center items-center top-12 right-12"
    >
      <div className="sun-wrapper flex flex-row justify-center items-center text-[var(--color-text)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </div>

      <button
        onClick={toggleTheme}
        className="toggle-button cursor-pointer relative w-14 h-7 flex justify-center items-center bg-[var(--color-pink)] rounded-full mx-4 border-none shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        role="switch"
        aria-checked={theme === "dark"}
      >
        <div
          className={`toggle-circle absolute left-1.5 rounded-full w-5 h-5 bg-[var(--color-background)] transition-all duration-200 ease-in-out ${theme === "dark" ? "slide" : ""}`}
        ></div>
      </button>

      <div className="moon-wrapper flex flex-row justify-center items-center text-[var(--color-text)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
