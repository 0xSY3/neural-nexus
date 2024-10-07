// src/components/MarketplaceGrid.tsx

import React from 'react';
import AIModelCard from './AIModelCard';
import APICard from './APICard';
import AgentCard from './AgentCard';

const mockData = {
  aiModels: [
    { id: '1', name: 'GPT-4 Clone', description: 'Advanced language model', price: '10', chain: 'Ethereum' },
    { id: '2', name: 'Image Generator', description: 'Create stunning images', price: '5', chain: 'Polygon' },
  ],
  apis: [
    { id: '1', name: 'Weather API', description: 'Real-time weather data', price: '1', chain: 'Ethereum' },
    { id: '2', name: 'Stock Market API', description: 'Live stock market data', price: '2', chain: 'BSC' },
  ],
  agents: [
    { id: '1', name: 'Trading Bot', description: 'Automated crypto trading', price: '20', chain: 'Ethereum' },
    { id: '2', name: 'Customer Support AI', description: '24/7 AI customer support', price: '15', chain: 'Polygon' },
  ],
};

const MarketplaceGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-teal-300">AI Models</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockData.aiModels.map((model) => (
          <AIModelCard key={model.id} {...model} />
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6 text-teal-300">APIs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockData.apis.map((api) => (
          <APICard key={api.id} {...api} />
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6 text-teal-300">AI Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.agents.map((agent) => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceGrid;