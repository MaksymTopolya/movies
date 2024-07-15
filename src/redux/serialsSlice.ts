import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCast,
  getRecommendedSerials,
  getSerialById,
  getTopRatedSerials,
} from '../SerialsApi';
import { CastType, Movie } from '../types';
import { defaultMovie } from './movieSlice';
import { MoviesResponse } from '../MoviesApi';

export interface initialStateTypeSerials {
  recommendedSerials: {
    serials: Movie[];
    pages: number;
  };
  topRatedSerials: {
    serials: Movie[];
    pages: number;
  };
  serialDetailsById: Movie;
  cast: CastType[];
}

const initialState: initialStateTypeSerials = {
  recommendedSerials: {
    serials: [],
    pages: 0,
  },
  topRatedSerials: {
    serials: [],
    pages: 0,
  },
  serialDetailsById: defaultMovie,
  cast: [],
};

const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {
    clearRecommendedSerials: (state) => {
      state.recommendedSerials.serials = [];
      state.recommendedSerials.pages = 0;
    },
    clearTopRatedSerials: (state) => {
      state.topRatedSerials.serials = [];
      state.topRatedSerials.pages = 0;
    },
    clearSerialDetailsById: (state, action: PayloadAction<Movie>) => {
      state.serialDetailsById = action.payload;
    },
    clearCast: (state, action: PayloadAction<CastType[]>) => {
      state.cast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getRecommendedSerials.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.recommendedSerials.serials = [
            ...state.recommendedSerials.serials,
            ...action.payload.movies,
          ];
          state.recommendedSerials.pages = action.payload.totalPages;
        },
      )
      .addCase(
        getTopRatedSerials.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.topRatedSerials.serials = [
            ...state.topRatedSerials.serials,
            ...action.payload.movies,
          ];
          state.topRatedSerials.pages = action.payload.totalPages;
        },
      )
      .addCase(
        getSerialById.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.serialDetailsById = action.payload;
        },
      )
      .addCase(
        getCast.fulfilled,
        (state, action: PayloadAction<CastType[]>) => {
          state.cast = action.payload;
        },
      );
  },
});

export const {
  clearRecommendedSerials,
  clearTopRatedSerials,
  clearSerialDetailsById,
  clearCast,
} = serialsSlice.actions;
export default serialsSlice.reducer;
