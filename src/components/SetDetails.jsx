import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CardCollectionControls } from './CardCollectionControls';

// Temporary user ID until we implement authentication
const TEMP_USER_ID = "temp-user-1";

function SetDetails() {
  const { setId } = useParams();

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards', setId],
    queryFn: async () => {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
      // Sort cards by number, handling both numeric and alphanumeric numbers
      return response.data.data.sort((a, b) => {
        // Convert numbers to padded strings for proper sorting
        const aNum = a.number.padStart(4, '0');
        const bNum = b.number.padStart(4, '0');
        return aNum.localeCompare(bNum, undefined, { numeric: true });
      });
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading cards: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Sets
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
          >
            <div className="relative pb-[140%]">
              <img
                src={card.images.small}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-2 sm:p-3">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {card.name}
              </h3>
              <p className="text-xs text-gray-600">
                {card.number}/{card.set.printedTotal}
              </p>
              {card.cardmarket?.prices?.averageSellPrice && (
                <p className="text-xs text-gray-600 mt-1">
                  Avg. Price: ${card.cardmarket.prices.averageSellPrice.toFixed(2)}
                </p>
              )}
              <CardCollectionControls
                cardId={card.id}
                setId={setId}
                userId={TEMP_USER_ID}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetDetails; 