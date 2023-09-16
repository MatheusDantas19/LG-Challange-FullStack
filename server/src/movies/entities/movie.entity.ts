import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("movies")
export class MovieEntity {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  title: string;
  
  @Column()
  year: string;

  @Column()
  amount_ratings: number;

  @Column("decimal")
  rating: number;

  @Column()
  genres: string;
}
