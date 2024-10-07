// src/app/dashboard/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { useParticleAuth } from '../hooks/useParticleAuth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface DeployedModel {
  id: string;
  modelId: string;
  transactionHash: string;
  deployedAt: string;
  chain: string;
}

const POLL_INTERVAL = 10000; // Poll every 10 seconds

export default function Dashboard() {
  const { isLoggedIn, userAddress } = useParticleAuth();
  const [deployedModels, setDeployedModels] = useState<DeployedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeployedModels = async () => {
    if (!isLoggedIn || !userAddress) return;

    try {
      const response = await fetch(`/api/deployed-models?userId=${userAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch deployed models');
      }
      const data = await response.json();
      setDeployedModels(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeployedModels();
    const intervalId = setInterval(fetchDeployedModels, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isLoggedIn, userAddress]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-teal-300">Please login to view your dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-teal-300">Loading your deployed models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-300">Your Deployed Models</h1>
      {deployedModels.length === 0 ? (
        <p className="text-xl text-gray-300">You haven't deployed any models yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deployedModels.map((model) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-2 text-teal-300">Model ID: {model.modelId}</h2>
              <p className="text-sm text-gray-300 mb-2">Deployed: {new Date(model.deployedAt).toLocaleString()}</p>
              <p className="text-sm text-gray-300 mb-2">Chain: {model.chain}</p>
              <p className="text-sm text-gray-300 mb-4">
                Tx Hash: {model.transactionHash.slice(0, 10)}...
                <a
                  href={`https://etherscan.io/tx/${model.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-teal-400 hover:text-teal-300"
                >
                  <FaExternalLinkAlt className="inline" />
                </a>
              </p>
              <Link href={`/model/${model.modelId}`}>
                <span className="text-teal-400 hover:text-teal-300 transition-colors">View Model Details</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}