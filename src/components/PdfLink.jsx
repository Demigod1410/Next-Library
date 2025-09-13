"use client";

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to handle PDF file links with proper path resolution
 */
const PdfLink = ({ filePath, className, children }) => {
  // Handle different environment paths
  const resolvePdfPath = () => {
    if (!filePath) return '#';
    
    // In production, use the environment variable if available
    if (process.env.NODE_ENV === 'production') {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      return `${baseUrl}${filePath}`;
    }
    
    // In development, use the path directly
    return filePath;
  };

  return (
    <a 
      href={resolvePdfPath()} 
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

PdfLink.propTypes = {
  filePath: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PdfLink;