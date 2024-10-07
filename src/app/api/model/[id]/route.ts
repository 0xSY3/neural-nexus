// src/api/model/route.ts

import { NextResponse } from 'next/server';

const aiModels = [
  {
    id: '1',
    name: 'NeuraSynth Pro',
    description: 'State-of-the-art language model with enhanced contextual understanding and multilingual capabilities.',
    image: '/ai-model-1.jpg',
    price: '2.5',
    performance: 'Top 1% in language tasks',
    compatibility: ['Python', 'JavaScript', 'Java', 'C++'],
    creator: 'AI Research Labs'
  },
  {
    id: '2',
    name: 'QuantumViz Elite',
    description: 'Advanced image generation and processing model powered by quantum-inspired algorithms.',
    image: '/ai-model-2.jpg',
    price: '3.2',
    performance: '4x faster than traditional models',
    compatibility: ['Python', 'CUDA', 'TensorFlow', 'PyTorch'],
    creator: 'Quantum AI Solutions'
  },
  {
    id: '3',
    name: 'BioForge AI Suite',
    description: 'Comprehensive suite for protein folding, drug discovery, and genetic analysis.',
    image: '/ai-model-3.jpg',
    price: '4.7',
    performance: '99.7% accuracy in protein structure prediction',
    compatibility: ['Python', 'R', 'Julia', 'MATLAB'],
    creator: 'BioTech Innovations'
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id === 'all') {
    return NextResponse.json(aiModels);
  }

  const model = aiModels.find(m => m.id === id);
  if (model) {
    return NextResponse.json(model);
  } else {
    return NextResponse.json({ error: 'Model not found' }, { status: 404 });
  }
}