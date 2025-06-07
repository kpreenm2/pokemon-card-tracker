import { Router } from 'express';
import { collectionService } from '../services/collection';

const router = Router();

// Get all cards in a user's collection
router.get('/user/:userId', async (req, res) => {
  try {
    const cards = await collectionService.getUserCollection(req.params.userId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

// Get cards from a specific set
router.get('/set/:userId/:setId', async (req, res) => {
  try {
    const cards = await collectionService.getSetCards(req.params.userId, req.params.setId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch set cards' });
  }
});

// Get card variants
router.get('/card/:userId/:cardId', async (req, res) => {
  try {
    const variants = await collectionService.getCardVariants(req.params.userId, req.params.cardId);
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card variants' });
  }
});

// Add a card to collection
router.post('/', async (req, res) => {
  try {
    const card = await collectionService.addCard(req.body);
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add card' });
  }
});

// Update a card
router.put('/:id', async (req, res) => {
  try {
    const card = await collectionService.updateCard(req.params.id, req.body);
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  try {
    await collectionService.deleteCard(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// Get collection stats
router.get('/stats/:userId', async (req, res) => {
  try {
    const stats = await collectionService.getCollectionStats(req.params.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export const collectionRouter = router; 