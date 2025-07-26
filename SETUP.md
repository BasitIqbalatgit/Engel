# SETUP.md

## Product Management System - Complete Setup Guide

### 📋 Prerequisites
Before you begin, ensure you have:
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** ([Download here](https://git-scm.com/))
- **Firebase account** ([Create here](https://firebase.google.com/))
- **Code editor** (VS Code recommended)

### 🚀 Step 1: Project Setup

#### 1.1 Create Next.js Project
```bash
# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest product-management-system --typescript --tailwind --eslint --app

cd product-management-system
```

#### 1.2 Install Required Dependencies
```bash
# UI Library - PrimeReact (complete ecosystem)
npm install primereact primeicons

# Form handling and validation
npm install react-hook-form @hookform/resolvers zod

# Firebase for backend
npm install firebase
```

### 🔥 Step 2: Firebase Setup (Detailed)

#### 2.1 Create Firebase Project
1. **Visit Firebase Console**: Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Create New Project**:
   - Click "Add project" or "Create a project"
   - Enter project name: `product-management-system`
   - Accept terms and click "Continue"
   - Choose whether to enable Google Analytics (optional for this project)
   - Click "Create project"
   - Wait for project creation to complete

#### 2.2 Enable Firestore Database
1. **Navigate to Firestore**:
   - In Firebase console, click "Firestore Database" in left sidebar
   - Click "Create database"
   
2. **Security Rules Setup**:
   - Choose "Start in test mode" (for development)
   - Select a location (choose closest to your users)
   - Click "Done"

3. **Configure Security Rules** (Important!):
   - In Firestore, go to "Rules" tab
   - Replace existing rules with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to products collection
       match /products/{document} {
         allow read, write: if true; // For development only
       }
     }
   }
   ```
   - Click "Publish"
   
   ⚠️ **Security Note**: These rules allow public access. In production, implement proper authentication.

#### 2.3 Get Firebase Configuration
1. **Add Web App**:
   - In Firebase console, click the gear icon (⚙️) → "Project settings"
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Enter app nickname: `product-management-web`
   - Don't check "Firebase Hosting" for now
   - Click "Register app"

2. **Copy Configuration**:
   - Copy the entire `firebaseConfig` object
   - Keep this tab open - you'll need these values next

### ⚙️ Step 3: Environment Configuration

#### 3.1 Create Environment File
Create `.env.local` file in your project root:

```bash
# In your project root directory
touch .env.local
```

#### 3.2 Add Firebase Environment Variables
Copy the following template and replace with your Firebase config values:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyExample123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-name.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-name
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-name.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 🎨 Step 4: Styling Setup

#### 4.1 Configure Tailwind CSS
Replace your `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're mixing Pages & App Router
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}" // Include PrimeReact if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
    },
  },
  plugins: [],
}
```

#### 4.2 Setup Global Styles
Replace your `app/globals.css` with:

```css
@import "tailwindcss";

@import 'primereact/resources/themes/lara-light-indigo/theme.css';

/* Prime icons*/
@import "primeicons/primeicons.css";

@custom-variant dark (&:where(.dark, .dark *));

