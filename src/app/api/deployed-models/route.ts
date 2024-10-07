import { NextResponse } from 'next/server';

let deployedModels = [
  { id: '1', modelId: '2', transactionHash: '0x123...', deployedAt: new Date().toISOString() },
  { id: '2', modelId: '1', transactionHash: '0x456...', deployedAt: new Date().toISOString() },
];

export async function GET() {
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