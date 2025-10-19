'use client';

import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const stored = localStorage.getItem('techtrain-wishlist');
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load wishlist', e);
      }
    }
  }, []);

  const toggleWishlist = (courseId: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];

      // Save to localStorage
      localStorage.setItem('techtrain-wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isInWishlist = (courseId: string) => wishlist.includes(courseId);

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
  };
}
