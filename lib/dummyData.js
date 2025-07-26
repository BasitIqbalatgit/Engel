// lib/addDummyProducts.js
// Run this script to add 15 dummy products to your Firestore database
// First add "type": "module" to your package.json
// Then run: node lib/addDummyProducts.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Dummy products data with various combinations
const dummyProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    isVisible: true
  },
  {
    name: "Smart Fitness Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    status: "Out of Stock",
    excerpt: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration. Track your health goals effectively.",
    isVisible: true
  },
  {
    name: "Organic Coffee Beans - Premium Blend",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Ethically sourced organic coffee beans with rich, smooth flavor. Perfect for morning brewing and coffee enthusiasts.",
    isVisible: false
  },
  {
    name: "Minimalist Desk Lamp",
    price: 45.50,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782b?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Modern LED desk lamp with adjustable brightness and USB charging port. Ideal for home office and study spaces.",
    isVisible: true
  },
  {
    name: "Vintage Leather Backpack",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    status: "Out of Stock",
    excerpt: "Handcrafted genuine leather backpack with multiple compartments. Durable and stylish for everyday use and travel.",
    isVisible: false
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Insulated stainless steel bottle keeps drinks cold for 24hrs or hot for 12hrs. Eco-friendly and BPA-free design.",
    isVisible: true
  },
  {
    name: "Wireless Phone Charger",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    isVisible: true
  },
  {
    name: "Indoor Plant - Snake Plant",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
    status: "Out of Stock",
    excerpt: "Low-maintenance indoor plant that purifies air and thrives in low light. Perfect for beginners and busy lifestyles.",
    isVisible: true
  },
  {
    name: "Bluetooth Portable Speaker",
    price: 67.50,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Compact portable speaker with 360-degree sound and waterproof design. Great for outdoor adventures and parties.",
    isVisible: false
  },
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Adjustable ergonomic chair with lumbar support and breathable mesh. Designed for long hours of comfortable work.",
    isVisible: true
  },
  {
    name: "Smart Home Security Camera",
    price: 159.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    status: "Out of Stock",
    excerpt: "1080p HD security camera with night vision and motion detection. Monitor your home remotely via smartphone app.",
    isVisible: false
  },
  {
    name: "Artisan Handmade Candle Set",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1602874801006-22c8c2dd3174?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "Set of 3 soy wax candles with natural fragrances. Hand-poured with cotton wicks for clean burning and relaxation.",
    isVisible: true
  },
  {
    name: "Professional Kitchen Knife Set",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "High-carbon stainless steel knife set with wooden block. Essential tools for professional cooking and food preparation.",
    isVisible: true
  },
  {
    name: "Yoga Mat with Alignment Lines",
    price: 41.25,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    status: "Out of Stock",
    excerpt: "Non-slip yoga mat with alignment guides and extra cushioning. Made from eco-friendly materials for sustainable practice.",
    isVisible: false
  },
  {
    name: "Digital Photo Frame",
    price: 112.50,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    status: "In Stock",
    excerpt: "10-inch WiFi digital frame with cloud storage and remote sharing. Display your favorite memories in high resolution.",
    isVisible: true
  }
];

// Function to add all dummy products
async function addDummyProducts() {
  console.log('🚀 Starting to add dummy products...');
  
  // Check if Firebase config is loaded
  if (!firebaseConfig.projectId) {
    console.error('❌ Firebase configuration not loaded. Make sure your .env.local file exists and contains the Firebase config variables.');
    return;
  }
  
  console.log(`🔥 Connected to Firebase project: ${firebaseConfig.projectId}`);
  
  try {
    const promises = dummyProducts.map(async (product, index) => {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`✅ Product ${index + 1}/15 added with ID: ${docRef.id} - ${product.name}`);
      return docRef;
    });

    await Promise.all(promises);
    console.log('\n🎉 Successfully added all 15 dummy products!');
    console.log('\n📊 Product breakdown:');
    console.log(`📦 In Stock: ${dummyProducts.filter(p => p.status === 'In Stock').length} products`);
    console.log(`❌ Out of Stock: ${dummyProducts.filter(p => p.status === 'Out of Stock').length} products`);
    console.log(`👁️  Visible: ${dummyProducts.filter(p => p.isVisible).length} products`);
    console.log(`🙈 Hidden: ${dummyProducts.filter(p => !p.isVisible).length} products`);
    console.log(`💰 Price range: $${Math.min(...dummyProducts.map(p => p.price))} - $${Math.max(...dummyProducts.map(p => p.price))}`);
    
    console.log('\n✨ You can now test your ProductTable with these products!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error adding products:', error);
    console.error('Make sure your Firebase project is set up correctly and you have write permissions.');
    process.exit(1);
  }
}

// Run the function
addDummyProducts();