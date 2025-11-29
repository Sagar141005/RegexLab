import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SearchBar = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative group z-10">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-neutral-400 group-focus-within:text-neutral-500 transition-colors duration-300 z-40">
          <Search size={18} strokeWidth={2.5} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search patterns (e.g. Email, Date, etc.)"
          className="w-full h-12 pl-10 pr-28 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl text-sm font-medium text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all duration-300 
          focus:outline-none focus:border-neutral-500/40 dark:focus:border-neutral-500/50"
        />

        <div className="absolute right-3 flex items-center gap-2">
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  onChange("");
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="hidden sm:flex items-center gap-1 pointer-events-none select-none">
            <kbd className="h-6 px-1.5 flex items-center gap-1 bg-neutral-50 dark:bg-neutral-800 border-b-2 border border-neutral-200 dark:border-neutral-700 rounded-md text-[10px] font-bold text-neutral-400 font-sans shadow-sm">
              <span className="text-xs">⌘</span> K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
