# Adding Books to the Next.js Library Application

This document provides comprehensive instructions for adding new books to the digital library application. The guide covers both locally stored PDF files and externally linked resources.

## Table of Contents

1. [Understanding the Book Structure](#understanding-the-book-structure)
2. [Adding Locally Stored Books](#adding-locally-stored-books)
3. [Adding Externally Hosted Books](#adding-externally-hosted-books)
4. [Updating Metadata](#updating-metadata)
5. [Handling Large Files with Git LFS](#handling-large-files-with-git-lfs)
6. [Troubleshooting](#troubleshooting)

## Understanding the Book Structure

Each book in the library is represented as an object in the `SAMPLE_BOOKS` array located in `src/utils/constants.jsx`. A typical book object has the following structure:

```javascript
{
  id: 1,                   // Unique identifier (required)
  title: "Book Title",     // Book title (required)
  author: "Author Name",   // Author name (required)
  year: 2020,              // Publication year (required)
  language: "english",     // Language - must match available languages (required)
  script: "roman",         // Script type - must match available scripts (required)
  category: "Philosophy",  // Category - must match available categories (required)
  description: "...",      // Book description (optional but recommended)
  isbn: "9781234567890",   // ISBN number (optional)
  coverImage: "/images/book_icon.jpg", // Path to cover image (optional)
  dateAdded: "2025-09-01T10:30:00.000Z", // Date added to library (required)
  filePath: "/books/filename.pdf", // Local file path (required for local files)
  externalLink: "https://..." // External link (required for externally hosted files)
}
```

## Adding Locally Stored Books

Follow these steps to add a book with a locally stored PDF:

### 1. Add the PDF file to the public/books directory

```
1. Name your PDF file using the format: "Title_Author_Year_Language_Script.pdf"
   Example: "War and Peace_Leo Tolstoy_1869_english_roman.pdf"

2. Place the PDF file in the `/public/books/` directory
```

### 2. Add the book metadata to constants.jsx

Open `src/utils/constants.jsx` and add a new entry to the `SAMPLE_BOOKS` array:

```javascript
{
  id: NEXT_AVAILABLE_ID, // Increment from the last book's ID
  title: "War and Peace",
  author: "Leo Tolstoy",
  year: 1869,
  language: "english", // Must match one of the LANGUAGES array values
  script: "roman",     // Must match one of the SCRIPTS array values
  category: "Fiction", // Must match one of the CATEGORIES array values
  description: "A detailed description of the book...",
  isbn: "9781234567890", // Optional
  coverImage: "/images/book_icon.jpg", // Default or custom cover image path
  dateAdded: new Date().toISOString(), // Current date in ISO format
  filePath: "/books/War and Peace_Leo Tolstoy_1869_english_roman.pdf"
}
```

### 3. If adding a new language, script, or category

If your book uses a language, script, or category that doesn't exist yet:

1. Add it to the respective array at the top of `constants.jsx`:

```javascript
// For a new language
export const LANGUAGES = ["sanskrit", "english", "hindi", "kannada", "marathi", "newlanguage"];

// For a new script
export const SCRIPTS = ["devanagari", "roman", "brahmi", "newscript"];

// For a new category
export const CATEGORIES = ["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda", "Yoga", "newcategory"];
```

2. Also update the `BOOK_METADATA` object to include the new values:

```javascript
export const BOOK_METADATA = {
  total_books: XX, // Update the total
  languages: ["sanskrit", "english", "hindi", "kannada", "marathi", "newlanguage"],
  scripts: ["devanagari", "roman", "brahmi", "newscript"],
  categories: ["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda", "Yoga", "newcategory"],
  year_range: {
    earliest: YYYY, // Update if the new book is older than current earliest
    latest: YYYY    // Update if the new book is newer than current latest
  }
};
```

## Adding Externally Hosted Books

For books that are hosted externally (e.g., OneDrive, Google Drive, or other cloud storage):

### 1. Get the direct link to the PDF file

Obtain a direct, publicly accessible link to the PDF. This should:
- Be a permanent link (not expiring)
- Allow direct access to the file (not requiring login)
- Open the PDF directly when visited

### 2. Add the book metadata to constants.jsx

Add a new entry to the `SAMPLE_BOOKS` array with both `filePath` and `externalLink` properties:

```javascript
{
  id: NEXT_AVAILABLE_ID, // Increment from the last book's ID
  title: "War and Peace",
  author: "Leo Tolstoy",
  year: 1869,
  language: "english",
  script: "roman",
  category: "Fiction",
  description: "A detailed description of the book...",
  isbn: "9781234567890", // Optional
  coverImage: "/images/book_icon.jpg",
  dateAdded: new Date().toISOString(),
  filePath: "/books/War and Peace_Leo Tolstoy_1869_english_roman.pdf", // Virtual path for reference
  externalLink: "https://example.com/direct-pdf-link.pdf" // The external URL that will actually be used
}
```

When a book has an `externalLink` property, the application will automatically use this link instead of the local `filePath` for the "Read" and "Open PDF" buttons.

## Updating Metadata

After adding new books, make sure to update the metadata:

1. Update the total number of books:

```javascript
export const BOOK_METADATA = {
  total_books: XX, // Update this number
  // rest of the metadata...
};
```

2. If applicable, update the year range:

```javascript
year_range: {
  earliest: YYYY, // Update if the new book is older than current earliest
  latest: YYYY    // Update if the new book is newer than current latest
}
```

3. If you added any new languages, scripts, or categories, make sure they're reflected in both the arrays and metadata object.

## Handling Large Files with Git LFS

PDF files can be large, and you should use Git Large File Storage (LFS) to manage them. The project already has LFS configured with the following in `.gitattributes`:

```
*.pdf filter=lfs diff=lfs merge=lfs -text
book filter=lfs diff=lfs merge=lfs -text
.pdf filter=lfs diff=lfs merge=lfs -text
```

### Steps for handling large PDF files:

1. Make sure Git LFS is installed on your system:
   ```bash
   git lfs install
   ```

2. When adding new PDF files:
   ```bash
   git add public/books/new-book.pdf
   git commit -m "Add new book: Book Title"
   git push
   ```

Git LFS will automatically handle the large files correctly.

## Troubleshooting

### PDF Files Not Loading

1. **Check file paths**: Ensure the `filePath` in constants.jsx exactly matches the file in the public/books directory
2. **File naming**: Avoid special characters in filenames
3. **External links**: Verify that external links are directly accessible without authentication
4. **Production issues**: If files work locally but not in production, check that:
   - The environment variables are set correctly
   - All PDFs have been properly uploaded to the production server
   - In Vercel or similar platforms, ensure large file handling is configured correctly

### Metadata Issues

1. **Search not working**: Ensure all required properties are present and correctly typed
2. **Filtering issues**: Verify that languages, scripts, and categories match exactly with their respective arrays
3. **Book not appearing**: Check that the total_books count has been updated

### Git LFS Issues

1. **Large files rejected by GitHub**: Ensure Git LFS is installed and tracking PDF files
2. **PDF showing as text in repository**: Run `git lfs migrate import --include="*.pdf"` to convert existing files

## Examples

### Example 1: Adding a Local Book

```javascript
{
  id: 24,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  language: "english",
  script: "roman",
  category: "Fiction",
  description: "The story of eccentric millionaire Jay Gatsby as told by Nick Carraway, a Midwesterner who lives on Long Island but works in Manhattan.",
  isbn: "9780743273565",
  coverImage: "/images/book_icon.jpg",
  dateAdded: "2025-09-24T14:30:00.000Z",
  filePath: "/books/The Great Gatsby_F. Scott Fitzgerald_1925_english_roman.pdf"
}
```

### Example 2: Adding an External Book

```javascript
{
  id: 25,
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  year: 1866,
  language: "english",
  script: "roman",
  category: "Fiction",
  description: "Focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill a pawnbroker for her money.",
  isbn: "9780679734505",
  coverImage: "/images/book_icon.jpg",
  dateAdded: "2025-09-25T16:45:00.000Z",
  filePath: "/books/Crime and Punishment_Fyodor Dostoevsky_1866_english_roman.pdf",
  externalLink: "https://example.com/direct-link-to-crime-and-punishment.pdf"
}
```