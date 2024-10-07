// src/hooks/useParticleAuth.ts

'use client';

import { useState, useEffect } from 'react';
import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';

const particleNetwork = new ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
  chainName: 'ethereum',
  chainId: 1,
});

export function useParticleAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    console.log("Checking login status...");
    const user = await particleNetwork.auth.isLoginAsync();
    console.log("User logged in:", !!user);
    setIsLoggedIn(!!user);
    if (user) {
      const address = await getAddress();
      setUserAddress(address);
    }
  };

  const login = async () => {
    console.log("Attempting to login...");
    try {
      await particleNetwork.auth.login();
      console.log("Login successful");
      setIsLoggedIn(true);
      const address = await getAddress();
      setUserAddress(address);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    console.log("Attempting to logout...");
    try {
      await particleNetwork.auth.logout();
      console.log("Logout successful");
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
      const address = await signer.getAddress();
      console.log("Got address:", address);
      return address;
    } catch (error) {
      console.error('Failed to get address:', error);
      return null;
    }
  };

  return { isLoggedIn, userAddress, login, logout };
}