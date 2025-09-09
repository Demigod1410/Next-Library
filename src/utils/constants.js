/**
 * Constants used throughout the application
 */

// Book-related constants
export const LANGUAGES = ["sanskrit", "english", "hindi", "kannada", "marathi"];
export const SCRIPTS = ["devanagari", "roman", "brahmi"];
export const CATEGORIES = ["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda"];

// Pagination
export const ITEMS_PER_PAGE = 12;

// Sort options
export const SORT_OPTIONS = [
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "author-asc", label: "Author (A-Z)" },
  { value: "author-desc", label: "Author (Z-A)" },
  { value: "year-asc", label: "Year (Oldest first)" },
  { value: "year-desc", label: "Year (Newest first)" },
];

// View options
export const VIEW_OPTIONS = {
  GRID: "grid",
  LIST: "list",
};

// Sample book for the home page featured section
export const SAMPLE_BOOKS = [
  {
    id: 1,
    title: "Bhagavad Gita",
    author: "Vyasa",
    year: -400,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy",
    description: "Ancient Indian text that is part of the epic Mahabharata, containing a conversation between the Pandava prince Arjuna and Krishna.",
    isbn: "9780140449181",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-01T10:30:00.000Z"
  },
  {
    id: 2,
    title: "Yoga Sutras of Patanjali",
    author: "Patanjali",
    year: -400,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy",
    description: "A collection of 196 Indian sutras on the theory and practice of yoga.",
    isbn: "9780865477513",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-02T14:15:00.000Z"
  },
  {
    id: 3,
    title: "Brahma Sutras",
    author: "Badarayana",
    year: -200,
    language: "sanskrit",
    script: "devanagari",
    category: "Bhashya",
    description: "Foundational text of the Vedanta school of Hindu philosophy.",
    isbn: "9788175050174",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-03T09:45:00.000Z"
  },
  {
    id: 4,
    title: "Upanishads",
    author: "Various",
    year: -800,
    language: "sanskrit",
    script: "devanagari",
    category: "Upanishad",
    description: "A collection of philosophical texts that form the theoretical basis for the Hindu religion.",
    isbn: "9780140441635",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-04T11:20:00.000Z"
  },
  {
    id: 5,
    title: "Shiva Purana",
    author: "Unknown",
    year: 400,
    language: "sanskrit",
    script: "devanagari",
    category: "Purana",
    description: "One of the eighteen Puranas, it predominantly revolves around the Hindu god Shiva and goddess Parvati.",
    isbn: "9788120803756",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-05T16:10:00.000Z"
  },
  {
    id: 6,
    title: "Rig Veda",
    author: "Unknown",
    year: -1500,
    language: "sanskrit",
    script: "devanagari",
    category: "Veda",
    description: "An ancient Indian collection of Vedic Sanskrit hymns, one of the four canonical sacred texts of Hinduism.",
    isbn: "9780140449891",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-06T08:30:00.000Z"
  }
];
