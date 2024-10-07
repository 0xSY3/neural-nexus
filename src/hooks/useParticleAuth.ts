// src/hooks/useParticleAuth.ts

import { useState, useEffect } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';

const particleNetwork = new ParticleNetwork({
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
    chainName: 'ethereum',
    chainId: 1, 
    appId: '', 
  });

export function useParticleAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const user = await particleNetwork.auth.isLoginAsync();
    setIsLoggedIn(!!user);
    if (user) {
      const address = await getAddress();
      setUserAddress(address);
    }
  };

  const login = async () => {
    try {
      await particleNetwork.auth.login();
      setIsLoggedIn(true);
      const address = await getAddress();
      setUserAddress(address);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await particleNetwork.auth.logout();
      setIsLoggedIn(false);
      setUserAddress(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getAddress = async (): Promise<string | null> => {
    try {
      const particleProvider = new ParticleProvider(particleNetwork.auth);
      const provider = new ethers.providers.Web3Provider(particleProvider as any);
      const signer = provider.getSigner();
      return await signer.getAddress();
    } catch (error) {
      console.error('Failed to get address:', error);
      return null;
    }
  };

  return { isLoggedIn, userAddress, login, logout };
}