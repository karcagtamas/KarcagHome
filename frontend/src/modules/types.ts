import MacAddress from '@/models/macAddress';
import Movie from '@/models/movies';

// Root state
export interface RootState {
  macs: MacAddress[];
  movies: Movie[];
  myMovies: Movie[];
}
