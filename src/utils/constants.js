/**
 * Constants used throughout the application
 */

// Book-related constants from metadata
export const LANGUAGES = ["sanskrit", "english", "hindi", "kannada", "marathi"];
export const SCRIPTS = ["devanagari", "roman", "brahmi"];
export const CATEGORIES = ["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda"];

// Pagination
export const ITEMS_PER_PAGE = 12;

// Book metadata statistics
export const BOOK_METADATA = {
  total_books: 21,
  languages: ["sanskrit", "english", "hindi", "kannada", "marathi"],
  scripts: ["devanagari", "roman", "brahmi"],
  categories: ["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda"],
  year_range: {
    earliest: 1918,
    latest: 2019
  }
};

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

// All books from books_metadata
export const SAMPLE_BOOKS = [
  {
    id: 1,
    title: "10 Judgements That Changed India",
    author: "Zia Mody",
    year: 2005,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy",
    description: "A detailed analysis of ten landmark judgments that had a profound impact on India's legal and societal landscape.",
    isbn: "9780143423294",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-01T10:30:00.000Z",
    filePath: "/books/10 Judgements That Changed India_Zia Mody_2005_sanskrit_devanagari.pdf"
  },
  {
    id: 2,
    title: "A Search In Secret India",
    author: "Dr Paul Brunton",
    year: 1934,
    language: "english",
    script: "roman",
    category: "Philosophy",
    description: "A fascinating journey through India in search of spiritual wisdom and mystical experiences.",
    isbn: "9780877286165",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-02T14:15:00.000Z",
    filePath: "/books/A Search In Secret India_Dr Paul Brunton_1934_english_roman.pdf"
  },
  {
    id: 3,
    title: "Adi Shankaracharya",
    author: "Rajiv Parihar",
    year: 2007,
    language: "english",
    script: "roman",
    category: "Philosophy",
    description: "A biography of the renowned Indian philosopher who consolidated the doctrine of Advaita Vedanta.",
    isbn: "9788172344535",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-03T09:45:00.000Z",
    filePath: "/books/Adi Shankaracharya_Rajiv Parihar_2007_english_roman.pdf"
  },
  {
    id: 4,
    title: "Gaudpadasar Part 1",
    author: "Swami Maheshanandagiri",
    year: 1951,
    language: "hindi",
    script: "devanagari",
    category: "Bhashya",
    description: "A comprehensive commentary on Gaudapada's Karika, a key text in Advaita Vedanta philosophy.",
    isbn: "9788120800533",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-04T11:20:00.000Z",
    filePath: "/books/Gaudpadasar Part 1_Swami Maheshanandagiri_1951_hindi_devanagari.pdf"
  },
  {
    id: 5,
    title: "Gaudpadasar Part 2",
    author: "Swami Maheshanandagiri",
    year: 2004,
    language: "hindi",
    script: "devanagari",
    category: "Bhashya",
    description: "Second part of the comprehensive commentary on Gaudapada's philosophical work.",
    isbn: "9788120800540",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-05T15:40:00.000Z",
    filePath: "/books/Gaudpadasar Part 2_Swami Maheshanandagiri_2004_hindi_devanagari.pdf"
  },
  {
    id: 6,
    title: "Kenopnishbdhashyadvayam",
    author: "Swami Swayamprakashgiri",
    year: 1998,
    language: "hindi",
    script: "devanagari",
    category: "Upanishad",
    description: "A dual commentary on the Kena Upanishad, exploring its philosophical dimensions.",
    isbn: "9788120802452",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-06T08:30:00.000Z",
    filePath: "/books/Kenopnishbdhashyadvayam_Swami Swayamprakashgiri_1998_hindi_devanagari.pdf"
  },
  {
    id: 7,
    title: "Lakshana Samhita",
    author: "Aagama Shastra Grantha-Derebailu Harikrishna Tantri",
    year: 2017,
    language: "kannada",
    script: "brahmi",
    category: "Tantra",
    description: "A collection of tantric practices and rituals described in the Agama tradition.",
    isbn: "9788193245156",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-07T13:25:00.000Z",
    filePath: "/books/Lakshana Samhita_Aagama Shastra Grantha-Derebailu Harikrishna Tantri_2017_kannada_brahmi.pdf"
  },
  {
    id: 8,
    title: "Naishkmrysidhi",
    author: "Swami Maheshanand",
    year: 1996,
    language: "hindi",
    script: "devanagari",
    category: "Philosophy",
    description: "A treatise on the path of renunciation and self-realization in Hindu philosophy.",
    isbn: "9788185843452",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-08T09:40:00.000Z",
    filePath: "/books/Naishkmrysidhi_Swami Maheshanand_1996_hindi_devanagari.pdf"
  },
  {
    id: 9,
    title: "Sarvajnana Vachanagalu",
    author: "Channappa Uttangi",
    year: 2017,
    language: "kannada",
    script: "brahmi",
    category: "Philosophy",
    description: "A collection of philosophical sayings and wisdom in Kannada tradition.",
    isbn: "9788193567128",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-09T10:15:00.000Z",
    filePath: "/books/Sarvajnana Vachanagalu_Channappa Uttangi_2017_kannada_brahmi.pdf"
  },
  {
    id: 10,
    title: "Shiva Geeta Bhashyam",
    author: "Shrimat Abhinav Narshimha Bharathi",
    year: 1962,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy, Bhashya",
    description: "An important text explaining the philosophical teachings of Lord Shiva.",
    isbn: "9788185208985",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-10T14:20:00.000Z",
    filePath: "/books/Shiva Geeta Bhashyam_Shrimat Abhinav Narshimha Bharathi_1962_sanskrit_devanagari.pdf"
  },
  {
    id: 11,
    title: "Shrada Chandrika",
    author: "Shri Divakara bhatta",
    year: 1934,
    language: "sanskrit",
    script: "devanagari",
    category: "Purana",
    description: "A text illuminating the concept of devotion and faith in Hindu tradition.",
    isbn: "9788175050723",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-11T11:30:00.000Z",
    filePath: "/books/Shrada Chandrika_Shri Divakara bhatta_1934_sanskrit_devanagari.pdf"
  },
  {
    id: 12,
    title: "Shree Chitrapur Guru Parampara Charitrapur Saramrit",
    author: "Shri durganand shivaram maraballi",
    year: 2002,
    language: "marathi",
    script: "devanagari",
    category: "Purana",
    description: "Chronicles of the Guru lineage of Chitrapur Math tradition.",
    isbn: "9788190424219",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-12T09:45:00.000Z",
    filePath: "/books/Shree Chitrapur Guru Parampara Charitrapur Saramrit_Shri durganand shivaram maraballi_2002_marathi_devanagari.pdf"
  },
  {
    id: 13,
    title: "Shri Lalita Sahasranama Stotram Manava Prabodhan Nysa Bikaner",
    author: "Vasini, Kameshvari, Aruna, Vimala, Jayani, Modini, Sarveshvari, and Kaulini",
    year: 2019,
    language: "sanskrit",
    script: "devanagari",
    category: "Tantra",
    description: "A sacred text containing the thousand names of the Divine Mother Lalita with ritual practices.",
    isbn: "9788120818330",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-13T16:50:00.000Z",
    filePath: "/books/Shri Lalita Sahasranama Stotram Manava Prabodhan Nysa Bikaner_Vasini et al_2019_sanskrit_devanagari.pdf"
  },
  {
    id: 14,
    title: "Shri Raman Gita",
    author: "Shri Vashistha Ganapati Muni-1",
    year: 1946,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy",
    description: "A philosophical text in the form of dialogues with Sri Ramana Maharshi.",
    isbn: "9788182881228",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-14T10:05:00.000Z",
    filePath: "/books/Shri Raman Gita_Shri Vashistha Ganapati Muni-1_1946_sanskrit_devanagari.pdf"
  },
  {
    id: 15,
    title: "Shri-Vidya-Ratna-Sutram-of-Gaud-Datiya",
    author: "Gaudpadacharya",
    year: 2006,
    language: "sanskrit",
    script: "devanagari",
    category: "Tantra",
    description: "Precious sutras on Sri Vidya tantric practices and philosophy.",
    isbn: "9788186050217",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-15T12:20:00.000Z",
    filePath: "/books/Shri-Vidya-Ratna-Sutram-of-Gaud-Datiya_Gaudpadacharya_2006_sanskrit_devanagari.pdf"
  },
  {
    id: 16,
    title: "Shrimooka panchashathi",
    author: "Lakshmi Halasyam",
    year: 2005,
    language: "sanskrit",
    script: "devanagari",
    category: "Philosophy",
    description: "A collection of five hundred verses in praise of the Divine Mother.",
    isbn: "9788185141978",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-16T14:30:00.000Z",
    filePath: "/books/Shrimooka panchashathi_Lakshmi Halasyam_2005_sanskrit_devanagari.pdf"
  },
  {
    id: 17,
    title: "South Indian Bronzes",
    author: "C.Sivaramamurti",
    year: 1963,
    language: "english",
    script: "roman",
    category: "Purana",
    description: "A detailed study of ancient South Indian bronze sculptures and their cultural significance.",
    isbn: "9788185054186",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-17T09:25:00.000Z",
    filePath: "/books/South Indian Bronzes_C.Sivaramamurti_1963_english_roman.pdf"
  },
  {
    id: 18,
    title: "Space-Collins",
    author: "David Hawksett",
    year: 2005,
    language: "english",
    script: "roman",
    category: "Philosophy",
    description: "An exploration of philosophical concepts related to space, existence, and cosmic understanding.",
    isbn: "9780007211357",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-18T11:15:00.000Z",
    filePath: "/books/Space-Collins_David Hawksett_2005_english_roman.pdf"
  },
  {
    id: 19,
    title: "Stutimanjari Kannada",
    author: "Malini Madiman Pachi",
    year: 2013,
    language: "kannada",
    script: "brahmi",
    category: "Veda",
    description: "A bouquet of hymns and prayers in Kannada based on Vedic traditions.",
    isbn: "9788193255629",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-19T13:40:00.000Z",
    filePath: "/books/Stutimanjari Kannada_Malini Madiman Pachi_2013_kannada_brahmi.pdf"
  },
  {
    id: 20,
    title: "Tara-Kalpa-Taru",
    author: "Ramanand Sharma,Ruthsheel sharma",
    year: 2006,
    language: "hindi",
    script: "devanagari",
    category: "Philosophy",
    description: "A comprehensive work on the goddess Tara and her philosophical dimensions.",
    isbn: "9788186050743",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-20T10:10:00.000Z",
    filePath: "/books/Tara-Kalpa-Taru_Ramanand Sharma,Ruthsheel sharma_2006_hindi_devanagari.pdf"
  },
  {
    id: 21,
    title: "kannada booklet",
    author: "Kuvempu, K. Shivaram Karanth, Poornachandra Tejaswi, and B. M. Srikanthaiah",
    year: 1918,
    language: "kannada",
    script: "brahmi",
    category: "Veda",
    description: "A classic collection of Vedic knowledge translated and interpreted in Kannada by renowned scholars.",
    isbn: "9788193629581",
    coverImage: "/images/book_icon.jpg",
    dateAdded: "2025-09-21T08:55:00.000Z",
    filePath: "/books/kannada booklet_Kuvempu et al_1918_kannada_brahmi.pdf"
  }
];
