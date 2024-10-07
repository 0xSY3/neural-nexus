// src/components/Navigation.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useParticleAuth } from '../hooks/useParticleAuth';

const Navigation: React.FC = () => {
  const { isLoggedIn, userAddress, login, logout } = useParticleAuth();

  const handleLogin = async () => {
    console.log("Login button clicked");
    await login();
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    await logout();
  };

  return (
    <nav className="bg-blue-900/50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-teal-300">NeuralNexus</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="text-teal-300 hover:text-teal-100">Home</span>
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard">
              <span className="text-teal-300 hover:text-teal-100">Dashboard</span>
            </Link>
          )}
          {isLoggedIn ? (
            <div>
              <span className="text-teal-300 mr-2">Address: {userAddress}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;