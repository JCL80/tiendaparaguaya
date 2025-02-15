'use client';

import { useState } from 'react';
import { Heart, Info } from 'lucide-react';

interface WishlistButtonProps {
  productId: number;
  isWishlisted: boolean; // Whether the product is already in the wishlist
}

export default function WishlistButton({
  productId,
  isWishlisted: initialWishlisted,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);

  const addToWishlist = async () => {
    try {
      console.log("add to lista de deseos")
      // const API_URL = `${process.env.STRAPI_URL}/api/wishlists/${wishlistId}`;
      // const API_TOKEN = process.env.STRAPI_BACK_TOKEN;

      // Fetch the current wishlist
      // const response = await fetch(API_URL, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${API_TOKEN}`,
      //   },
      // });

      // if (!response.ok) {
      //   console.error('Failed to fetch wishlist:', response.statusText);
      //   return;
      // }

      // const { data } = await response.json();
      // const currentPosts = data.attributes.posts?.data || [];

      // // Add the new product to the posts array
      // const updatedPosts = [...currentPosts.map((post) => post.id), productId];

      // // Update the wishlist
      // const updateResponse = await fetch(API_URL, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${API_TOKEN}`,
      //   },
      //   body: JSON.stringify({
      //     data: { posts: updatedPosts },
      //   }),
      // });

      // if (!updateResponse.ok) {
      //   console.error('Failed to add product to wishlist:', updateResponse.statusText);
      //   return;
      // }

      setIsWishlisted(true);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      console.log("remove from the lista de deseos")
      // const API_URL = `${process.env.STRAPI_URL}/api/wishlists/${wishlistId}`;
      // const API_TOKEN = process.env.STRAPI_BACK_TOKEN;

      // Fetch the current wishlist
      // const response = await fetch(API_URL, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${API_TOKEN}`,
      //   },
      // });

      // if (!response.ok) {
      //   console.error('Failed to fetch wishlist:', response.statusText);
      //   return;
      // }

      // const { data } = await response.json();
      // const currentPosts = data.attributes.posts?.data || [];

      // // Remove the product from the posts array
      // const updatedPosts = currentPosts
      //   .filter((post) => post.id !== productId)
      //   .map((post) => post.id);

      // // Update the wishlist
      // const updateResponse = await fetch(API_URL, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${API_TOKEN}`,
      //   },
      //   body: JSON.stringify({
      //     data: { posts: updatedPosts },
      //   }),
      // });

      // if (!updateResponse.ok) {
      //   console.error('Failed to remove product from wishlist:', updateResponse.statusText);
      //   return;
      // }

      setIsWishlisted(false);
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };


  const handleWishlistToggle = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
        credentials: 'include', // Ensure cookies (JWT) are sent
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
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4" />
        <button
          type="button"
          className="underline hover:text-gray-800"
        >
          ¿Qué es una lista de deseos?
        </button>
      </div>
      <button
        onClick={handleWishlistToggle}
        className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg 
        ${
          isWishlisted
            ? 'bg-white-500 text-green-800 border border-green-300'
            : 'bg-gray-100 text-gray-700'
        } 
        hover:${isWishlisted ? 'bg-red-600/20' : 'bg-gray-200'} 
        transition-all duration-200 ease-in-out`}
      >
        <Heart
          className={`mr-2 ${
            isWishlisted ? 'fill-current text-white' : 'text-gray-700'
          }`}
          style={{ color: isWishlisted ? '#10B981' : '' }} // Green heart color when wishlisted
        />
        {isWishlisted ? 'En tu lista de deseos' : 'Agregar a la lista de deseos'}
      </button>
    </div>
  );
}
