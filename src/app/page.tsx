"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FaBrain, FaChartLine, FaUsersCog, FaRobot, FaEthereum, FaGlobe } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnimatedSphere = () => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00a2ff"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const AIModel = ({ name, description, image, price, categories }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 shadow-xl"
  >
    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
      <Image src={image} alt={name} layout="fill" objectFit="cover" />
    </div>
    <h3 className="text-2xl font-bold mb-2 text-teal-300">{name}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category, index) => (
        <span key={index} className="bg-teal-700/50 text-teal-200 text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      ))}
    </div>
    <div className="flex justify-between items-center">
      <span className="text-teal-400 font-semibold">{price} ETH</span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
      >
        Deploy Model
      </motion.button>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl"
  >
    <div className="text-5xl text-teal-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-teal-300">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const TrendingModel = ({ name, price, change }) => (
  <div className="flex items-center justify-between py-2 border-b border-teal-500/20">
    <span className="text-teal-300">{name}</span>
    <div className="flex items-center">
      <span className="text-teal-400 mr-2">{price} ETH</span>
      <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
        {change >= 0 ? "+" : ""}{change}%
      </span>
    </div>
  </div>
);

const MarketChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
      <XAxis dataKey="name" stroke="#9edc8f" />
      <YAxis stroke="#9edc8f" />
      <Tooltip
        contentStyle={{ backgroundColor: '#1a202c', border: 'none' }}
        itemStyle={{ color: '#9edc8f' }}
      />
      <Line type="monotone" dataKey="value" stroke="#00a2ff" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const aiModels = [
    { id: '1', name: 'NeuraSynth Pro', description: 'State-of-the-art language model with enhanced contextual understanding', image: '/ai-model-1.jpg', price: '2.5', categories: ['NLP', 'Transformer'] },
    { id: '2', name: 'QuantumViz Elite', description: 'Advanced image generation powered by quantum-inspired algorithms', image: '/ai-model-2.jpg', price: '3.2', categories: ['Computer Vision', 'Quantum'] },
    { id: '3', name: 'BioForge AI Suite', description: 'Comprehensive suite for protein folding and drug discovery', image: '/ai-model-3.jpg', price: '4.7', categories: ['Bioinformatics', 'Drug Discovery'] },
    { id: '4', name: 'NeuroTrade Pro', description: 'AI-powered trading algorithm with real-time market analysis', image: '/ai-model-4.jpg', price: '5.1', categories: ['Finance', 'Time Series'] },
    { id: '5', name: 'EcoSense AI', description: 'Environmental monitoring and prediction system using satellite data', image: '/ai-model-5.jpg', price: '3.8', categories: ['Climate', 'Satellite Imaging'] },
    { id: '6', name: 'CyberGuard AI', description: 'Advanced cybersecurity threat detection and prevention system', image: '/ai-model-6.jpg', price: '4.3', categories: ['Cybersecurity', 'Anomaly Detection'] },
  ];

  const trendingModels = [
    { name: 'NeuraSynth Pro', price: '2.5', change: 5.2 },
    { name: 'QuantumViz Elite', price: '3.2', change: -1.8 },
    { name: 'BioForge AI Suite', price: '4.7', change: 3.6 },
    { name: 'NeuroTrade Pro', price: '5.1', change: 7.2 },
    { name: 'EcoSense AI', price: '3.8', change: -0.5 },
  ];

  const marketData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Canvas>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
        </Canvas>
      </div>

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
          <p className="text-xl text-teal-300">Elevating Intelligence, Empowering Innovation for the Chain Abstraction Hackathon</p>
        </motion.header>

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
            <FeatureCard
              icon={<FaRobot />}
              title="AI Model Integration"
              description="Seamlessly integrate AI models into your blockchain applications."
            />
            <FeatureCard
              icon={<FaEthereum />}
              title="Decentralized Marketplace"
              description="Trade AI models securely using blockchain technology and smart contracts."
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Global AI Community"
              description="Connect with AI experts and enthusiasts from around the world."
            />
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-300">Trending Models</h2>
            {trendingModels.map((model, index) => (
              <TrendingModel key={index} {...model} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 backdrop-blur-lg rounded-lg p-6 border border-teal-500/20 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-teal-300">Market Overview</h2>
            <MarketChart data={marketData} />
          </motion.div>
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

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-teal-300">Join the Chain Abstraction Hackathon</h2>
          <p className="text-xl text-gray-300 mb-8">Showcase your AI models, collaborate with developers, and push the boundaries of blockchain and AI integration.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg"        >
            Register Now
          </motion.button>
        </section>
      </motion.div>
    </div>
  );
}