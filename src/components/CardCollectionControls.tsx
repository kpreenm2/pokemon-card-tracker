import React, { useState } from 'react';
import { useAddCard, useUpdateCard, useCardVariants } from '../api/collection.api';

interface CardCollectionControlsProps {
  cardId: string;
  setId: string;
  userId: string; // We'll need to implement authentication later
}

export function CardCollectionControls({ cardId, setId, userId }: CardCollectionControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: variants } = useCardVariants(userId, cardId);
  const addCard = useAddCard();
  const updateCard = useUpdateCard();

  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('NearMint');
  const [isFoil, setIsFoil] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [isFirstEd, setIsFirstEd] = useState(false);

  const handleAddToCollection = () => {
    addCard.mutate({
      userId,
      cardId,
      setId,
      quantity,
      condition,
      isFoil,
      isReverse,
      isFirstEd
    });
    setIsOpen(false);
  };

  const totalOwned = variants?.reduce((sum, card) => sum + card.quantity, 0) || 0;

  return (
    <div className="mt-2">
      {!isOpen ? (
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-600">
            Owned: {totalOwned}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
          >
            {totalOwned > 0 ? 'Add More' : 'Add to Collection'}
          </button>
        </div>
      ) : (
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="NearMint">Near Mint</option>
                <option value="LightlyPlayed">Lightly Played</option>
                <option value="ModeratelyPlayed">Moderately Played</option>
                <option value="HeavilyPlayed">Heavily Played</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="foil"
                  checked={isFoil}
                  onChange={(e) => setIsFoil(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="foil" className="ml-2 text-sm text-gray-700">Foil</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reverse"
                  checked={isReverse}
                  onChange={(e) => setIsReverse(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="reverse" className="ml-2 text-sm text-gray-700">Reverse Holo</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="firstEd"
                  checked={isFirstEd}
                  onChange={(e) => setIsFirstEd(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="firstEd" className="ml-2 text-sm text-gray-700">First Edition</label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddToCollection}
                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 