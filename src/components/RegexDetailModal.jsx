import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

const RegexDetailModal = ({ isOpen, onClose, item }) => {
  const [testString, setTestString] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) setTestString("");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const matchResult = useMemo(() => {
    if (!item?.pattern || !testString) return null;
    try {
      const regex = new RegExp(item.pattern, "g");
      const matches = testString.match(regex);
      return {
        isValid: regex.test(testString),
        matches: matches || [],
        error: null,
      };
    } catch (err) {
      return { isValid: false, matches: [], error: "Invalid Regex Pattern" };
    }
  }, [item?.pattern, testString]);

  const handleCopy = () => {
    navigator.clipboard.writeText(item?.pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-60 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={`item-${item.title}`}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 25 }}
              className="w-full max-w-2xl bg-white dark:bg-black rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="flex items-start justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    {item.title}
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 border border-neutral-200 dark:border-neutral-800">
                      {item.category}
                    </span>
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Regex Pattern
                    </label>
                    <button
                      onClick={handleCopy}
                      className={`p-1.5 rounded-md transition-all duration-200 flex items-center justify-center 
                  ${
                    copied
                      ? "bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-500/20"
                      : "text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white dark:hover:bg-neutral-800 shadow-none hover:shadow-sm"
                  }`}
                      aria-label="Copy regex"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Check size={14} strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Copy size={14} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <div className="relative group bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 font-mono text-sm text-neutral-600 dark:text-neutral-300 overflow-x-auto">
                    <span className="select-none text-neutral-300 dark:text-neutral-600 mr-1">
                      /
                    </span>
                    {item.pattern}
                    <span className="select-none text-neutral-300 dark:text-neutral-600 ml-1">
                      /g
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    <Terminal size={12} />
                    Live Test
                  </label>

                  <div className="relative">
                    <textarea
                      value={testString}
                      onChange={(e) => setTestString(e.target.value)}
                      placeholder="Type here to test the pattern..."
                      rows={4}
                      className={`w-full p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-2 text-sm font-mono text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none transition-all resize-none
                        ${
                          !testString
                            ? "border-neutral-200 dark:border-neutral-800 focus:border-neutral-500/50"
                            : matchResult?.matches.length > 0
                            ? "border-emerald-500/50 focus:border-emerald-500 bg-emerald-50/10"
                            : "border-rose-500/50 focus:border-rose-500 bg-rose-50/10"
                        }
                      `}
                    />

                    {testString && (
                      <div className="absolute top-4 right-4">
                        {matchResult?.matches.length > 0 ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 size={12} />
                            MATCH
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded-md border border-rose-200 dark:border-rose-800">
                            <AlertCircle size={12} />
                            NO MATCH
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {testString && matchResult?.matches.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
                          <p className="text-xs text-neutral-500 mb-2">
                            Found {matchResult.matches.length} matches:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.matches.map((m, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs font-mono rounded text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800"
                              >
                                "{m}"
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setTestString("")}
                  className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-900 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Play size={14} fill="currentColor" />
                  New Test
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegexDetailModal;
