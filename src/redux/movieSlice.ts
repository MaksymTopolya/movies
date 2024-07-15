import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getActorDetails,
  getActorMovies,
  getCast,
  getMovieById,
  getNewMovies,
  getRecommendedMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getYoutubeVideoTrailer,
  MoviesResponse,
  searchMovies,
} from '../MoviesApi';
import { ActorInfo, CastType, Movie } from '../types';

export interface InitialStateType {
  recommendedMovies: Movie[];
  loadMoreMovies: boolean;
  newMovies: {
    movies: Movie[];
    pages: number;
  };
  movieDetailsById: Movie;
  cast: CastType[];
  actorDetails: {
    actorsInfo: ActorInfo;
    actorsMovies: Movie[];
  };
  topRatedMovies: {
    movies: Movie[];
    pages: number;
  };
  upcomingMovies: {
    movies: Movie[];
    pages: number;
  };
  queryValue: string;
  searchedMovies: {
    movies: Movie[];
    pages: number;
  };
  favoriteMovies: Movie[];
  youtubeVideoTrailer: {
    key: string;
  };
}

export const defaultMovie: Movie = {
  id: 0,
  original_name: '',
  original_title: '',
  overview: '',
  poster_path: '',
  release_date: '',
  vote_average: 0,
  tagline: '',
  genres: [],
  original_language: '',
  popularity: 0,
};

export const actorInfoDefault = {
  id: 0,
  name: '',
  profile_path: '',
  birthday: '',
  place_of_birth: '',
};

const initialState: InitialStateType = {
  recommendedMovies: [],
  loadMoreMovies: false,
  newMovies: {
    movies: [],
    pages: 0,
  },
  movieDetailsById: defaultMovie,
  cast: [],
  actorDetails: {
    actorsInfo: actorInfoDefault,
    actorsMovies: [],
  },
  topRatedMovies: {
    movies: [],
    pages: 0,
  },
  upcomingMovies: {
    movies: [],
    pages: 0,
  },
  queryValue: '',
  searchedMovies: {
    movies: [],
    pages: 0,
  },
  favoriteMovies: [],
  youtubeVideoTrailer: {
    key: '',
  },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoadMoreMovies: (state, action: PayloadAction<boolean>) => {
      state.loadMoreMovies = action.payload;
    },
    clearMovieDetailsById: (state, action: PayloadAction<Movie>) => {
      state.movieDetailsById = action.payload;
    },
    clearCast: (state, action: PayloadAction<CastType[]>) => {
      state.cast = action.payload;
    },
    clearNewMovies: (state, action: PayloadAction<Movie[]>) => {
      state.newMovies.movies = action.payload;
      state.newMovies.pages = 0;
    },
    clearActorInfo: (state, action: PayloadAction<ActorInfo>) => {
      state.actorDetails.actorsInfo = action.payload;
    },
    clearActorMovies: (state, action: PayloadAction<Movie[]>) => {
      state.actorDetails.actorsMovies = action.payload;
    },
    clearTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies.movies = action.payload;
      state.topRatedMovies.pages = 0;
    },
    clearUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies.movies = action.payload;
      state.upcomingMovies.pages = 0;
    },
    setQueryValue: (state, action: PayloadAction<string>) => {
      state.queryValue = action.payload;
    },
    clearSearchedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.searchedMovies.movies = action.payload;
      state.searchedMovies.pages = 0;
    },
    setFavoriteMovies: (state, action: PayloadAction<Movie[]>) => {
      state.favoriteMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getRecommendedMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.recommendedMovies = action.payload;
        },
      )
      .addCase(
        getNewMovies.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.newMovies.movies = [
            ...state.newMovies.movies,
            ...action.payload.movies,
          ];
          state.newMovies.pages = action.payload.totalPages;
        },
      )
      .addCase(
        getMovieById.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.movieDetailsById = action.payload;
        },
      )
      .addCase(
        getCast.fulfilled,
        (state, action: PayloadAction<CastType[]>) => {
          state.cast = action.payload;
        },
      )
      .addCase(
        getActorDetails.fulfilled,
        (state, action: PayloadAction<ActorInfo>) => {
          state.actorDetails.actorsInfo = action.payload;
        },
      )
      .addCase(
        getActorMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.actorDetails.actorsMovies = action.payload;
        },
      )
      .addCase(
        getTopRatedMovies.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.topRatedMovies.movies = [
            ...state.topRatedMovies.movies,
            ...action.payload.movies,
          ];
          state.topRatedMovies.pages = action.payload.totalPages;
        },
      )
      .addCase(
        getUpcomingMovies.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.upcomingMovies.movies = [
            ...state.upcomingMovies.movies,
            ...action.payload.movies,
          ];
          state.upcomingMovies.pages = action.payload.totalPages;
        },
      )
      .addCase(
        searchMovies.fulfilled,
        (state, action: PayloadAction<MoviesResponse>) => {
          state.searchedMovies.movies = [
            ...state.searchedMovies.movies,
            ...action.payload.movies,
          ];
          state.searchedMovies.pages = action.payload.totalPages;
        },
      )

      .addCase(
        getYoutubeVideoTrailer.fulfilled,
        (state, action: PayloadAction<{ key: string }>) => {
          state.youtubeVideoTrailer = action.payload;
        },
      );
  },
});

export default movieSlice.reducer;

export const {
  setLoadMoreMovies,
  clearMovieDetailsById,
  clearCast,
  clearNewMovies,
  clearActorInfo,
  clearActorMovies,
  clearTopRatedMovies,
  clearUpcomingMovies,
  setQueryValue,
  clearSearchedMovies,
  setFavoriteMovies,
} = movieSlice.actions;
