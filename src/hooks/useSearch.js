"use client";

import { useState, useEffect, useCallback } from "react";
import { filterBooks, sortBooks } from "@/utils/helpers";

/**
 * Custom hook for search and filter functionality
 * @param {Array} books - Array of book objects
 * @returns {Object} Search state and filtered books
 */
export const useSearch = (books = []) => {
  // Search and filter state
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    language: "all",
    category: "all",
    script: "all",
    yearRange: { min: null, max: null }
  });
  const [sortBy, setSortBy] = useState("dateAdded-desc");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchText]);
  
  // Apply filters and sorting when dependencies change
  useEffect(() => {
    const applyFilters = () => {
      // Create a combined filters object
      const combinedFilters = {
        ...filters,
        search: debouncedSearchText
      };
      
      // First filter the books
      let result = filterBooks(books, combinedFilters);
      
      // Then sort the filtered results
      result = sortBooks(result, sortBy);
      
      setFilteredBooks(result);
    };
    
    applyFilters();
  }, [books, debouncedSearchText, filters, sortBy]);
  
  /**
   * Update a single filter value
   * @param {string} key - Filter key to update
   * @param {any} value - New filter value
   */
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  /**
   * Reset all filters to default values
   */
  const resetFilters = useCallback(() => {
    setSearchText("");
    setFilters({
      language: "all",
      category: "all",
      script: "all",
      yearRange: { min: null, max: null }
    });
    setSortBy("dateAdded-desc");
  }, []);
  
  /**
   * Handle search input change
   * @param {Event} event - Input change event
   */
  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);
  
  return {
    searchText,
    filters,
    sortBy,
    filteredBooks,
    setSearchText,
    updateFilter,
    setSortBy,
    resetFilters,
    handleSearchChange
  };
};
