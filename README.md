# Pokemon Card Tracker

A Progressive Web App for tracking Pokemon card collections and browsing card sets. Built with React, Vite, Tailwind CSS, and the Pokemon TCG API.

## Features

- Browse all Pokemon card sets
- View detailed information about each set
- Mobile-first responsive design
- PWA support for offline access
- Real-time card market prices

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-card-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Pokemon TCG API key:
```
VITE_POKEMON_TCG_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## API Data Structure

### Set Data Fields
- `id`: Unique identifier for the set
- `name`: Name of the set
- `series`: The series the set belongs to
- `printedTotal`: Number of cards printed in the set
- `total`: Total number of cards in the set
- `legalities`: Legal play formats
- `ptcgoCode`: Pokemon Trading Card Game Online code
- `releaseDate`: When the set was released
- `updatedAt`: Last update timestamp
- `images`:
  - `logo`: URL to set logo image
  - `symbol`: URL to set symbol image

### Card Data Fields
- `id`: Unique identifier for the card
- `name`: Card name
- `supertype`: Type of card (e.g., "Pokémon")
- `subtypes`: Array of subtypes (e.g., "Stage 2")
- `level`: Pokemon level
- `hp`: Hit points
- `types`: Array of energy types
- `evolvesFrom`: Previous evolution
- `abilities`: Array of abilities with:
  - `name`: Ability name
  - `text`: Ability description
  - `type`: Type of ability
- `attacks`: Array of attacks with:
  - `name`: Attack name
  - `cost`: Energy cost array
  - `convertedEnergyCost`: Total energy cost
  - `damage`: Damage dealt
  - `text`: Attack description
- `weaknesses`: Array of type weaknesses
- `resistances`: Array of type resistances
- `retreatCost`: Array of energy types needed to retreat
- `convertedRetreatCost`: Total retreat cost
- `set`: Information about the card's set
- `number`: Card number in the set
- `artist`: Card artist
- `rarity`: Card rarity
- `flavorText`: Pokedex-style description
- `nationalPokedexNumbers`: Array of Pokedex numbers
- `legalities`: Legal play formats
- `images`:
  - `small`: URL to small card image
  - `large`: URL to high-resolution card image
- `cardmarket`: Market prices from Cardmarket with:
  - `url`: Link to card on Cardmarket
  - `updatedAt`: Price update timestamp
  - `prices`: Various price points (avg, low, trend, etc.)
- `tcgplayer`: Similar price data from TCGPlayer

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Query
- React Router
- Pokemon TCG API
- Prisma (for database)
- Vercel (for deployment)
- Neon (for PostgreSQL database)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
