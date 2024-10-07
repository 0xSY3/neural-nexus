// src/hooks/useParticleAuth.ts

'use client';

import { useState, useEffect } from 'react';
import { ParticleNetwork, ParticleProvider } from '@particle-network/auth';
import { WalletEntryPosition } from '@particle-network/auth';

const particleNetwork = new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
  chainName: 'ethereum',
  chainId: 1,
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: WalletEntryPosition.BR,
    supportChains: [
      { id: 1, name: 'Ethereum' },
      { id: 137, name: 'Polygon' },
      { id: 56, name: 'Binance Smart Chain' },
    ],
  },
});

export const useParticleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number>(1);

  useEffect(() => {
    checkLoginStatus();
    
    const handleAuthChange = (account: string | null) => {
      if (account) {
        setIsLoggedIn(true);
        getAddress().then(setUserAddress);
      } else {
        setIsLoggedIn(false);
        setUserAddress(null);
      }
    };

    particleNetwork.auth.on('authStateChanged', handleAuthChange);

    return () => {
      particleNetwork.auth.off('authStateChanged', handleAuthChange);
    };
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
      await checkLoginStatus();
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
      const provider = new ParticleProvider(particleNetwork.auth);
      const accounts = await provider.request({ method: 'eth_accounts' });
      return accounts[0] || null;
    } catch (error) {
      console.error('Failed to get address:', error);
      return null;
    }
  };

  const switchChain = async (newChainId: number) => {
    try {
      await particleNetwork.switchChain(newChainId);
      setChainId(newChainId);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  return { isLoggedIn, userAddress, chainId, login, logout, switchChain };
};