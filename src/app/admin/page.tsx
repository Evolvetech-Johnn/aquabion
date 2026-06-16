'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">
        This is a placeholder admin page. Update with actual admin functionality.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Return Home
      </Link>
    </div>
  );
}
