"use client"
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Choose Your Role
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Admin Bubble */}
          <Link href="/admin" className="group">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl cursor-pointer">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">⚙️</div>
                  <div className="text-xl font-semibold">Admin</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Customer Bubble */}
          <Link href="/customer" className="group">
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl cursor-pointer">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="text-xl font-semibold">Customer</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>

        <p className="text-gray-600 mt-8 text-lg">
          Select your role to continue
        </p>
      </div>
    </div>
  )
}

export default page