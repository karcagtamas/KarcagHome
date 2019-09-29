import MacAddress from '@/models/macAddress';
import Movie from '@/models/movies';

export interface RootState {
  macs: MacAddress[];
  movies: Movie[];
  myMovies: Movie[];
}
