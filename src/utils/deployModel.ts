
import { ethers } from 'ethers';
import { ParticleProvider } from '@particle-network/provider';

const deploymentABI = [
  "function deployModel(string memory modelId, uint256 price) public payable returns (address)"
];

const DEPLOYMENT_CONTRACT_ADDRESS = "0x...";
export async function deployModel(
  particleProvider: ParticleProvider,
  modelId: string,
  price: string
) {
  try {
    const provider = new ethers.providers.Web3Provider(particleProvider as any);
    const signer = provider.getSigner();
    
    const deploymentContract = new ethers.Contract(DEPLOYMENT_CONTRACT_ADDRESS, deploymentABI, signer);
    
    const tx = await deploymentContract.deployModel(modelId, ethers.utils.parseEther(price), {
      value: ethers.utils.parseEther(price)
    });
    
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.transactionHash,
      deployedAddress: receipt.events[0].args.deployedAddress 
    };
  } catch (error) {
    console.error("Deployment failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
}