import React from "react";
import { motion } from "motion/react";
import {
  LayoutGrid,
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
  BookMarked,
  Terminal,
} from "lucide-react";

const getIconForCategory = (category) => {
  const normalize = category?.toLowerCase();
  const icons = {
    all: LayoutGrid,
    identity: User,
    web: Globe,
    phone: Smartphone,
    location: MapPin,
    numbers: Calculator,
    financial: CreditCard,
    "date/time": Calendar,
    development: Code2,
    files: FileText,
    security: ShieldCheck,
    strings: Type,
    advanced: BookMarked,
  };
  return icons[normalize] || Terminal;
};

const CategoryFilter = ({ categories = [], selected, onSelect }) => {
  const displayCategories = ["All", ...categories.filter((c) => c !== "All")];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4">
        {displayCategories.map((cat) => {
          const isActive = selected === cat;
          const Icon = getIconForCategory(cat);

          return (
            <motion.button
              key={cat}
              onClick={() => onSelect(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`
                group relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200
                ${
                  isActive
                    ? "bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-md"
                    : "bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }
              `}
            >
              <Icon
                size={14}
                className={`
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-white dark:text-neutral-900"
                      : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                  }
                `}
              />

              <span className="whitespace-nowrap">{cat}</span>

              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-500 rounded-full border-2 border-white dark:border-neutral-950"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
