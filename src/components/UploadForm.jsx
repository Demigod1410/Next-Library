"use client";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, LANGUAGES, SCRIPTS } from "@/utils/constants";
import { validateBook, validateJsonImport, validateFile } from "@/utils/validation";
import { toast } from "sonner";
import { Upload, AlertCircle, Plus, Loader2, FileText } from "lucide-react";

/**
 * UploadForm component for adding books to library
 */
const UploadForm = ({ onAddBook, onImportBooks }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const bookFileInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  
  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
      language: "english",
      script: "roman",
      category: "Philosophy",
      description: "",
      isbn: ""
    }
  });
  
  // Handle manual form submission
  const onSubmit = async (data) => {
    try {
      // Add cover image if available
      if (coverImage) {
        data.coverImage = coverImage;
      }
      
      // Add book file if available
      if (bookFile) {
        data.bookFile = bookFile;
      }
      
      const result = await onAddBook(data);
      
      if (result.success) {
        toast.success(result.message);
        reset();
        setCoverImage(null);
        setBookFile(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Error adding book: ${error.message}`);
    }
  };
  
  // Handle JSON file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const validation = validateFile(file, 'json');
    if (!validation.isValid) {
      setUploadError(validation.error);
      toast.error(validation.error);
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    const reader = new FileReader();
    
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };
    
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const validation = validateJsonImport(jsonData);
        
        if (validation.isValid) {
          setPreviewData(validation.data);
          setUploadError(null);
        } else {
          setPreviewData(validation.validBooks || []);
          setUploadError(validation.error);
          toast.error(validation.error);
        }
        
        setIsUploading(false);
      } catch (error) {
        setUploadError(`Invalid JSON format: ${error.message}`);
        setIsUploading(false);
        toast.error(`Invalid JSON format: ${error.message}`);
      }
    };
    
    reader.onerror = () => {
      setUploadError("Error reading the file");
      setIsUploading(false);
      toast.error("Error reading the file");
    };
    
    reader.readAsText(file);
  };
  
  // Handle cover image upload
  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const validation = validateFile(file, 'image');
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target.result);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Handle book file upload
  const handleBookFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type (PDF, DOC, DOCX)
    const fileType = file.type;
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(fileType)) {
      toast.error("Please upload a valid PDF or Word document");
      return;
    }
    
    // Validate file size (max 200MB)
    const maxSize = 200 * 1024 * 1024; // 200MB
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum file size is 200MB.");
      return;
    }
    
    // Store the file
    setBookFile(file);
    toast.success(`File "${file.name}" ready to upload`);
  };
  
  // Import books from preview data
  const handleImportBooks = async () => {
    if (!previewData || previewData.length === 0) {
      toast.error("No valid books to import");
      return;
    }
    
    try {
      const result = await onImportBooks(previewData);
      
      if (result.success) {
        toast.success(result.message);
        setPreviewData(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Error importing books: ${error.message}`);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Books to Library</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">
              <Plus className="h-4 w-4 mr-2" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload JSON
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-destructive text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.title.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">
                    Author <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="author"
                    {...register("author", { required: "Author is required" })}
                    className={errors.author ? "border-destructive" : ""}
                  />
                  {errors.author && (
                    <p className="text-destructive text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.author.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">
                    Year <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { 
                      required: "Year is required",
                      valueAsNumber: true
                    })}
                    className={errors.year ? "border-destructive" : ""}
                  />
                  {errors.year && (
                    <p className="text-destructive text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.year.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Language <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    onValueChange={(value) => setValue("language", value)} 
                    defaultValue="english"
                  >
                    <SelectTrigger className={errors.language ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(language => (
                        <SelectItem key={language} value={language}>
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && (
                    <p className="text-destructive text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.language.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Script <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    onValueChange={(value) => setValue("script", value)}
                    defaultValue="roman"
                  >
                    <SelectTrigger className={errors.script ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select script" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCRIPTS.map(script => (
                        <SelectItem key={script} value={script}>
                          {script.charAt(0).toUpperCase() + script.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.script && (
                    <p className="text-destructive text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.script.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </label>
                <Select 
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue="Philosophy"
                >
                  <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-destructive text-xs flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.category.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="isbn" className="text-sm font-medium">
                    ISBN
                  </label>
                  <Input
                    id="isbn"
                    {...register("isbn")}
                    placeholder="Optional"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">
                      Cover Image
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => coverInputRef.current?.click()}
                      >
                        Upload Cover
                      </Button>
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleCoverImageUpload}
                      />
                      
                      {coverImage && (
                        <Badge variant="outline" className="bg-primary/10">
                          Cover Image Added
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium block">
                      Book File
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => bookFileInputRef.current?.click()}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Book PDF/DOC
                      </Button>
                      <input
                        ref={bookFileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={handleBookFileUpload}
                      />
                      
                      {bookFile && (
                        <Badge variant="outline" className="bg-primary/10">
                          {bookFile.name.length > 20 ? bookFile.name.substring(0, 20) + '...' : bookFile.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Book
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="py-4 space-y-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" 
                     onClick={() => fileInputRef.current?.click()}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    JSON file with book data
                  </p>
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${uploadProgress}%` }} 
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
                
                {uploadError && (
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{uploadError}</p>
                  </div>
                )}
              </div>
              
              {previewData && previewData.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <Badge>
                      {previewData.length} {previewData.length === 1 ? "book" : "books"}
                    </Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 max-h-[300px] overflow-auto">
                    <ul className="space-y-2">
                      {previewData.map((book, index) => (
                        <li key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {book.author}, {book.year} - {book.category}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {book.language}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleImportBooks} 
                    disabled={!previewData || previewData.length === 0}
                  >
                    Import {previewData.length} {previewData.length === 1 ? "Book" : "Books"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 flex justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </p>
        <p className="text-xs text-muted-foreground">
          All book data is stored locally
        </p>
      </CardFooter>
    </Card>
  );
};

UploadForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  onImportBooks: PropTypes.func.isRequired
};

export default UploadForm;
