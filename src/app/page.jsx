"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { useBooks } from "@/hooks/useBooks";
import { SAMPLE_BOOKS } from "@/utils/constants";
import { motion } from "framer-motion";
import { BookOpen, Library, Upload, Search } from "lucide-react";

export default function Home() {
  const { books, loading, getStatistics } = useBooks();
  const [stats, setStats] = useState({
    total: 0,
    categoryCounts: {},
    languageCounts: {},
    recentlyAddedCount: 0
  });
  const [searchText, setSearchText] = useState("");
  const [featuredBooks, setFeaturedBooks] = useState([]);
  
  // Calculate statistics when books change
  useEffect(() => {
    if (!loading) {
      setStats(getStatistics());
      
      // Get latest 6 books for featured section
      const sorted = [...books].sort((a, b) => 
        new Date(b.dateAdded) - new Date(a.dateAdded)
      );
      setFeaturedBooks(sorted.slice(0, 6));
    }
  }, [books, loading, getStatistics]);
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      // Navigate to library page with search query
      window.location.href = `/library?search=${encodeURIComponent(searchText)}`;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-16 max-w-7xl">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center justify-items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center md:text-left w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Jnanasangraha Book <span className="text-primary">Library</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover, organize, and explore books from various languages, scripts, and categories.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto md:mx-0">
              <SearchBar 
                searchText={searchText}
                onSearchChange={handleSearchChange}
                onClear={() => setSearchText("")}
              />
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/library">
                  <Library className="mr-2 h-5 w-5" /> 
                  Browse Library
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/upload">
                  <Upload className="mr-2 h-5 w-5" /> 
                  Add Books
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[300px] md:h-[400px] w-full"
          >
            <div className="absolute w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
              <div className="bg-primary/20 rounded-lg"></div>
              <div className="bg-primary/40 rounded-lg"></div>
              <div className="bg-primary/30 rounded-lg"></div>
              <div className="bg-primary/10 rounded-lg"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/logo.svg"
                alt="Shri Chitrapur Math Logo"
                width={240}
                height={240}
                priority
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
    {/* Statistics Dashboard */}
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-6">Library Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <Card className="bg-primary/5">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Total Books</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Categories</h3>
            <p className="text-3xl font-bold">{Object.keys(stats.categoryCounts).length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Languages</h3>
            <p className="text-3xl font-bold">{Object.keys(stats.languageCounts).length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-1">Recent Additions</h3>
            <p className="text-3xl font-bold">{stats.recentlyAddedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">In the last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Featured Books */}
    <section className="text-center">
      <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Featured Books</h2>
        <Button asChild variant="outline">
          <Link href="/library">View All</Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="h-[250px] animate-pulse">
              <div className="h-full bg-muted"></div>
            </Card>
          ))}
        </div>
      ) : featuredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="h-full">
              <BookCard book={book} viewMode="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Image 
            src="/chitrapur-math-logo.svg"
            alt="Shri Chitrapur Math Logo"
            width={48}
            height={48}
            className="mx-auto mb-3"
          />
          <h3 className="text-lg font-medium">No books yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by adding some books to your library
          </p>
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Add Books
            </Link>
          </Button>
        </div>
      )}
    </section>

    {/* Categories Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {["Philosophy", "Bhashya", "Upanishad", "Tantra", "Purana", "Veda"].map((category) => (
            <Link 
              href={`/library?category=${category}`} 
              key={category}
              className="group"
            >
              <Card className="transition-all group-hover:shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-6 flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                    <div>
                      <h3 className="font-medium text-lg">{category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stats.categoryCounts[category] || 0} books
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      Browse
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
