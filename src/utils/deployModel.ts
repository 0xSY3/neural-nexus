// src/utils/deployModel.ts

import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';

export async function deployModel(
  particleProvider: ParticleProvider,
  modelId: string,
  price: string,
  chain: string
) {
  try {
    const provider = new ethers.providers.Web3Provider(particleProvider as any);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const simulatedTxHash = ethers.utils.id(`${modelId}-${userAddress}-${Date.now()}`);

    const saveResponse = await fetch('/api/deployed-models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelId,
        userId: userAddress,
        transactionHash: simulatedTxHash,
        chain,
        price,
      }),
    });

    if (!saveResponse.ok) {
      throw new Error('Failed to save deployed model info');
    }

    return {
      success: true,
      transactionHash: simulatedTxHash
    };
  } catch (error) {
    console.error("Deployment failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
}