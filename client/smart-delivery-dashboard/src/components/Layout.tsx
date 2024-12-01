// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 hidden sm:block">
        <h2 className="text-2xl font-bold mb-6">Smart Delivery</h2>
        <nav>
          <ul>
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/partners" className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
                Partners
              </Link>
            </li>
            <li>
              <Link to="/orders" className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/assignments" className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
                Assignments
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
