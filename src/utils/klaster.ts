import { Klaster } from '@klaster/sdk';

const klaster = new Klaster({
  projectId: process.env.NEXT_PUBLIC_KLASTER_PROJECT_ID,
});

export const simplifyTransaction = async (txData: any) => {
  const simplifiedTx = await klaster.simplifyTransaction(txData);
  return simplifiedTx;
};

export const explainAIModelUsage = async (modelId: string, inputData: any) => {
  const explanation = await klaster.explainAIModelUsage(modelId, inputData);
  return explanation;
};

export const optimizeModelExecution = async (modelId: string, inputData: any) => {
  const optimizedExecution = await klaster.optimizeModelExecution(modelId, inputData);
  return optimizedExecution;
};