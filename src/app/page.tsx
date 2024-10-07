
'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParticleAuth } from '../hooks/useParticleAuth';
import { useParticleProvider } from '../hooks/useParticleProvider';
import { FaBrain, FaChartLine, FaUsersCog } from 'react-icons/fa';

const fetchSEDAData = async () => {
  return {
    totalModels: Math.floor(Math.random() * 1000) + 1000,
    totalValue: (Math.random() * 1000 + 500).toFixed(2),
  };
};

interface AIModel {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  chain: string;
}

const AIModelCard: React.FC<AIModel> = ({ id, name, description, image, price, chain }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 shadow-xl"
  >
    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
      <Image src={image} alt={name} layout="fill" objectFit="cover" />
    </div>
    <h3 className="text-2xl font-bold mb-2 text-teal-300">{name}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <span className="text-teal-400 font-semibold">{price} ETH</span>
      <span className="text-teal-400 font-semibold">Chain: {chain}</span>
    </div>
    <Link href={`/model/${id}`}>
      <button className="mt-4 w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
        View Details
      </button>
    </Link>
  </motion.div>
);

export default function Home() {
  const { isLoggedIn, userAddress, login, logout } = useParticleAuth();
  const { particleProvider } = useParticleProvider();
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [sedaData, setSedaData] = useState({ totalModels: 0, totalValue: '0' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsResponse = await fetch('/api/model/all');
        const modelsData = await modelsResponse.json();
        setAiModels(modelsData);

        const sedaData = await fetchSEDAData();
        setSedaData(sedaData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white flex items-center justify-center">
      <p className="text-2xl text-teal-300">Loading...</p>
    </div>;
  }

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
          <h2 className="text-3xl font-semibold mb-8 text-center text-teal-300">Featured AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiModels.map((model) => (
              <AIModelCard key={model.id} {...model} />
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
              <h3 className="text-xl font-semibold mb-2 text-teal-300 text-center">Real-Time Market Data</h3>
              <p className="text-gray-300 text-center">Powered by SEDA Oracle for up-to-date market insights.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl">
              <FaUsersCog className="text-5xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-teal-300 text-center">Seamless Integration</h3>
              <p className="text-gray-300 text-center">Easy-to-use APIs for quick deployment and integration.</p>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-8 border border-teal-500/20 shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-teal-300">Market Insights (Powered by SEDA Oracle)</h2>
          <div className="flex justify-center space-x-12">
            <div>
              <p className="text-4xl font-bold text-teal-400">{sedaData.totalModels}</p>
              <p className="text-gray-300">Total Models</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-400">{sedaData.totalValue} ETH</p>
              <p className="text-gray-300">Total Value Locked</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-teal-300">
        <p>© 2024 NeuralNexus AI Marketplace. Powered by Particle Network and SEDA Oracle.</p>
      </footer>
    </div>
  );
}