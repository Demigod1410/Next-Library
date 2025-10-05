"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import BookCard from "@/components/BookCard";
import AuthWrapper from "@/components/AuthWrapper";
import { useBooks } from "@/hooks/useBooks";
import { useSearch } from "@/hooks/useSearch";
import { SORT_OPTIONS, VIEW_OPTIONS } from "@/utils/constants";
import { exportToJson, exportToCsv } from "@/utils/helpers";
import { toast } from "sonner";
import { Grid, List, Download, Loader2, BookOpen } from "lucide-react";

// Main component that doesn't use useSearchParams
export default function LibraryPage() {
  const { books, loading } = useBooks();
  const [viewMode, setViewMode] = useState(VIEW_OPTIONS.GRID);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  return (
    <AuthWrapper>
      <Suspense fallback={<LoadingState />}>
        <LibraryContent 
          books={books}
          loading={loading}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
    </AuthWrapper>
  );
}

// Inner component that safely uses useSearchParams inside Suspense
function LibraryContent({ books, loading, viewMode, setViewMode, currentPage, setCurrentPage, itemsPerPage }) {
  const searchParams = useSearchParams();
  
  // Get search parameters from URL
  const urlSearchTerm = searchParams.get("search");
  const urlCategory = searchParams.get("category");
  const urlLanguage = searchParams.get("language");
  
  // Initialize search with URL parameters
  const {
    searchText,
    filters,
    sortBy,
    filteredBooks,
    setSearchText,
    updateFilter,
    setSortBy,
    resetFilters,
    handleSearchChange
  } = useSearch(books);
  
  // Apply URL search parameters on initial load
  useEffect(() => {
    if (urlSearchTerm) {
      setSearchText(urlSearchTerm);
    }
    
    if (urlCategory) {
      updateFilter("category", urlCategory);
    }
    
    if (urlLanguage) {
      updateFilter("language", urlLanguage);
    }
  }, [urlSearchTerm, urlCategory, urlLanguage, setSearchText, updateFilter]);
  
  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters, sortBy]);
  
  // Handle pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleExport = (format) => {
    try {
      if (format === 'json') {
        exportToJson(filteredBooks, 'library-export.json');
      } else if (format === 'csv') {
        exportToCsv(filteredBooks, 'library-export.csv');
      }
      
      toast.success(`Successfully exported ${filteredBooks.length} books to ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Error exporting data: ${error.message}`);
    }
  };
  
  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-20">
      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No books found</h3>
      <p className="text-muted-foreground mb-6">
        {books.length === 0 
          ? "Your library is empty. Start by adding some books."
          : "Try changing your search or filter criteria."}
      </p>
      <Button onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
  
  // Empty state component (keeping in the component for scoped access to resetFilters)
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Book Library</h1>
        <p className="text-muted-foreground">
          Browse, search and filter your book collection
        </p>
      </header>
      
      {/* Search and filter section */}
      <div className="space-y-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              searchText={searchText}
              onSearchChange={handleSearchChange}
              onClear={() => setSearchText("")}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Tabs 
              value={viewMode} 
              onValueChange={setViewMode}
              className="border rounded-md overflow-hidden"
            >
              <TabsList className="bg-transparent">
                <TabsTrigger value={VIEW_OPTIONS.GRID} className="data-[state=active]:bg-muted">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value={VIEW_OPTIONS.LIST} className="data-[state=active]:bg-muted">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <FilterPanel 
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
          yearRange={filters.yearRange || { min: null, max: null }}
          onYearRangeChange={(range) => updateFilter('yearRange', range)}
        />
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredBooks.length}</span> books
          </p>
          
        </div>
      </div>
      
      {/* Book grid/list */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <LoadingState />
        ) : paginatedBooks.length > 0 ? (
          <div className={
            viewMode === VIEW_OPTIONS.GRID
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {paginatedBooks.map((book) => (
              <div key={book.id} className="h-full w-full">
                <BookCard book={book} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Result summary */}
      {filteredBooks.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}

// Add LoadingState definition at the top level so it's available to both components
const LoadingState = () => (
  <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center py-20">
    <Loader2 className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
    <h3 className="text-lg font-medium">Loading your library</h3>
    <p className="text-muted-foreground">
      Please wait while we load your books...
    </p>
  </div>
);
