import React, { useEffect, useState } from "react";
import { Github, Moon, Sun, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 
      ${
        isScrolled
          ? "h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 backdrop-blur-xl"
          : "h-20 border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer select-none">
          <div className="relative w-9 h-9 bg-neutral-900 dark:bg-neutral-50 rounded-xl flex items-center justify-center text-white dark:text-neutral-900 shadow-lg shadow-neutral-200/50 dark:shadow-none transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <Terminal size={18} strokeWidth={3} />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-500 border-2 border-white dark:border-neutral-900 rounded-full" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg tracking-tight leading-none text-neutral-900 dark:text-neutral-100">
              RegexLab
            </span>
            <span
              className={`text-[10px] font-medium text-neutral-500 uppercase tracking-widest mt-0.5 transition-opacity duration-300 
              ${isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
            >
              Library
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Sagar141005/RegexLab"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="View Source on GitHub"
          >
            <Github size={20} strokeWidth={2} />
          </a>

          <div
            className={`w-px bg-neutral-200 dark:bg-neutral-800 transition-all duration-300 ${
              isScrolled ? "h-4" : "h-5"
            }`}
          />

          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors overflow-hidden"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Moon size={20} strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Sun size={20} strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
