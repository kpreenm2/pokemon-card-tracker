import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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

// Query keys
const COLLECTION_KEYS = {
  all: ['collection'] as const,
  user: (userId: string) => [...COLLECTION_KEYS.all, userId] as const,
  set: (userId: string, setId: string) => [...COLLECTION_KEYS.user(userId), 'set', setId] as const,
  card: (userId: string, cardId: string) => [...COLLECTION_KEYS.user(userId), 'card', cardId] as const,
  stats: (userId: string) => [...COLLECTION_KEYS.user(userId), 'stats'] as const,
};

// Hooks
export const useUserCollection = (userId: string) => {
  return useQuery({
    queryKey: COLLECTION_KEYS.user(userId),
    queryFn: () => axios.get(`${API_URL}/collection/user/${userId}`).then(res => res.data),
  });
};

export const useSetCards = (userId: string, setId: string) => {
  return useQuery({
    queryKey: COLLECTION_KEYS.set(userId, setId),
    queryFn: () => axios.get(`${API_URL}/collection/set/${userId}/${setId}`).then(res => res.data),
  });
};

export const useCardVariants = (userId: string, cardId: string) => {
  return useQuery({
    queryKey: COLLECTION_KEYS.card(userId, cardId),
    queryFn: () => axios.get(`${API_URL}/collection/card/${userId}/${cardId}`).then(res => res.data),
  });
};

export const useCollectionStats = (userId: string) => {
  return useQuery({
    queryKey: COLLECTION_KEYS.stats(userId),
    queryFn: () => axios.get(`${API_URL}/collection/stats/${userId}`).then(res => res.data),
  });
};

// Mutations
export const useAddCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddCardInput) => axios.post(`${API_URL}/collection`, data).then(res => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.user(variables.userId) });
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.set(variables.userId, variables.setId) });
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.card(variables.userId, variables.cardId) });
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.stats(variables.userId) });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCardInput }) => 
      axios.put(`${API_URL}/collection/${id}`, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.all });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/collection/${id}`).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.all });
    },
  });
};

export const useUpdateCardPrice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, price }: { id: string; price: number }) => 
      axios.put(`${API_URL}/collection/${id}`, { price }).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.all });
    },
  });
}; 