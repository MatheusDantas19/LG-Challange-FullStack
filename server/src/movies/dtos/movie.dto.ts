import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from '../entities/movie.entity';
export class MovieDTO {
  @ApiProperty()
  movieId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  genres: string[];
}

export class MovieByGenreAndYearDTO {
  @ApiProperty()
  genre: string;

  @ApiProperty()
  year: string;
}

export class MovieByPopularityDTO {
  movie: MovieEntity;
  classification: number;
}

export class MovieRankedDTO {
  @ApiProperty()
  amount: number;
}

export class MovieByTitleDTO {
  @ApiProperty()
  title: string;
}