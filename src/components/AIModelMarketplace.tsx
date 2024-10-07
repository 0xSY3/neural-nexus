'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FaBrain, FaChartLine, FaUsersCog } from 'react-icons/fa';
import { useParticleAuth } from '../hooks/useParticleAuth';



const AIModel = ({ id, name, description, image, price }) => (
    <motion.div
      className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-teal-300">{name}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-teal-400 font-semibold">{price} ETH</span>
        <Link href={`/model/${id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const { isLoggedIn, userAddress, login, logout } = useParticleAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const aiModels = [
    { id: '1', name: 'NeuraSynth Pro', description: 'State-of-the-art language model with enhanced contextual understanding', image: '/ai-model-1.jpg', price: '2.5' },
    { id: '2', name: 'QuantumViz Elite', description: 'Advanced image generation powered by quantum-inspired algorithms', image: '/ai-model-2.jpg', price: '3.2' },
    { id: '3', name: 'BioForge AI Suite', description: 'Comprehensive suite for protein folding and drug discovery', image: '/ai-model-3.jpg', price: '4.7' },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">

      <motion.div
        className="container mx-auto px-4 py-16 relative z-10"
        style={{ scale: scaleProgress }}
      >
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
            NeuralNexus AI Marketplace
          </h1>
          <p className="text-xl text-teal-300">Elevating Intelligence, Empowering Innovation</p>
          {isLoggedIn ? (
            <div className="mt-4">
              <p className="text-teal-300">Welcome, {userAddress}</p>
              <button
                onClick={logout}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="mt-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Connect Wallet
            </button>
          )}
        </motion.header>

        {isLoggedIn && (
          <>
            <>
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 text-center text-teal-300">Premium AI Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiModels.map((model) => (
                <AIModel key={model.id} {...model} />
              ))}
            </div>
          </section>

            <section className="mb-20">
              <h2 className="text-3xl font-semibold mb-8 text-center text-teal-300">Marketplace Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<FaBrain />}
                  title="Cutting-Edge AI"
                  description="Access the most advanced AI models from leading researchers and institutions."
                />
                <FeatureCard
                  icon={<FaChartLine />}
                  title="Real-time Analytics"
                  description="Monitor your AI models' performance with advanced, real-time analytics."
                />
                <FeatureCard
                  icon={<FaUsersCog />}
                  title="Collaborative Development"
                  description="Join a thriving ecosystem of AI developers, researchers, and enthusiasts."
                />
              </div>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-gradient-to-r from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-8 border border-teal-500/20 shadow-xl"
            >
              <h2 className="text-3xl font-semibold mb-4 text-teal-300">Market Insights</h2>
              <div className="flex justify-center space-x-12">
                <div>
                  <p className="text-4xl font-bold text-teal-400">2,845</p>
                  <p className="text-gray-300">Total Models</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">152.7 ETH</p>
                  <p className="text-gray-300">24h Volume</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal-400">12,423</p>
                  <p className="text-gray-300">Active Users</p>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </motion.div>

      <footer className="text-center py-8 text-teal-300 bg-black/20">
        <p>© 2024 NeuralNexus AI Marketplace. Pioneering the Future of Artificial Intelligence.</p>
      </footer>
    </div>
  ); 
}   
