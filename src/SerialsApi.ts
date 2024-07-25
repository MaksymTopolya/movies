import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MoviesResponse } from './MoviesApi';
import { CastType, Movie } from './types';
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTZhNjlmN2NhMTRhZjc2Nzg4YmViNDJkYWJhZDI2YSIsInN1YiI6IjY2NTM3OWQ4OTU0MmJiYjdiZWI2Mjc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BeXgkgXe2ouzB704DLYG4TvkHN8eV004ThJN7XSrnp0';
const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: API_KEY,
    accept: 'application/json',
  },
});

export const getRecommendedSerials = createAsyncThunk<MoviesResponse, number>(
  'serials/getRecommendedSerials',
  async (page: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/tv/popular?language=en-US&page=${page}`,
      );
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getTopRatedSerials = createAsyncThunk<MoviesResponse, number>(
  'serials/getTopRatedSerials',
  async (page: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/tv/top_rated?language=en-US&page=${page}`,
      );
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getSerialById = createAsyncThunk<Movie, number>(
  'serials/getSerialById',
  async (id: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/tv/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getCast = createAsyncThunk<CastType[], number>(
  'movies/getCast',
  async (id: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/tv/${id}/credits`);
      return response.data.cast;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getYoutubeVideoTrailer = createAsyncThunk<{ key: string }, number>(
  'movies/getYoutubeVideoTrailerForSerial',
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/tv/${id}/videos?language=en-US`,
      );
      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
