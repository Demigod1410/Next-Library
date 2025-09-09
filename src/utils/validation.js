/**
 * Validation functions for the application
 */

import { LANGUAGES, SCRIPTS, CATEGORIES } from "./constants";

/**
 * Validate a book object
 * @param {Object} book - The book object to validate
 * @returns {Object} Object containing isValid flag and errors object
 */
export const validateBook = (book) => {
  const errors = {};
  
  // Required fields validation
  if (!book.title || book.title.trim() === '') {
    errors.title = 'Title is required';
  }
  
  if (!book.author || book.author.trim() === '') {
    errors.author = 'Author is required';
  }
  
  if (book.year === undefined || book.year === null || isNaN(Number(book.year))) {
    errors.year = 'Year must be a valid number';
  }
  
  if (!book.language || !LANGUAGES.includes(book.language)) {
    errors.language = 'Please select a valid language';
  }
  
  if (!book.script || !SCRIPTS.includes(book.script)) {
    errors.script = 'Please select a valid script';
  }
  
  if (!book.category || !CATEGORIES.includes(book.category)) {
    errors.category = 'Please select a valid category';
  }
  
  // Optional fields validation
  if (book.isbn && !/^(\d{10}|\d{13})$/.test(book.isbn.replace(/-/g, ''))) {
    errors.isbn = 'ISBN must be 10 or 13 digits';
  }
  
  // Validate description length if provided
  if (book.description && book.description.length > 1000) {
    errors.description = 'Description should be less than 1000 characters';
  }
  
  return { 
    isValid: Object.keys(errors).length === 0,
    errors 
  };
};

/**
 * Validate a file upload
 * @param {File} file - The file object to validate
 * @param {string} type - The expected file type
 * @returns {Object} Object containing isValid flag and error message
 */
export const validateFile = (file, type = 'json') => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  // Validate file type
  if (type === 'json') {
    if (file.type !== 'application/json') {
      return { isValid: false, error: 'File must be JSON format' };
    }
  } else if (type === 'image') {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'File must be JPG, PNG, or WebP format' };
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return { isValid: false, error: 'Image size must be less than 2MB' };
    }
  }
  
  return { isValid: true };
};

/**
 * Validate JSON structure for book imports
 * @param {Array|Object} data - The data to validate
 * @returns {Object} Object containing isValid flag, validated data, and error message
 */
export const validateJsonImport = (data) => {
  try {
    // If string, try to parse
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    
    // Convert single book object to array
    const books = Array.isArray(data) ? data : [data];
    
    // Validate each book
    const validatedBooks = [];
    const invalidBooks = [];
    
    for (const book of books) {
      const { isValid, errors } = validateBook(book);
      if (isValid) {
        // Generate ID if not present
        const validBook = { ...book };
        if (!validBook.id) {
          validBook.id = Date.now() + Math.floor(Math.random() * 1000);
        }
        // Add date if not present
        if (!validBook.dateAdded) {
          validBook.dateAdded = new Date().toISOString();
        }
        validatedBooks.push(validBook);
      } else {
        invalidBooks.push({ book, errors });
      }
    }
    
    if (invalidBooks.length > 0) {
      return {
        isValid: false,
        error: `${invalidBooks.length} books failed validation`,
        validBooks: validatedBooks,
        invalidBooks
      };
    }
    
    return {
      isValid: true,
      data: validatedBooks
    };
    
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid JSON format: ' + error.message
    };
  }
};