.card {
  padding: 2em;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Utility classes */
.card-shadow {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
}
```

#### 4.3 Update Layout
Replace your `app/layout.tsx` with:

```typescript
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Management System",
  description: "A modern product management application built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
```

### 📁 Step 5: Create Project Structure

Create the following folder structure and files in your project root:

```bash
# Create directories (in project root)
mkdir -p components lib types

# Create TypeScript files
touch types/product.ts
touch lib/firebase.ts
touch components/ProductTable.tsx
touch components/ProductForm.tsx
touch components/AddProductModal.tsx
touch components/ViewProductModal.tsx
touch components/ConfirmationDialog.tsx
```

Your structure should look like:
```
project-root/
├── app/
│   ├── globals.css          # ✅ Updated with your working styles
│   ├── layout.tsx           # ✅ Clean layout without duplicates
│   └── page.tsx             # ⬅️ Will be updated with main app
├── components/              # ⬅️ Created (root level)
│   ├── ProductTable.tsx
│   ├── ProductForm.tsx
│   ├── AddProductModal.tsx
│   ├── ViewProductModal.tsx
│   └── ConfirmationDialog.tsx
├── lib/                     # ⬅️ Created
│   └── firebase.ts
├── types/                   # ⬅️ Created
│   └── product.ts
├── .env.local              # ⬅️ Your Firebase environment variables
├── tailwind.config.js      # ✅ Your working config
└── package.json
```

### 🔧 Step 6: Add Core Code Files

#### 6.1 Create Product Type Definition
Add to `types/product.ts`:

```typescript
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  status: "In Stock" | "Out of Stock";
  excerpt: string;
  isVisible: boolean;
};
```

#### 6.2 Setup Firebase Configuration
Add to `lib/firebase.ts`:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

### 📋 Step 7: Add Component Files

Copy the provided component code into respective files with **correct import paths**:

#### 7.1 Import Paths for Your Structure

**For `app/page.tsx`:**
```typescript
import { Product } from "@/types/product";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import ViewProductModal from "@/components/ViewProductModal";
import { db } from "@/lib/firebase";
```

**For components in `components/` folder:**
```typescript
import { Product } from "@/types/product";
import ConfirmationDialog from "./ConfirmationDialog";
```

#### 7.2 Copy All Component Files
```bash
# Copy the provided code for these components:
# - components/ProductTable.tsx (main table with filtering)
# - components/ProductForm.tsx (form with validation)  
# - components/AddProductModal.tsx (modal wrapper)
# - components/ViewProductModal.tsx (product details)
# - components/ConfirmationDialog.tsx (custom confirmation)
# - app/page.tsx (main page component)
```



### 🚀 Step 8: Run the Application

#### 8.1 Start Development Server
```bash
npm run dev
```

#### 8.2 Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
- ✅ The Product Management System interface
- ✅ "Add New" button in the header
- ✅ Empty product table with filters
- ✅ No console errors

### 🧪 Step 9: Test Your Setup

#### 9.1 Test Firebase Connection
1. **Add a Test Product**:
   - Click "Add New" button
   - Fill in the form:
     - Name: "Test Product"
     - Price: 29.99
     - Image URL: `https://via.placeholder.com/300x300/0066CC/FFFFFF?text=Test`
     - Status: "In Stock"
     - Description: "This is a test product"
     - Visibility: ✅ Checked
   - Click "Submit"

2. **Verify in Firebase Console**:
   - Go to Firebase Console → Firestore Database
   - You should see a `products` collection with your test product
   - ✅ Data should appear immediately in both the app and Firebase

#### 9.2 Test All Features
- ✅ **Create**: Add multiple products with different data
- ✅ **Read**: Products appear in the table immediately
- ✅ **Update**: Click edit button, modify data, save changes
- ✅ **Delete**: Click delete button, confirm deletion
- ✅ **Filter**: Test search, status filter, visibility filter, price range
- ✅ **View**: Click view button to see product details

### 🛠️ Troubleshooting Guide

#### Common Issues and Solutions

**Problem**: "Firebase: No Firebase App '[DEFAULT]' has been created"
```bash
# Solution: Check your .env.local file
# Ensure all variables start with NEXT_PUBLIC_
# Restart development server after changes
npm run dev
```

**Problem**: Import errors with components
```bash
# Solution: Verify import paths are relative
# From: import { Product } from "@/types/product";
# To: import { Product } from "../types/product";
```

**Problem**: PrimeReact styles not applying
```bash
# Solution: Verify globals.css imports in correct order
# Check that layout.tsx doesn't have duplicate PrimeReact imports
```

### ✅ Final Checklist

Before considering setup complete, verify:

- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm install` completed)
- [ ] Firebase project created and Firestore enabled
- [ ] Environment variables set in `.env.local`
- [ ] Folder structure created (`components/`, `lib/`, `types/`)
- [ ] All component files copied with correct import paths
- [ ] Development server starts without errors (`npm run dev`)
- [ ] Application loads at `http://localhost:3000`
- [ ] Can add, view, edit, and delete products
- [ ] Firebase console shows data updates
- [ ] All filters work (search, status, visibility, price)
- [ ] No console errors in browser DevTools

### 🎉 Success!

If all checklist items are complete, your Product Management System is ready! You now have a fully functional CRUD application with:

- ✨ Real-time data synchronization
- 🔍 Advanced filtering capabilities  
- 📱 Responsive design
- 🎨 Professional UI with PrimeReact
- 🔒 TypeScript type safety
- 🚀 Ready for production deployment

---
