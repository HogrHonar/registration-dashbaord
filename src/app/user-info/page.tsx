'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/app/components/SearchBar';
import Logo from '@/app/components/Logo';
import { PreRegistration } from '@/lib/types';

export default function Home() {
  const [results, setResults] = useState<PreRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to load results');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelect = (item: PreRegistration) => {
    // Navigate to registration details page with the pre-registration ID
    router.push(`/registration/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-12">
          <Logo />
          <h1 className="mt-4 text-2xl font-light text-gray-600">Registration System</h1>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading}
          error={error}
        />

        {results.length > 0 && (
          <div className="mt-4 bg-white rounded-xl shadow-md overflow-hidden">
            {results.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.branch} • {item.phone1}
                    </p>
                  </div>
                  {item.phone2 && (
                    <span className="text-sm text-gray-400">{item.phone2}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}