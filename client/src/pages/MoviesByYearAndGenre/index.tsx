import { CardWithForm, IMovie } from "@/components/Card";
import { Header } from "@/components/Header";
import { getMoviesByYearAndGenre } from "@/services/movies";
import { Search } from "lucide-react";
import { ChangeEvent, useState, FormEvent } from "react";

interface IFilter {
  year: string;
  genre: string;
}

export function MoviesByYearAndGenre() {
  const [moviesByGenreAndYear, setMoviesByGenreAndYear] = useState<IMovie[]>();
  const [filter, setFilter] = useState<IFilter>({
    genre: "",
    year: "",
  });

  function onGetMoviesByYearAndGenre(event: FormEvent) {
    event.preventDefault();
    console.log(filter);
    if (filter.genre != "" && filter.year != "") {
      getMoviesByYearAndGenre(filter.year, filter.genre).then((response) =>
        setMoviesByGenreAndYear(response)
      );
    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen flex-col items-center justify-center font-poppins p-8 bg-zinc-50 pt-[10dvh]">
        <h1 className="text-2xl font-bold mb-2">MovieLens</h1>
        <p className="opacity-70 mb-4">Search movies by genre and year</p>
        <form
          className="w-full flex gap-4 items-center justify-center"
          onSubmit={onGetMoviesByYearAndGenre}
        >
          <input
            type="text"
            placeholder="Enter the year of the movie..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFilter({ ...filter, year: event.target.value })
            }
            spellCheck="false"
            className="border-[1px] border-black border-opacity-30 rounded-md h-8 w-[300px] p-4"
          />
          <span className="flex gap-4">
            <input
              type="text"
              placeholder="Enter the genre of the movie..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilter({ ...filter, genre: event.target.value })
              }
              spellCheck="false"
              className="border-[1px] border-black border-opacity-30 rounded-md h-8 w-[300px] p-4"
            />
            <button
              type="submit"
              onClick={onGetMoviesByYearAndGenre}
              className="hover:bg-zinc-700 transition-colors border-[1px] flex items-center border-black border-opacity-30 rounded-md bg-zinc-900 cursor-pointer  h-8 w-12 p-4"
            >
              <Search strokeWidth={2} color="#f0f0f5" />
            </button>
          </span>
        </form>
        <div className="w-4/5 flex flex-wrap gap-4 justify-center pt-6">
          {moviesByGenreAndYear?.map((movie) => (
            <CardWithForm
              title={movie.title}
              amount_ratings={movie.amount_ratings}
              genres={movie.genres}
              rating={movie.rating}
              year={movie.year}
              key={movie.title + movie.year}
            />
          ))}
        </div>
      </div>
    </>
  );
}
