"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { SAMPLE_BOOKS } from "@/utils/constants";
import { generateId, deepClone } from "@/utils/helpers";
import { validateBook } from "@/utils/validation";

/**
 * Custom hook for managing books collection
 * @returns {Object} Book state and methods
 */
export const useBooks = () => {
  // Use local storage for books persistence
  const [books, setBooks] = useLocalStorage("book-library-data", SAMPLE_BOOKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize books after component mounts
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  /**
   * Add a new book to the collection
   * @param {Object} book - Book object to add
   * @returns {Object} Result with success flag and message
   */
  const addBook = useCallback((book) => {
    try {
      // Validate the book
      const { isValid, errors } = validateBook(book);
      
      if (!isValid) {
        return {
          success: false,
          message: "Invalid book data",
          errors
        };
      }
      
      // Create a new book object with ID and date
      const newBook = {
        ...book,
        id: generateId(),
        dateAdded: new Date().toISOString()
      };
      
      setBooks(prevBooks => [...prevBooks, newBook]);
      
      return {
        success: true,
        message: "Book added successfully",
        book: newBook
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        message: `Failed to add book: ${error.message}`
      };
    }
  }, [setBooks]);
  
  /**
   * Update an existing book
   * @param {number} id - Book ID to update
   * @param {Object} updatedData - Updated book data
   * @returns {Object} Result with success flag and message
   */
  const updateBook = useCallback((id, updatedData) => {
    try {
      // First find if the book exists
      const bookExists = books.some(book => book.id === id);
      
      if (!bookExists) {
        return {
          success: false,
          message: "Book not found"
        };
      }
      
      // Validate the updated book data
      const bookToValidate = {
        ...books.find(book => book.id === id),
        ...updatedData
      };
      
      const { isValid, errors } = validateBook(bookToValidate);
      
      if (!isValid) {
        return {
          success: false,
          message: "Invalid book data",
          errors
        };
      }
      
      // Update the book
      const updatedBooks = books.map(book => 
        book.id === id ? { ...book, ...updatedData } : book
      );
      
      setBooks(updatedBooks);
      
      return {
        success: true,
        message: "Book updated successfully"
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        message: `Failed to update book: ${error.message}`
      };
    }
  }, [books, setBooks]);
  
  /**
   * Delete a book from the collection
   * @param {number} id - Book ID to delete
   * @returns {Object} Result with success flag and message
   */
  const deleteBook = useCallback((id) => {
    try {
      // Check if book exists
      const bookExists = books.some(book => book.id === id);
      
      if (!bookExists) {
        return {
          success: false,
          message: "Book not found"
        };
      }
      
      // Remove the book
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      
      return {
        success: true,
        message: "Book deleted successfully"
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        message: `Failed to delete book: ${error.message}`
      };
    }
  }, [books, setBooks]);
  
  /**
   * Import books from JSON data
   * @param {Array} importData - Array of book objects to import
   * @returns {Object} Result with success flag and message
   */
  const importBooks = useCallback((importData) => {
    try {
      if (!Array.isArray(importData)) {
        return {
          success: false,
          message: "Import data must be an array of books"
        };
      }
      
      const newBooks = importData.map(book => ({
        ...book,
        id: book.id || generateId(),
        dateAdded: book.dateAdded || new Date().toISOString()
      }));
      
      // Validate all books
      const validationResults = newBooks.map(book => ({
        book,
        ...validateBook(book)
      }));
      
      const invalidBooks = validationResults.filter(result => !result.isValid);
      
      if (invalidBooks.length > 0) {
        return {
          success: false,
          message: `${invalidBooks.length} books failed validation`,
          invalidBooks
        };
      }
      
      // Add the new books
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      
      return {
        success: true,
        message: `Successfully imported ${newBooks.length} books`
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        message: `Failed to import books: ${error.message}`
      };
    }
  }, [setBooks]);
  
  /**
   * Get statistics about the book collection
   * @returns {Object} Statistics object
   */
  const getStatistics = useCallback(() => {
    // Count books by category
    const categoryCounts = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});
    
    // Count books by language
    const languageCounts = books.reduce((acc, book) => {
      acc[book.language] = (acc[book.language] || 0) + 1;
      return acc;
    }, {});
    
    // Get recently added books (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentlyAddedCount = books.filter(book => {
      const addedDate = new Date(book.dateAdded);
      return addedDate > thirtyDaysAgo;
    }).length;
    
    return {
      total: books.length,
      categoryCounts,
      languageCounts,
      recentlyAddedCount
    };
  }, [books]);
  
  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    importBooks,
    getStatistics
  };
};
