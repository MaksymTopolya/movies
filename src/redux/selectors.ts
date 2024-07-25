import { InitialStateType } from './movieSlice';
import { initialStateTypeSerials } from './serialsSlice';

export interface RootState {
  movies: InitialStateType;
  serials: initialStateTypeSerials;
  auth: initialStateTypeAuth;
}

export const recommendedMovies = (state: RootState) =>
  state.movies.recommendedMovies;

export const loadMoreMovies = (state: RootState) => state.movies.loadMoreMovies;
3;
export const newMovies = (state: RootState) => state.movies.newMovies.movies;
export const newMoviesPages = (state: RootState) =>
  state.movies.newMovies.pages;

export const movieDetailsById = (state: RootState) =>
  state.movies.movieDetailsById;

export const cast = (state: RootState) => state.movies.cast;

export const actorInfo = (state: RootState) =>
  state.movies.actorDetails.actorsInfo;
export const actorsMovies = (state: RootState) =>
  state.movies.actorDetails.actorsMovies;

export const topRatedMovies = (state: RootState) =>
  state.movies.topRatedMovies.movies;
export const topRatedMoviesPages = (state: RootState) =>
  state.movies.topRatedMovies.pages;

export const upcomingMovies = (state: RootState) =>
  state.movies.upcomingMovies.movies;
export const upcomingMoviesPages = (state: RootState) =>
  state.movies.upcomingMovies.pages;

export const queryValue = (state: RootState) => state.movies.queryValue;

export const searchedMovies = (state: RootState) =>
  state.movies.searchedMovies.movies;
export const searchedMoviesPages = (state: RootState) =>
  state.movies.searchedMovies.pages;

export const recommendedSerials = (state: RootState) =>
  state.serials.recommendedSerials.serials;
export const recommendedSerialsPages = (state: RootState) =>
  state.serials.recommendedSerials.pages;

export const topRatedSerials = (state: RootState) =>
  state.serials.topRatedSerials.serials;
export const topRatedSerialsPages = (state: RootState) =>
  state.serials.topRatedSerials.pages;

export const serialDetailsById = (state: RootState) =>
  state.serials.serialDetailsById;

export const serialCast = (state: RootState) => state.serials.cast;

export const user = (state: RootState) => state.auth.user;

export const favoriteMovies = (state: RootState) => state.movies.favoriteMovies;

export const youtubeVideoTrailer = (state: RootState) =>
  state.movies.youtubeVideoTrailer;
export const youtubeVideoTrailerSerial = (state: RootState) =>
  state.serials.youtubeVideoTrailer;
