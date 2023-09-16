import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { MovieByPopularityDTO } from './dtos/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}
  async listMoviesByTitle(title: string): Promise<MovieEntity[]> {
    const moviesByTitle = await this.movieRepository.find();

    if (!moviesByTitle) {
      throw new NotFoundException('Movies by title not found');
    } else {
      const filteredMovies = moviesByTitle.filter((movie) => {
        return movie.title.toLowerCase().includes(title.toLowerCase());
      });
      return filteredMovies;
    }
  }
  async listMoviesByYearAndGenre(
    year: string,
    genre: string,
  ): Promise<MovieEntity[]> {
    try {
      const movies = await this.movieRepository.find({
        where: {
          year: Like(`%${year}%`),
        },
      });

      if (!movies) {
        throw new NotFoundException('Movies by year and genre not found');
      }
      const filteredMovies = movies.filter((movie) => {
        return movie.genres.toLowerCase().includes(genre.toLowerCase());
      });

      return filteredMovies;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async listTheBestKMoviesRanked(k: number): Promise<MovieEntity[]> {
    try {
      const movies = await this.movieRepository.find({
        order: {
          rating: 'DESC',
        },
        take: k,
      });

      if (!movies) {
        throw new NotFoundException('Movies not found');
      }
      return movies;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async listMoviesByPopularity(): Promise<MovieByPopularityDTO[]> {
    try {
      const LIMIAR = 164; //defines the minimum amount ratings value to consider "popular";
      const movies = await this.movieRepository.find();
      if (!movies) {
        throw new NotFoundException('Movies not found');
      }
      const moviesPopularity = movies.map((movie) => {
        return {
          movie,
          classification: (movie.amount_ratings * movie.rating) / LIMIAR,
        };
      });

      const sortedMoviesByPopularity: MovieByPopularityDTO[] =
        moviesPopularity.sort((a, b) => b.classification - a.classification);

      return sortedMoviesByPopularity.slice(0, 100);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
