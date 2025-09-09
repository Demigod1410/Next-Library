"use client";

import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

/**
 * SearchBar component for filtering books
 */
const SearchBar = ({ searchText, onSearchChange, onClear }) => {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search books by title, author, category..."
        className="pl-8 pr-10"
        value={searchText}
        onChange={onSearchChange}
      />
      {searchText && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1.5 h-7 w-7 p-0"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default SearchBar;
