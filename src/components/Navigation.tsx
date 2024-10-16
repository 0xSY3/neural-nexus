// src/components/Navigation.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { useParticleAuth } from '../hooks/useParticleAuth';

const Navigation: React.FC = () => {
  const { isLoggedIn, userAddress, chainId, login, logout, switchChain } = useParticleAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-teal-300">NeuralNexus</span>
        </Link>
        <div className="space-x-4">
          <Link href="/marketplace">
            <span className="text-teal-300 hover:text-teal-100">Marketplace</span>
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/sell">
                <span className="text-teal-300 hover:text-teal-100">Sell</span>
              </Link>
              <Link href="/dashboard">
                <span className="text-teal-300 hover:text-teal-100">Dashboard</span>
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <div className="inline-block">
              <span className="text-teal-300 mr-2">
                {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
              </span>
              <select
                value={chainId}
                onChange={(e) => switchChain(Number(e.target.value))}
                className="bg-transparent text-teal-300 border border-teal-300 rounded px-2 py-1"
              >
                <option value={1}>Ethereum</option>
                <option value={137}>Polygon</option>
                <option value={56}>BSC</option>
              </select>
              <button
                onClick={logout}
                className="ml-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={login}
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