import { CardWithForm, IMovie } from "@/components/Card";
import { Header } from "@/components/Header";
import { getPopularMovies } from "@/services/movies";
import { useEffect, useState } from "react";

export interface IPopularMovies {
  movie: IMovie;
  classification: number;
}

export function Popular() {
  const [popularMovies, setPopularMovies] = useState<IPopularMovies[]>();
  async function onGetPopularMovies() {
    await getPopularMovies().then((response) => setPopularMovies(response));
  }

  useEffect(() => {
    onGetPopularMovies();
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen flex-col items-center justify-center font-poppins pt-[10dvh] bg-zinc-50">
        <h1 className="text-2xl font-bold">MovieLens</h1>
        <p className="opacity-70">
          The 100 most popular films based on the relation between rating and number
          of reviews
        </p>
        <div className="w-4/5 flex flex-wrap gap-4 justify-center pt-6">
          {popularMovies?.map((item) => (
            <CardWithForm
              title={item.movie.title}
              amount_ratings={item.movie.amount_ratings}
              genres={item.movie.genres}
              rating={item.movie.rating}
              year={item.movie.year}
              key={item.movie.title + item.movie.year}
            />
          ))}
        </div>
      </div>
    </>
  );
}
