'use client';

import { useState } from 'react';
import { Heart, Info } from 'lucide-react';
import WishlistModal from './WishlistModal';

interface WishlistButtonProps {
  productId: number;
  isWishlisted: boolean;
}

export default function WishlistButton({ productId, isWishlisted: initialWishlisted }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update wishlist');
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <div className="mt-8 text-gray-600 text-sm flex flex-col gap-4">
      {/* Info + Modal Trigger */}
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4" />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="underline hover:text-gray-800"
        >
          ¿Qué es una lista de deseos?
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg 
        ${isWishlisted ? 'bg-white-500 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700'} 
        hover:${isWishlisted ? 'bg-red-600/20' : 'bg-gray-200'} 
        transition-all duration-200 ease-in-out`}
      >
        <Heart
          className={`mr-2 ${isWishlisted ? 'fill-current text-white' : 'text-gray-700'}`}
          style={{ color: isWishlisted ? '#10B981' : '' }}
        />
        {isWishlisted ? 'En tu lista de deseos' : 'Agregar a la lista de deseos'}
      </button>

      {/* Wishlist Modal */}
      <WishlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
