import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'movielens.db',
      entities: [__dirname + '/../**/*.entity{.js, .ts}'],
      synchronize: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
