/**
 * Utility helper functions for the application
 */

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }).format(date);
}

/**
 * Truncate a string to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length before truncation
 * @returns {string} Truncated string with ellipsis if needed
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Create a slug from a title or text
 * @param {string} text - The text to convert to a slug
 * @returns {string} URL-friendly slug
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a random ID for new books
 * @returns {number} A random ID
 */
export function generateId() {
  return Math.floor(Math.random() * 10000000);
}

/**
 * Deep clone an object
 * @param {object} obj - The object to clone
 * @returns {object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Export data to a JSON file for download
 * @param {Array|Object} data - The data to export
 * @param {string} filename - The name of the file to download
 */
export function exportToJson(data, filename = 'library-export.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

/**
 * Export data to a CSV file for download
 * @param {Array} data - Array of objects to export
 * @param {string} filename - The name of the file to download
 */
export function exportToCsv(data, filename = 'library-export.csv') {
  // Get headers from the first object
  const headers = Object.keys(data[0] || {});
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header] === null || row[header] === undefined ? '' : row[header];
        return typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

/**
 * Get a placeholder image URL for books without covers
 * @param {string} title - Book title to use for generating placeholder
 * @returns {string} Placeholder image URL
 */
export function getPlaceholderImage(title = 'Book') {
  return `/images/book_icon.jpg`;
}

/**
 * Filter books based on search criteria
 * @param {Array} books - Array of book objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered books
 */
export function filterBooks(books, filters) {
  return books.filter(book => {
    // Text search
    if (filters.search && !matchesSearch(book, filters.search)) {
      return false;
    }
    
    // Language filter
    if (filters.language && filters.language !== 'all' && book.language !== filters.language) {
      return false;
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all' && book.category !== filters.category) {
      return false;
    }
    
    // Script filter
    if (filters.script && filters.script !== 'all' && book.script !== filters.script) {
      return false;
    }
    
    // Year range filter
    if (filters.yearRange) {
      const { min, max } = filters.yearRange;
      if (min && book.year < min) return false;
      if (max && book.year > max) return false;
    }
    
    return true;
  });
}

/**
 * Search for text in multiple book fields
 * @param {Object} book - Book object
 * @param {string} searchText - Text to search for
 * @returns {boolean} True if book matches search
 */
function matchesSearch(book, searchText) {
  if (!book) return false;
  
  const search = searchText.toLowerCase();
  return (
    (book.title && typeof book.title === 'string' && book.title.toLowerCase().includes(search)) ||
    (book.author && typeof book.author === 'string' && book.author.toLowerCase().includes(search)) ||
    (book.description && typeof book.description === 'string' && book.description.toLowerCase().includes(search)) ||
    (book.category && typeof book.category === 'string' && book.category.toLowerCase().includes(search)) ||
    (book.language && typeof book.language === 'string' && book.language.toLowerCase().includes(search)) ||
    (book.script && typeof book.script === 'string' && book.script.toLowerCase().includes(search)) ||
    (book.year !== undefined && String(book.year).includes(search))
  );
}

/**
 * Sort books based on sort criteria
 * @param {Array} books - Array of book objects 
 * @param {string} sortBy - Sort criteria (e.g., 'title-asc')
 * @returns {Array} Sorted books
 */
export function sortBooks(books, sortBy = 'dateAdded-desc') {
  const [field, direction] = sortBy.split('-');
  
  return [...books].sort((a, b) => {
    let comparison;
    
    switch (field) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'author':
        comparison = a.author.localeCompare(b.author);
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'dateAdded':
      default:
        comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
        break;
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
}
