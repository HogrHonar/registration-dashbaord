'use client';

import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function SearchBar({ onSearch, isLoading, error }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Debounced search function
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <svg 
          className="w-5 h-5 text-gray-400 mr-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full outline-none text-gray-900 placeholder-gray-500"
        />
        {isLoading && (
          <div className="ml-2 w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}