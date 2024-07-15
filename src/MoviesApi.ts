import axios from 'axios';
import { ActorInfo, CastType, Movie } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
}
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTZhNjlmN2NhMTRhZjc2Nzg4YmViNDJkYWJhZDI2YSIsInN1YiI6IjY2NTM3OWQ4OTU0MmJiYjdiZWI2Mjc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BeXgkgXe2ouzB704DLYG4TvkHN8eV004ThJN7XSrnp0';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: API_KEY,
    accept: 'application/json',
  },
});

export const getRecommendedMovies = createAsyncThunk<Movie[], number>(
  'movies/getRecommendedMovies',
  async (randomPage: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/movie/popular?language=en-US&page=${randomPage}`,
      );

      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getNewMovies = createAsyncThunk<MoviesResponse, number>(
  'movies/getNewMovies',
  async (page: number, thunkApi) => {
    try {
      const response = await axiosInstance.get('/discover/movie', {
        params: {
          sort_by: 'release_date.lte',
          page: page,
        },
      });
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getMovieById = createAsyncThunk<Movie, number>(
  'movies/getMovieById',
  async (id: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/movie/${id}`);
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
      const response = await axiosInstance.get(`/movie/${id}/casts`);
      return response.data.cast;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getActorDetails = createAsyncThunk<ActorInfo, number>(
  'movies/getActorDetails',
  async (actorId: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/person/${actorId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getActorMovies = createAsyncThunk<Movie[], number>(
  'movies/getActorMovies',
  async (actorId: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/person/${actorId}/movie_credits`,
      );
      return response.data.cast;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getTopRatedMovies = createAsyncThunk<MoviesResponse, number>(
  'movies/getTopRatedMovies',
  async (page, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/movie/top_rated`, {
        params: {
          page: page,
        },
      });
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getUpcomingMovies = createAsyncThunk<MoviesResponse, number>(
  'movies/getUpcomingMovies',
  async (page, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/movie/upcoming`, {
        params: {
          page: page,
        },
      });
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const searchMovies = createAsyncThunk<
  MoviesResponse,
  { query: string; page: number }
>('movies/searchMovies', async (obj, thunkApi) => {
  try {
    const [moviesResponse, tvShowsResponse] = await Promise.all([
      axiosInstance.get(
        `/search/movie?query=${obj.query}&include_adult=false&language=en-US&page=${obj.page}`,
      ),
      axiosInstance.get(
        `/search/tv?query=${obj.query}&include_adult=false&language=en-US&page=${obj.page}`,
      ),
    ]);

    const movies = moviesResponse.data.results;
    const tvShows = tvShowsResponse.data.results;
    const totalPages = Math.max(
      moviesResponse.data.total_pages,
      tvShowsResponse.data.total_pages,
    );

    return {
      movies: [...movies, ...tvShows],
      totalPages,
    };
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getYoutubeVideoTrailer = createAsyncThunk<{ key: string }, number>(
  'movies/getYoutubeVideoTrailer',
  async (id, thunkApi) => {
    try {
      const response = await axiosInstance.get(
        `/movie/${id}/videos?language=en-US`,
      );
      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
