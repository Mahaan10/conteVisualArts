import { createContext, useContext, useState } from "react";

const defaultFilters = {
  courses: { search: "", category: "", sort: "" },
  news: { sort: "" },
  studentWorks: { category: "", sort: "" },
};

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters);

  const updateSearch = (value, type = "courses") => {
    if (!filters[type]) return;
    setFilters((prev) => ({
      ...prev,
      [type]: { ...prev[type], search: value },
    }));
  };

  const toggleCategory = (selectedCategory, type = "courses") => {
    if (!filters[type]) return;
    setFilters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        category:
          prev[type].category === selectedCategory ? "" : selectedCategory,
      },
    }));
  };

  const updateSort = (value, type = "courses") => {
    if (!filters[type]) return;
    setFilters((prev) => ({
      ...prev,
      [type]: { ...prev[type], sort: value },
    }));
  };

  const clearFilters = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: defaultFilters[type],
    }));
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateSearch,
        toggleCategory,
        updateSort,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  return context;
}
