// src/app/api/model/all/route.ts

import { NextResponse } from 'next/server';

const aiModels = [
  {
    id: '1',
    name: 'NeuraSynth Pro',
    description: 'State-of-the-art language model with enhanced contextual understanding.',
    image: '/placeholder-image-1.jpg',
    price: '2.5',
    chain: 'Ethereum',
  },
  {
    id: '2',
    name: 'QuantumViz Elite',
    description: 'Advanced image generation powered by quantum-inspired algorithms.',
    image: '/placeholder-image-2.jpg',
    price: '3.2',
    chain: 'Polygon',
  },
  {
    id: '3',
    name: 'BioForge AI Suite',
    description: 'Comprehensive suite for protein folding and drug discovery.',
    image: '/placeholder-image-3.jpg',
    price: '4.7',
    chain: 'Solana',
  },
];

export async function GET() {
  return NextResponse.json(aiModels);
}