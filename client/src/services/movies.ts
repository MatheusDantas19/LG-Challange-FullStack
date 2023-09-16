import { IPopularMovies } from "@/pages/Popular";
import { api } from "./api";
import { IMovie } from "@/components/Card";

export async function getMoviesByTitle(title: string): Promise<IMovie[]> {
  const response = await api.post("movies/movie", { title });
  return response.data;
}

export async function getMoviesByYearAndGenre(
  year: string,
  genre: string
): Promise<IMovie[]> {
  const response = await api.post("movies", { year, genre });

  return response.data;
}

export async function getTopKMovies(amount: number): Promise<IMovie[]> {
  const response = await api.get(`movies/ranked/${amount}`);

  return response.data;
}

export async function getPopularMovies(): Promise<IPopularMovies[]> {
  const response = await api.get("movies/popular");

  return response.data;
}
