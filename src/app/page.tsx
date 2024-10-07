// src/app/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParticleAuth } from '../hooks/useParticleAuth';
import { FaBrain, FaChartLine, FaUsersCog } from 'react-icons/fa';

interface AIModel {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
}

export default function Home() {
  const { isLoggedIn, userAddress, login, logout } = useParticleAuth();
  const [aiModels, setAiModels] = useState<AIModel[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch('/api/models');
      const data = await response.json();
      setAiModels(data);
    };
    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
          NeuralNexus AI Marketplace
        </h1>
        <p className="text-xl text-teal-300 mb-6">Empowering Innovation Across Chains</p>
        {isLoggedIn ? (
          <div>
            <p className="text-teal-300 mb-2">Connected: {userAddress}</p>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-all duration-300"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            Connect with Particle Network
          </button>
        )}
      </header>

      <main>
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-teal-300">Available AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiModels.map((model) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl"
              >
                <h3 className="text-2xl font-bold mb-2 text-teal-300">{model.name}</h3>
                <p className="text-gray-300 mb-4">{model.description}</p>
                <p className="text-teal-400 font-semibold mb-4">Price: {model.price} ETH</p>
                <Link href={`/model/${model.id}`}>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-teal-300">Why Choose NeuralNexus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl">
              <FaBrain className="text-5xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-teal-300 text-center">Cross-Chain Compatibility</h3>
              <p className="text-gray-300 text-center">Deploy and use AI models across multiple blockchain networks.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl">
              <FaChartLine className="text-5xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-teal-300 text-center">Real-Time Analytics</h3>
              <p className="text-gray-300 text-center">Monitor your AI models' performance with advanced analytics.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl">
              <FaUsersCog className="text-5xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-teal-300 text-center">Seamless Integration</h3>
              <p className="text-gray-300 text-center">Easy-to-use APIs for quick deployment and integration.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-teal-300">
        <p>© 2024 NeuralNexus AI Marketplace. Powered by Particle Network.</p>
      </footer>
    </div>
  );
}