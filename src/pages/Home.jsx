import React, { useMemo, useState, useEffect } from "react";
import { REGEX_DATA } from "../data/regexLibrary";
import RegexCard from "../components/RegexCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, AnimatePresence } from "motion/react";
import { SearchX, ArrowUp } from "lucide-react";

const UNIQUE_CATEGORIES = [...new Set(REGEX_DATA.map((i) => i.category))];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredRegex = useMemo(() => {
    return REGEX_DATA.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen font-display bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 relative overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-16">
        <section className="text-center space-y-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="lg:text-6xl text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]">
              The Developer’s <br />
              <span className="text-neutral-500">Regex Dictionary</span>
            </h1>

            <p className="lg:text-lg text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              A curated library of reliable, production-ready Regular
              Expressions for
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {" "}
                validation
              </span>
              ,
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {" "}
                parsing
              </span>
              , and
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {" "}
                formatting
              </span>
              &nbsp;— so you never have to guess again.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
          >
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter
              categories={UNIQUE_CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </motion.div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-1 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight flex items-baseline gap-2">
              Library
              <span className="text-neutral-400 font-normal text-sm">
                /{" "}
                {selectedCategory === "All" ? "All Patterns" : selectedCategory}
              </span>
            </h2>
            <span className="text-xs font-mono font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-700">
              {filteredRegex.length} Results
            </span>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRegex.map((item) => (
              <RegexCard key={item.id} item={item} />
            ))}
          </motion.div>

          {filteredRegex.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center bg-neutral-50/50 dark:bg-neutral-900/30 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl"
            >
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <SearchX
                  size={32}
                  className="text-neutral-400 dark:text-neutral-500"
                />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                No patterns found
              </h3>
              <p className="text-neutral-500 max-w-sm mx-auto mb-8 leading-relaxed">
                We couldn't find any regex matching "
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {searchQuery}
                </span>
                " in the {selectedCategory} category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-xl font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all shadow-sm hover:shadow-md"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 shadow-lg shadow-neutral-900/20 dark:shadow-black/50 hover:scale-110 active:scale-95 transition-transform duration-200 group"
            aria-label="Back to top"
          >
            <ArrowUp
              size={20}
              strokeWidth={2.5}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Home;
