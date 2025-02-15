import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log("post to the lista de deseos api call" )
    const token = request.cookies.get('token')?.value; // Get JWT from cookies
    console.log("token", token)
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { productId } = await request.json();
    
    // Fetch the user ID from Strapi using the token
    const userRes = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const user = await userRes.json();
    
    if (!user || !user.id) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    console.log("user", user)

    const API_TOKEN = process.env.STRAPI_BACK_TOKEN;
    
    // Check if the user already has a wishlist
    const wishlistRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists?filters[user][id][$eq]=${user.id}&populate[user]=*&populate[posts]=*`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    
    
    const wishlistData = await wishlistRes.json();
    console.log("wishlistData", wishlistData)
    let wishlist = wishlistData.data[0]; // Get the first wishlist
    console.log("wishlist", wishlist)
    if (!wishlist) {
        console.log("No wishlist found --> user" , user.id)
        // If no wishlist exists, create a new one
        const createRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
                user: user.id,          // Single user ID
                posts: [productId],     // Array of post IDs
              },
          }),
        });
        const responseData = await createRes.json();

        if (!createRes.ok) {
            console.error("Failed to create wishlist. Status:", createRes.status);
            console.error("Response data:", responseData);
            return NextResponse.json(
              { error: 'Failed to create wishlist', details: responseData },
              { status: createRes.status }
            );
          }
          console.log("responseData", responseData)
  
        return NextResponse.json({ message: 'Wishlist created successfully' });
    }  

    const wishlistUser = wishlist.attributes.user.data;
    // console.log("wishlistUser", wishlistUser)
    const wishlistPosts = wishlist.attributes.posts.data;
    // console.log("wishlistPosts", wishlistPosts)

    return NextResponse.json({ message: 'post to the lista de deseos api call' });
    if (!wishlist) {
      // If wishlist doesn't exist, create a new one
      const createRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { user: user.id, posts: [productId] } }),
      });

      return createRes.ok ? NextResponse.json(await createRes.json()) : NextResponse.json({ error: 'Failed to create wishlist' }, { status: 500 });
    }

    // If wishlist exists, add the product to it
    const updatedPosts = [...wishlist.attributes.posts.data.map((p) => p.id), productId];

    const updateRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists/${wishlist.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { posts: updatedPosts } }),
    });

    return updateRes.ok ? NextResponse.json(await updateRes.json()) : NextResponse.json({ error: 'Failed to update wishlist' }, { status: 500 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
    try {
        console.log("delete from the lista de deseos api call" )
        const token = request.cookies.get('token')?.value;
        console.log("token", token)
        return NextResponse.json({ message: 'delete from the lista de deseos api call' });
      if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
      const { productId } = await request.json();
  
      // Fetch the user ID from Strapi
      const userRes = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userRes.json();
      if (!user || !user.id) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  
      // Get the user's wishlist
      const wishlistRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists?filters[user][id][$eq]=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const wishlistData = await wishlistRes.json();
      let wishlist = wishlistData.data[0];
  
      if (!wishlist) return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
  
      // Remove the product from the wishlist
      const updatedPosts = wishlist.attributes.posts.data.filter((p) => p.id !== productId).map((p) => p.id);
  
      const updateRes = await fetch(`${process.env.STRAPI_URL}/api/wishlists/${wishlist.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { posts: updatedPosts } }),
      });
  
      return updateRes.ok ? NextResponse.json(await updateRes.json()) : NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }
  