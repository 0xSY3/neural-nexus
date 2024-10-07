// src/app/api/deployed-models/route.ts

import { NextResponse } from 'next/server';

let deployedModels = [
  { id: '1', modelId: '2', userId: 'user1', transactionHash: '0x123...', deployedAt: new Date().toISOString(), chain: 'Ethereum' },
  { id: '2', modelId: '1', userId: 'user1', transactionHash: '0x456...', deployedAt: new Date().toISOString(), chain: 'Polygon' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const userModels = deployedModels.filter(model => model.userId === userId);
    return NextResponse.json(userModels);
  }

  return NextResponse.json(deployedModels);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newDeployment = {
    id: (deployedModels.length + 1).toString(),
    ...data,
    deployedAt: new Date().toISOString(),
  };
  deployedModels.push(newDeployment);
  return NextResponse.json(newDeployment, { status: 201 });
}