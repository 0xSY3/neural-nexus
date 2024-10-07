// src/components/DeploymentConfirmationModal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeploymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modelName: string;
  price: string;
}

const DeploymentConfirmationModal: React.FC<DeploymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  modelName,
  price,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-blue-900 to-teal-900 p-8 rounded-lg shadow-xl max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-teal-300">Confirm Deployment</h2>
            <p className="text-white mb-4">
              You are about to deploy the model: <span className="font-bold">{modelName}</span>
            </p>
            <p className="text-white mb-6">
              Deployment cost: <span className="font-bold">{price} ETH</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Confirm Deployment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeploymentConfirmationModal;