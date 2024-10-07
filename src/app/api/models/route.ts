// src/app/api/models/route.ts

import { NextResponse } from 'next/server';

const aiModels = [
  {
    id: '1',
    name: 'NeuraSynth Pro',
    description: 'Advanced language model with enhanced contextual understanding.',
    image: '/images/model1.jpg',
    price: '2.5',
  },
  {
    id: '2',
    name: 'QuantumViz Elite',
    description: 'State-of-the-art image generation and processing model.',
    image: '/images/model2.jpg',
    price: '3.2',
  },
  {
    id: '3',
    name: 'BioForge AI Suite',
    description: 'Comprehensive AI suite for protein folding and drug discovery.',
    image: '/images/model3.jpg',
    price: '4.7',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const model = aiModels.find(m => m.id === id);
    return model 
      ? NextResponse.json(model)
      : NextResponse.json({ error: 'Model not found' }, { status: 404 });
  }

  return NextResponse.json(aiModels);
}