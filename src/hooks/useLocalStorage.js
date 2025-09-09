"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for local storage interaction
 * @param {string} key - The storage key
 * @param {any} initialValue - The initial value if key doesn't exist
 * @returns {Array} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };
  
  // Update stored value if localStorage changes in another tab
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);
  
  return [storedValue, setValue];
};
