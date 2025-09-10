"use client";

import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, BookOpen, FileText } from "lucide-react";
import Image from "next/image";
import { formatDate, truncateText } from "@/utils/helpers";

/**
 * Book detail view component
 */
const BookDetail = ({ book }) => {
  if (!book) return null;
  
  const coverSrc = book.coverImage || "/images/book_icon.jpg";

  return (
    <div className="grid gap-6 md:grid-cols-[350px_1fr]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
        <Image
          src={coverSrc}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 350px"
          priority
        />
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-lg text-muted-foreground">by {book.author}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/10">{book.category}</Badge>
          <Badge variant="outline" className="bg-primary/5">
            {book.language.charAt(0).toUpperCase() + book.language.slice(1)}
          </Badge>
          <Badge variant="outline">
            {book.script.charAt(0).toUpperCase() + book.script.slice(1)} Script
          </Badge>
          <Badge variant="outline">{book.year}</Badge>
        </div>
        
        {book.description && (
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{book.description}</p>
          </div>
        )}
        
        {book.isbn && (
          <div>
            <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          Added on {formatDate(book.dateAdded)}
        </div>
        
        {book.filePath && (
          <div className="mt-4">
            <a href={book.filePath} target="_blank" rel="noopener noreferrer">
              <Button className="w-full md:w-auto">
                <FileText className="h-4 w-4 mr-2" />
                Open PDF
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * BookCard component for displaying books in grid or list view
 */
const BookCard = ({ book, viewMode = "grid" }) => {
  const isGrid = viewMode === "grid";
  const coverSrc = book.coverImage || "/images/book_icon.jpg";
  
  return (
    <Card className={`h-full w-full overflow-hidden transition-all hover:shadow-md cursor-pointer ${isGrid ? "" : "flex"}`}>
      <div className={isGrid ? "w-full" : "flex w-full"}>
        <div className={`relative ${isGrid ? "aspect-[5/4] w-full" : "h-auto w-[150px]"}`}>
          <Image
            src={coverSrc}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        
        <div className={`flex flex-col ${isGrid ? "" : "flex-1"}`}>
          <CardHeader className={`${isGrid ? "px-4 pt-3 pb-1" : "px-4 py-2"}`}>
            <h3 className={`font-semibold leading-tight ${isGrid ? "line-clamp-2" : ""}`}>
              {book.title}
            </h3>
            <p className={`text-sm text-muted-foreground ${isGrid ? "line-clamp-1" : ""}`}>
              {book.author}
            </p>
          </CardHeader>
          
          <CardContent className={`${isGrid ? "px-4 py-1" : "px-4 py-1"}`}>
            {!isGrid && book.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {truncateText(book.description, 100)}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs bg-primary/10">
                {book.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {book.year}
              </Badge>
            </div>
          </CardContent>
          
          <CardFooter className={`${isGrid ? "px-4 py-2 mt-auto" : "px-4 py-2 mt-auto"} flex gap-2`}>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Book Details</DialogTitle>
                </DialogHeader>
                <BookDetail book={book} />
              </DialogContent>
            </Dialog>
            
            {book.filePath && (
              <a href={book.filePath} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="default" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Read
                </Button>
              </a>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    isbn: PropTypes.string,
    coverImage: PropTypes.string,
    dateAdded: PropTypes.string,
    filePath: PropTypes.string
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"])
};

BookDetail.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    isbn: PropTypes.string,
    coverImage: PropTypes.string,
    dateAdded: PropTypes.string,
    filePath: PropTypes.string
  }).isRequired
};

export default BookCard;
