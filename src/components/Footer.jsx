import React from "react";
import { Github, Heart } from "lucide-react";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            RegexLab
          </span>
          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.2, 1],
              }}
              className="flex items-center justify-center"
            >
              <Heart size={14} className="fill-rose-500 text-rose-500" />
            </motion.div>
            <span>by</span>
            <a
              href="https://sagarsaini.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 transition-all"
            >
              Sagar
            </a>
          </div>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          <a
            href="https://github.com/Sagar141005/RegexLab"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 hidden sm:block"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
