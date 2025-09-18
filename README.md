# Modern Book Library

A comprehensive digital library application built with Next.js, React, and Tailwind CSS that allows users to manage, search, and organize their book collection with a modern and responsive UI.

![Modern Book Library](/public/images/book_icon.jpg)

## LINK 

## Features

- **Book Management**: Add, edit, and delete books with comprehensive metadata
- **Advanced Search & Filtering**: Find books by title, author, category, language, script, and year
- **Multiple Views**: Toggle between grid and list view based on your preference
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Orange-themed interface with automatic or manual light/dark mode switching
- **Import/Export**: Import books from JSON or export your library in JSON/CSV formats
- **Local Storage**: Data persistence using browser local storage

## Tech Stack

- **Next.js 14+** with App Router
- **React 18+**
- **Tailwind CSS** with custom orange theme
- **shadcn/ui** components
- **Local Storage** for data persistence
- **Custom Hooks** for state management

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Demigod1410/Next-Library.git
cd next-library
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
next-library/
├── public/              # Static assets
│   └── images/          # Book covers and icons
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── library/     # Library page
│   │   └── upload/      # Upload page
│   ├── components/      # React components
│   │   └── ui/          # UI components from shadcn/ui
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
└── package.json         # Project dependencies
```

## Key Components

- **BookCard**: Displays book information in grid or list view
- **SearchBar**: Enables text search across all book fields
- **FilterPanel**: Provides advanced filtering options
- **UploadForm**: Form for adding new books or importing data
- **Navbar**: Navigation and theme toggling

## Custom Hooks

- **useBooks**: Manages the book collection with CRUD operations
- **useSearch**: Handles search and filtering logic
- **useLocalStorage**: Provides persistent storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Re-usable UI components
