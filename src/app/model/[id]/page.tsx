// src/app/model/[id]/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChip, FaCode, FaServer } from 'react-icons/fa';
import Image from 'next/image';

interface AIModelDetailsProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  performance: string;
  compatibility: string[];
  creator: string;
}

const AIModelDetails: React.FC<AIModelDetailsProps> = ({
  id,
  name,
  description,
  image,
  price,
  performance,
  compatibility,
  creator,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-8 border border-teal-500/20 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-64 rounded-lg overflow-hidden"
          >
            <Image src={image} alt={name} layout="fill" objectFit="cover" />
          </motion.div>
        </div>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold mb-4 text-teal-300"
          >
            {name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 mb-4"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <p className="text-teal-400 font-semibold">Price: {price} ETH</p>
            <p className="text-teal-400 font-semibold">Performance: {performance}</p>
            <p className="text-teal-400 font-semibold">Creator: {creator}</p>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-semibold mb-4 text-teal-300">Compatibility</h3>
        <div className="flex flex-wrap gap-4">
          {compatibility.map((item, index) => (
            <span
              key={index}
              className="bg-teal-800 text-teal-200 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex items-center bg-blue-900/30 p-4 rounded-lg">
          <FaChip className="text-3xl text-teal-400 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-teal-300">Advanced Architecture</h4>
            <p className="text-sm text-gray-300">Cutting-edge neural network design</p>
          </div>
        </div>
        <div className="flex items-center bg-blue-900/30 p-4 rounded-lg">
          <FaCode className="text-3xl text-teal-400 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-teal-300">Easy Integration</h4>
            <p className="text-sm text-gray-300">Simple API for seamless deployment</p>
          </div>
        </div>
        <div className="flex items-center bg-blue-900/30 p-4 rounded-lg">
          <FaServer className="text-3xl text-teal-400 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-teal-300">Scalable Infrastructure</h4>
            <p className="text-sm text-gray-300">Built for high-performance computing</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
          Deploy Model
        </button>
      </motion.div>
    </div>
  );
};

export default function ModelPage() {
  const params = useParams();
  const modelId = params.id as string;
  const [model, setModel] = useState<AIModelDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`/api/models?id=${modelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch model details');
        }
        const data = await response.json();
        setModel(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-teal-300">Loading model details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-teal-300">Model not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8">
      <div className="container mx-auto">
        <AIModelDetails {...model} />
      </div>
    </div>
  );
}
