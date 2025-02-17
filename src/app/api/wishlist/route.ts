/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log("post to the lista de deseos api call");

    const token = request.cookies.get('token')?.value;
    console.log("token", token);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId } = await request.json();
    
    // Fetch user details from Strapi
    const userRes = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await userRes.json();
    if (!user || !user.id) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    console.log("user", user);

    const API_TOKEN = process.env.STRAPI_BACK_TOKEN;

    // Check if the user already has a wishlist
    const wishlistRes = await fetch(
      `${process.env.STRAPI_URL}/api/wishlists?filters[user][id][$eq]=${user.id}&populate[posts]=*`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }
    );

    const wishlistData = await wishlistRes.json();
    // eslint-disable-next-line prefer-const
    let wishlist = wishlistData.data[0]; // Get the first wishlist
    console.log("wishlist", wishlist);

    if (!wishlist) {
      console.log("No wishlist found, creating a new one for user:", user.id);
      
      // Create a new wishlist
      const createRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            user: user.id,
            posts: [productId], 
          },
        }),
      });

      const responseData = await createRes.json();

      if (!createRes.ok) {
        console.error("Failed to create wishlist:", createRes.status, responseData);
        return NextResponse.json(
          { error: 'Failed to create wishlist', details: responseData },
          { status: createRes.status }
        );
      }

      console.log("Wishlist created successfully:", responseData);
      return NextResponse.json({ message: 'Wishlist created successfully', data: responseData });
    }

    // Extract existing post IDs
    const existingPostIds = wishlist.attributes.posts.data.map((p: any) => p.id);
    console.log("Existing Wishlist Posts:", existingPostIds);

    // If the product is already in the wishlist, do nothing
    if (existingPostIds.includes(productId)) {
      console.log("Product already in wishlist, no action needed.");
      return NextResponse.json({ message: 'Product already in wishlist' });
    }

    // Add the new product to the existing wishlist
    const updatedPosts = [...existingPostIds, productId];

    const updateRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists/${wishlist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`, // Use API token for authorization
      },
      body: JSON.stringify({ data: { posts: updatedPosts } }),
    });

    if (!updateRes.ok) {
      console.error("Failed to update wishlist:", updateRes.status);
      return NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
    }

    console.log("Wishlist updated successfully!");
    return NextResponse.json({ message: 'Wishlist updated successfully' });

  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}



export async function DELETE(request: NextRequest) {
  try {
    console.log("Delete request received for wishlist API");

    const token = request.cookies.get('token')?.value;
    console.log("Token:", token);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId } = await request.json();
    
    // Fetch the user details from Strapi
    const userRes = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await userRes.json();
    if (!user || !user.id) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    console.log("User:", user);

    const API_TOKEN = process.env.STRAPI_BACK_TOKEN;

    // Fetch the user's wishlist
    const wishlistRes = await fetch(
      `${process.env.STRAPI_URL}/api/wishlists?filters[user][id][$eq]=${user.id}&populate[posts]=*`,
      {
        headers: { Authorization: `Bearer ${API_TOKEN}` }, // Use API token
      }
    );

    const wishlistData = await wishlistRes.json();
    // eslint-disable-next-line prefer-const
    let wishlist = wishlistData.data[0]; // Get the first wishlist
    console.log("Wishlist found:", wishlist);

    if (!wishlist) {
      console.log("No wishlist found for user:", user.id);
      return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
    }

    // Extract existing posts
    const existingPostIds = wishlist.attributes.posts.data.map((p: any) => p.id);

    if (!existingPostIds.includes(productId)) {
      console.log("Product not in wishlist, nothing to remove.");
      return NextResponse.json({ message: 'Product not in wishlist' });
    }

    // Remove product from the wishlist
    const updatedPosts = existingPostIds.filter((id : any) => id !== productId);
    console.log("Updated wishlist after removal:", updatedPosts);

    const updateRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists/${wishlist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: { posts: updatedPosts } }),
    });

    if (!updateRes.ok) {
      console.error("Failed to update wishlist:", updateRes.status);
      return NextResponse.json({ error: 'Failed to remove product from wishlist' }, { status: 500 });
    }

    console.log("Wishlist updated successfully after removal");
    return NextResponse.json({ message: 'Product removed from wishlist successfully' });

  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
