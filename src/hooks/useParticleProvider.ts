import { useState, useEffect } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';

const particleNetwork = new ParticleNetwork({
    appId: 'your-app-id', 
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
    chainName: 'ethereum',
    chainId: 1, 
});

export function useParticleProvider() {
  const [particleProvider, setParticleProvider] = useState<ParticleProvider | null>(null);

  useEffect(() => {
    const provider = new ParticleProvider(particleNetwork.auth);
    setParticleProvider(provider);
  }, []);

  return { particleProvider };
}