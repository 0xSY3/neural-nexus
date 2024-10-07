// src/pages/marketplace.tsx

import React from 'react';
import { useParticleAuth } from '../hooks/useParticleAuth';
import MarketplaceGrid from '../components/MarketplaceGrid';

const MarketplacePage: React.FC = () => {
  const { isLoggedIn } = useParticleAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-300">AI Marketplace</h1>
        {isLoggedIn ? (
          <MarketplaceGrid />
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">Connect your wallet to access the marketplace.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketplacePage;