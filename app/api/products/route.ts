// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/Product';

// GET - Fetch all products or filtered products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const visibleOnly = searchParams.get('visibleOnly') === 'true';
    const searchTerm = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const filterBy = searchParams.get('filterBy');

    let productsQuery = collection(db, 'products');
    
    // Apply visibility filter if requested
    if (visibleOnly) {
      productsQuery = query(
        collection(db, 'products'),
        where('isVisible', '==', true)
      ) as any;
    }

    const querySnapshot = await getDocs(productsQuery);
    let products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    // Apply client-side filtering and sorting
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy && filterBy !== 'all') {
      products = products.filter(product => {
        if (filterBy === 'in-stock') return product.status === 'In Stock';
        if (filterBy === 'out-of-stock') return product.status === 'Out of Stock';
        return true;
      });
    }

    // Apply sorting
    if (sortBy) {
      products.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'newest':
          default:
            return 0; // Keep original order
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'excerpt'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Missing required field: ${field}` 
          },
          { status: 400 }
        );
      }
    }

    // Set default values
    const productData = {
      name: body.name,
      price: Number(body.price),
      excerpt: body.excerpt,
      image: body.image || '',
      status: body.status || 'In Stock',
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'products'), productData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...productData },
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create product',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}