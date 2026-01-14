'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('bersiap buat cutiiii...');
  
  const loadingTexts = [
    'bersiap buat cutiiii...',
    'ngitung strategi terbaik...',
    'cari momen paling worth it...',
    'loading healing mode... ✨',
  ];
  
  useEffect(() => {
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[textIndex]);
    }, 800);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
      <div className="text-center space-y-6 animate-pulse">
        <div className="text-7xl md:text-9xl animate-bounce">
          🏖️
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-2xl">
          {loadingText}
        </h2>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
