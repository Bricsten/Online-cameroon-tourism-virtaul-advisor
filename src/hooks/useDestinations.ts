import { useState, useEffect } from 'react';
import { Destination } from '../types/destination';
import { DestinationService } from '../services/destinationService';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await DestinationService.getAllDestinations();
        setDestinations(data);
      } catch (err) {
        setError('Failed to fetch destinations');
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error, refetch: () => fetchDestinations() };
};

export const useDestination = (slug: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await DestinationService.getDestinationBySlug(slug);
        setDestination(data);
      } catch (err) {
        setError('Failed to fetch destination');
        console.error('Error fetching destination:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  return { destination, loading, error };
};

export const useDestinationsByCategory = (category: string) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await DestinationService.getDestinationsByCategory(category);
        setDestinations(data);
      } catch (err) {
        setError('Failed to fetch destinations');
        console.error('Error fetching destinations by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [category]);

  return { destinations, loading, error };
};

export const useDestinationSearch = (searchTerm: string) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchDestinations = async () => {
      if (!searchTerm.trim()) {
        setDestinations([]);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await DestinationService.searchDestinations(searchTerm);
        setDestinations(data);
      } catch (err) {
        setError('Failed to search destinations');
        console.error('Error searching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchDestinations, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { destinations, loading, error };
};