import { RootState } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import { useCallback } from 'react';
import { getRecommendedMovies } from './MoviesApi';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useRandomRecommendedMovies = () => {
  const dispatch = useTypedDispatch();

  const fetchRandomRecommendedMovies = useCallback(async () => {
    try {
      const randomNumber: number = Math.floor(Math.random() * 30) + 1;
      await dispatch(getRecommendedMovies(randomNumber));
    } catch (error) {
      console.error('Failed to fetch recommended movies:', error);
    }
  }, [dispatch]);

  return fetchRandomRecommendedMovies;
};
