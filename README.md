
# README.md

# Product Management System

A modern, responsive product management application built with Next.js, PrimeReact, and Firebase Firestore.

## Features

### ✨ Core Functionality
- **CRUD Operations**: Create, read, update, and delete products
- **Real-time Updates**: Live synchronization with Firebase Firestore
- **Advanced Filtering**: Filter by status, visibility, price range, and search
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Robust validation using Zod and React Hook Form

### 🎨 User Interface
- **Modern UI**: Clean, professional interface with PrimeReact components
- **Interactive Data Table**: Sortable columns, pagination, and row selection
- **Modal Dialogs**: Smooth modal experiences for forms and confirmations
- **Visual Feedback**: Loading states, error handling, and success indicators
- **Confirmation Dialogs**: Custom confirmation dialogs instead of browser alerts

### 🔍 Advanced Features
- **Multi-criteria Filtering**: Combine search, status, visibility, and price filters
- **Price Range Slider**: Interactive price filtering with visual feedback
- **Image Handling**: Graceful fallbacks for broken product images
- **Data Persistence**: All data stored securely in Firebase Firestore
- **Type Safety**: Full TypeScript implementation

## Technology Stack

### Frontend
- **Next.js 14**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **PrimeReact**: Comprehensive UI component library

### Backend & Database
- **Firebase Firestore**: NoSQL cloud database
- **Real-time Listeners**: Live data synchronization

### Form Management
- **React Hook Form**: Performant form handling
- **Zod**: Schema validation and type inference

## Architecture Approach

### 🏗️ Component Architecture
The application follows a modular component architecture:

```
ProductTable (Main Container)
├── Filter Panel (Collapsible)
├── Data Table (PrimeReact DataTable)
├── Action Buttons (View/Edit/Delete)
├── ConfirmationDialog (Custom Modal)
└── Pagination & Row Controls
```

### 📊 State Management
- **Local State**: React hooks (useState, useEffect) for component state
- **Real-time Data**: Firebase Firestore listeners for live updates
- **Form State**: React Hook Form for complex form management
- **Filter State**: Multiple filter states with clean reset functionality

### 🎯 Key Design Decisions

1. **Real-time Updates**: Chosen Firebase Firestore for instant data synchronization across users
2. **Component Modularity**: Separated concerns with dedicated components for forms, tables, and dialogs
3. **Custom Confirmation Dialog**: Replaced browser `window.confirm()` with branded, accessible modal
4. **Advanced Filtering**: Multi-criteria filtering with visual feedback and active filter counting
5. **Responsive Design**: Mobile-first approach ensuring usability across all devices
6. **Type Safety**: Full TypeScript implementation preventing runtime errors

### 🔄 Data Flow
1. **Create**: Form → Validation → Firebase → Real-time Update → UI Refresh
2. **Read**: Firebase Listener → State Update → Component Re-render
3. **Update**: Edit Form → Validation → Firebase Update → Real-time Sync
4. **Delete**: Confirmation Dialog → Firebase Delete → Real-time Removal

### 📱 Responsive Strategy
- **Mobile-first CSS**: Tailwind utilities with responsive breakpoints
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts  
- **Touch-friendly**: Appropriate button sizes and spacing for mobile interaction
- **Modal Optimization**: Full-screen modals on mobile devices

## Getting Started

See [SETUP.md](./SETUP.md) for detailed installation and configuration instructions.

## Project Structure

```
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles with PrimeReact theme
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # Reusable UI components
│   ├── ProductTable.tsx   # Main data table with filtering
│   ├── ProductForm.tsx    # Form component with validation
│   ├── AddProductModal.tsx # Modal wrapper for forms
│   ├── ViewProductModal.tsx # Product details modal
│   └── ConfirmationDialog.tsx # Custom confirmation dialog
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
├── types/                 # TypeScript type definitions
│   └── product.ts         # Product type definition
├── .env.local            # Environment variables (not in repo)
└── tailwind.config.js    # Tailwind CSS configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.