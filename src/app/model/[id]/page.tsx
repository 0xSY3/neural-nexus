// src/app/model/[id]/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AIModelDetails from '../../../components/AIModelDetails';

interface AIModel {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  performance: string;
  compatibility: string[];
  creator: string;
}

export default function ModelPage() {
  const params = useParams();
  const modelId = params.id as string;
  const [model, setModel] = useState<AIModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`/api/model/${modelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch model details');
        }
        const data = await response.json();
        setModel(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!model) return <div>Model not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white p-8">
      <div className="container mx-auto">
        <AIModelDetails {...model} />
      </div>
    </div>
  );
}