import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieEntity } from './entities/movie.entity';
import {
  MovieByGenreAndYearDTO,
  MovieByPopularityDTO,
  MovieByTitleDTO,
  MovieRankedDTO,
} from './dtos/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Post("movie")
  getMoviesbyTitle(@Body() body: MovieByTitleDTO) {
    return this.moviesService.listMoviesByTitle(body.title);
  }
  @Post()
  getMoviesByYearAndGenre(@Body() body: MovieByGenreAndYearDTO) {
    return this.moviesService.listMoviesByYearAndGenre(body.year, body.genre);
  }
  @Get('/ranked/:amount')
  getTheBestKMoviesRanked(
    @Param() params: MovieRankedDTO,
  ): Promise<MovieEntity[]> {
    return this.moviesService.listTheBestKMoviesRanked(params.amount);
  }
  @Get('popular')
  getMoviesByPopularity(): Promise<MovieByPopularityDTO[]> {
    return this.moviesService.listMoviesByPopularity();
  }
}
