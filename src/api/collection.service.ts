import prisma from './db';

export interface AddCardInput {
  userId: string;
  cardId: string;
  setId: string;
  quantity?: number;
  condition?: string;
  isFoil?: boolean;
  isReverse?: boolean;
  isFirstEd?: boolean;
  price?: number;
  notes?: string;
}

export interface UpdateCardInput {
  quantity?: number;
  condition?: string;
  isFoil?: boolean;
  isReverse?: boolean;
  isFirstEd?: boolean;
  price?: number;
  notes?: string;
}

export const collectionService = {
  // Add a card to the collection
  async addCard(data: AddCardInput) {
    return prisma.collection.create({
      data: {
        userId: data.userId,
        cardId: data.cardId,
        setId: data.setId,
        quantity: data.quantity || 1,
        condition: data.condition || 'NearMint',
        isFoil: data.isFoil || false,
        isReverse: data.isReverse || false,
        isFirstEd: data.isFirstEd || false,
        price: data.price,
        priceDate: data.price ? new Date() : null,
        notes: data.notes
      }
    });
  },

  // Update a card in the collection
  async updateCard(id: string, data: UpdateCardInput) {
    return prisma.collection.update({
      where: { id },
      data: {
        ...data,
        priceDate: data.price ? new Date() : undefined,
      }
    });
  },

  // Delete a card from the collection
  async deleteCard(id: string) {
    return prisma.collection.delete({
      where: { id }
    });
  },

  // Get all cards in a user's collection
  async getUserCollection(userId: string) {
    return prisma.collection.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
  },

  // Get cards from a specific set in the collection
  async getSetCards(userId: string, setId: string) {
    return prisma.collection.findMany({
      where: { 
        userId,
        setId
      },
      orderBy: { updatedAt: 'desc' }
    });
  },

  // Get a specific card's variants in the collection
  async getCardVariants(userId: string, cardId: string) {
    return prisma.collection.findMany({
      where: {
        userId,
        cardId
      },
      orderBy: { updatedAt: 'desc' }
    });
  },

  // Update card price
  async updateCardPrice(id: string, price: number) {
    return prisma.collection.update({
      where: { id },
      data: {
        price,
        priceDate: new Date()
      }
    });
  },

  // Get collection statistics
  async getCollectionStats(userId: string) {
    const collection = await prisma.collection.findMany({
      where: { userId },
      select: {
        quantity: true,
        price: true
      }
    });

    return {
      totalCards: collection.reduce((sum, card) => sum + card.quantity, 0),
      totalValue: collection.reduce((sum, card) => sum + (card.price || 0) * card.quantity, 0),
      uniqueCards: collection.length
    };
  }
}; 