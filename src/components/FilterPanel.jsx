"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LANGUAGES, SCRIPTS, CATEGORIES, SUBCATEGORIES } from "@/utils/constants";
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";

/**
 * FilterPanel component for filtering books
 */
const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  yearRange,
  onYearRangeChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localYearRange, setLocalYearRange] = useState(yearRange);
  
  // Calculate the active filter count
  const activeFilterCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key !== 'yearRange' && value !== 'all') {
      return count + 1;
    }
    if (key === 'yearRange' && (yearRange.min !== null || yearRange.max !== null)) {
      return count + 1;
    }
    return count;
  }, 0);

  const handleYearInputChange = (field, value) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    const newRange = { ...localYearRange, [field]: numValue };
    setLocalYearRange(newRange);
  };

  const applyYearRange = () => {
    onYearRangeChange(localYearRange);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onResetFilters}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      {isExpanded && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={filters.category} 
              onValueChange={(value) => onFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Subcategory</label>
            <Select 
              value={filters.subcategory || 'all'} 
              onValueChange={(value) => onFilterChange('subcategory', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Subcategories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {SUBCATEGORIES.map(subcategory => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select 
              value={filters.language} 
              onValueChange={(value) => onFilterChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {LANGUAGES.map(language => (
                  <SelectItem key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Script</label>
            <Select 
              value={filters.script} 
              onValueChange={(value) => onFilterChange('script', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Scripts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scripts</SelectItem>
                {SCRIPTS.map(script => (
                  <SelectItem key={script} value={script}>
                    {script.charAt(0).toUpperCase() + script.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Year Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="From"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={localYearRange.min ?? ''}
                onChange={(e) => handleYearInputChange('min', e.target.value)}
              />
              <span className="text-muted-foreground">to</span>
              <input
                type="number"
                placeholder="To"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={localYearRange.max ?? ''}
                onChange={(e) => handleYearInputChange('max', e.target.value)}
              />
              <Button size="sm" onClick={applyYearRange}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    language: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    subcategory: PropTypes.string
  }).isRequired,
  yearRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onYearRangeChange: PropTypes.func.isRequired
};

export default FilterPanel;
