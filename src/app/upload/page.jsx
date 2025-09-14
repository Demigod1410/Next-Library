"use client";

import React, { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import UploadForm from "@/components/UploadForm";
import { toast } from "sonner";
import { BookOpen, ChevronRight, Upload } from "lucide-react";

export default function UploadPage() {
  const { addBook, importBooks } = useBooks();
  const router = useRouter();
  const [uploadStats, setUploadStats] = useState({
    booksAdded: 0,
    lastAction: null,
  });

  const handleAddBook = async (bookData) => {
    const result = await addBook(bookData);
    
    if (result.success) {
      setUploadStats(prev => ({
        booksAdded: prev.booksAdded + 1,
        lastAction: 'add'
      }));
    }
    
    return result;
  };

  const handleImportBooks = async (booksData) => {
    const result = await importBooks(booksData);
    
    if (result.success) {
      setUploadStats(prev => ({
        booksAdded: prev.booksAdded + booksData.length,
        lastAction: 'import'
      }));
    }
    
    return result;
  };

  const handleGoToLibrary = () => {
    toast.success("Navigating to your library");
    router.push("/library");
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold">Add to Your Library</h1>
        <p className="text-muted-foreground">
          Add new books to your collection or import data from JSON files
        </p>
      </div>

      <div className="grid gap-8">
        {/* Upload Form */}
        <div>
          <UploadForm 
            onAddBook={handleAddBook} 
            onImportBooks={handleImportBooks} 
          />
        </div>

        {/* Success Message */}
        {uploadStats.booksAdded > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">
                    Success! {uploadStats.booksAdded} {uploadStats.booksAdded === 1 ? 'book' : 'books'} added
                  </h2>
                  <p className="text-muted-foreground">
                    {uploadStats.lastAction === 'add' 
                      ? "Your book has been added to the library."
                      : `Successfully imported ${uploadStats.booksAdded} books to your library.`}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={handleGoToLibrary}>
                  Go to Library <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Tips */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="cover">
              <TabsList className="mb-4">
                <TabsTrigger value="cover">Cover Images</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cover" className="space-y-4">
                <h3 className="text-lg font-medium">Cover Image Recommendations</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use JPEG, PNG or WebP formats</li>
                  <li>Recommended size: 600 x 900 pixels (2:3 aspect ratio)</li>
                  <li>Maximum file size: 2MB</li>
                  <li>For bulk imports, use URLs in the coverImage field</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="tips" className="space-y-4">
                <h3 className="text-lg font-medium">Upload Tips</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Required fields: title, author, year, language, script, category</li>
                  <li>Years can be negative for ancient texts (e.g., -500 for 500 BCE)</li>
                  <li>All book data is stored in your browser's local storage</li>
                  <li>You can export your library anytime from the Library page</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
