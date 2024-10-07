import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ethers } from 'ethers';
import { particle, particleProvider } from '../utils/particle';
import { MockOracle } from '../utils/mockOracle';
import * as mockKlaster from '../utils/mockKlaster';

interface AIModel {
  id: string;
  name: string;
  description: string;
  chain: string;
  price: string;
}

const AIModelMarketplace: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const mockOracle = new MockOracle();

  const { data: marketData } = useQuery('marketData', async () => {
    return await mockOracle.getCustomFeed('ai-model-market-data');
  });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await particle.auth.isLoginAsync();
        if (user) {
          const userAddress = await particleProvider.request({ method: 'eth_accounts' });
          if (Array.isArray(userAddress) && userAddress.length > 0) {
            setAddress(userAddress[0]);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthError("Failed to check authentication status. Using placeholder credentials.");
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchAIModels = async () => {
      const mockModels: AIModel[] = [
        { id: '1', name: 'GPT-4 Replica', description: 'Language model', chain: 'Ethereum', price: '0.1' },
        { id: '2', name: 'DALL-E Clone', description: 'Image generation', chain: 'Polygon', price: '0.05' },
        { id: '3', name: 'AlphaFold Variant', description: 'Protein folding', chain: 'Solana', price: '0.2' },
      ];
      setAiModels(mockModels);
    };
    fetchAIModels();
  }, []);

  const handleLogin = async () => {
    try {
      await particle.auth.login();
      const userAddress = await particleProvider.request({ method: 'eth_accounts' });
      if (Array.isArray(userAddress) && userAddress.length > 0) {
        setAddress(userAddress[0]);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError("Login failed. Using placeholder credentials.");
      // Simulate successful login with a placeholder address
      setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    }
  };

  const handleLogout = async () => {
    try {
      await particle.auth.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setAddress(null);
    setAuthError(null);
  };

  const handleModelSelection = async (modelId: string) => {
    setSelectedModel(modelId);
    if (!address) return;

    try {
      const selectedAIModel = aiModels.find(model => model.id === modelId);
      if (!selectedAIModel) throw new Error('Model not found');

      // Simulate cross-chain model execution
      console.log(`Executing model ${modelId} on ${selectedAIModel.chain}`);

      // Use mock Klaster to optimize and explain the model usage
      const optimizedExecution = await mockKlaster.optimizeModelExecution(modelId, { sampleInput: 'data' });
      const explanation = await mockKlaster.explainAIModelUsage(modelId, { sampleInput: 'data' });

      // Simulate transaction
      const tx = {
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Example address
        value: ethers.utils.parseEther(selectedAIModel.price),
        data: '0x', // Placeholder
      };
      const simplifiedTx = await mockKlaster.simplifyTransaction(tx);

      console.log('Optimized execution:', optimizedExecution);
      console.log('Usage explanation:', explanation);
      console.log('Simplified transaction:', simplifiedTx);

      alert(`AI Model execution simulated. Check console for details.`);
    } catch (error) {
      console.error('Model execution error:', error);
      alert('An error occurred during model execution. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NeuralNexus AI Marketplace</h1>
      {authError && <p className="text-red-500 mb-4">{authError}</p>}
      {address ? (
        <>
          <p>Connected Address: {address}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mt-2">Logout</button>
          <h2 className="text-xl font-semibold mt-4 mb-2">Available AI Models:</h2>
          <ul>
            {aiModels.map(model => (
              <li key={model.id} className="mb-2">
                <button
                  onClick={() => handleModelSelection(model.id)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  {model.name} ({model.chain}) - {model.price} ETH
                </button>
                <span>{model.description}</span>
              </li>
            ))}
          </ul>
          {marketData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Market Data:</h3>
              <p>Total Models: {marketData.totalModels}</p>
              <p>24h Volume: {marketData.volume24h} ETH</p>
            </div>
          )}
        </>
      ) : (
        <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">Login with Particle</button>
      )}
    </div>
  );
};

export default AIModelMarketplace;