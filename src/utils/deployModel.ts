// src/utils/deployModel.ts

import { ethers } from 'ethers';
import { ParticleProvider } from '@particle-network/provider';

const mockDeploymentABI = [
  "function deployModel(string modelId, uint256 price) public payable returns (bool)"
];

const MOCK_DEPLOYMENT_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";
export async function deployModel(
  particleProvider: ParticleProvider,
  modelId: string,
  price: string,
  chain: string
) {
  try {
    const provider = new ethers.providers.Web3Provider(particleProvider as any);
    const signer = provider.getSigner();
    
    const deploymentContract = new ethers.Contract(MOCK_DEPLOYMENT_CONTRACT_ADDRESS, mockDeploymentABI, signer);
    
    const priceInWei = ethers.utils.parseEther(price);
    
    const tx = await deploymentContract.deployModel(modelId, priceInWei, {
      value: priceInWei
    });
    
    const receipt = await tx.wait();

    // Save the deployed model info
    const userAddress = await signer.getAddress();
    const saveResponse = await fetch('/api/deployed-models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelId,
        userId: userAddress,
        transactionHash: receipt.transactionHash,
        chain,
      }),
    });

    if (!saveResponse.ok) {
      throw new Error('Failed to save deployed model info');
    }

    return {
      success: true,
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    console.error("Deployment failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
}