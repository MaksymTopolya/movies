export interface Movie {
  id: number;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  tagline: string;
  genres: { id: number; name: string }[];
  original_language: string;
  popularity: number;
}

export interface CastType {
  id: number;
  character: string;
  name: string;
  profile_path: string | null;
}

export interface ActorInfo {
  id: number;
  name: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
}
