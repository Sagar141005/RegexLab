import React, { useState } from "react";
import {
  Copy,
  Check,
  User,
  Globe,
  Smartphone,
  MapPin,
  Calculator,
  CreditCard,
  Calendar,
  Code2,
  FileText,
  ShieldCheck,
  Type,
  Sparkles,
  Terminal,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const getCategoryConfig = (category) => {
  const normalize = category?.toLowerCase();

  const config = {
    identity: {
      icon: User,
    },
    web: {
      icon: Globe,
    },
    phone: {
      icon: Smartphone,
    },
    location: {
      icon: MapPin,
    },
    numbers: {
      icon: Calculator,
    },
    financial: {
      icon: CreditCard,
    },
    "date/time": {
      icon: Calendar,
    },
    development: {
      icon: Code2,
    },
    files: {
      icon: FileText,
    },
    security: {
      icon: ShieldCheck,
    },
    strings: {
      icon: Type,
    },
    advanced: {
      icon: Sparkles,
    },
  };

  return (
    config[normalize] || {
      icon: Terminal,
      color: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
    }
  );
};

const getComplexityStyle = (level) => {
  switch (level?.toLowerCase()) {
    case "low":
      return "text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10";
    case "medium":
      return "text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10";
    case "high":
      return "text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10";
    default:
      return "text-neutral-500 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800";
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const RegexCard = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const { icon: CategoryIcon } = getCategoryConfig(item.category);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col w-full bg-white dark:bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-200/20 dark:hover:shadow-black/40 transition-all duration-300"
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border text-neutral-500 bg-neutral-500/10 border-neutral-500/20 transition-colors duration-300`}
            >
              <CategoryIcon size={16} strokeWidth={2} />
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight text-sm leading-none mb-1">
                {item.title}
              </h3>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                {item.category}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${getComplexityStyle(
              item.complexity
            )}`}
          >
            <Activity size={10} strokeWidth={2} />
            {item.complexity}
          </div>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed mb-5">
          {item.description}
        </p>

        <div className="mt-auto relative group/code">
          <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 transition-colors group-hover/code:border-neutral-300 dark:group-hover/code:border-neutral-700">
            <div className="flex items-center pl-4 pr-12 py-3">
              <span className="text-neutral-300 dark:text-neutral-600 font-mono text-sm select-none mr-0.5">
                /
              </span>

              <div className="overflow-x-auto scrollbar-none w-full mask-fade-right">
                <code className="font-mono text-xs text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
                  {item.pattern}
                </code>
              </div>

              <span className="text-neutral-300 dark:text-neutral-600 font-mono text-sm select-none ml-0.5">
                /g
              </span>
            </div>

            <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
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
          </div>

          <div className="flex justify-end mt-1.5 px-1">
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
              {item.pattern.length} chars
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800/50 flex flex-wrap gap-2">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 rounded-md"
            >
              {capitalize(tag)}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RegexCard;
