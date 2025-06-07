import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SetList() {
  const { data: sets, isLoading, error } = useQuery({
    queryKey: ['sets'],
    queryFn: async () => {
      const response = await axios.get('https://api.pokemontcg.io/v2/sets');
      return response.data.data;
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
        Error loading sets: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sets.map((set) => (
        <Link
          key={set.id}
          to={`/set/${set.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
        >
          <div className="relative pb-[100%]">
            <img
              src={set.images.logo}
              alt={set.name}
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          </div>
          <div className="p-4 border-t">
            <h2 className="text-lg font-semibold text-gray-900">{set.name}</h2>
            <p className="text-sm text-gray-600">Released: {new Date(set.releaseDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">{set.total} cards</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SetList; 