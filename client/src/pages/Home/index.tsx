import { CardWithForm, IMovie } from "@/components/Card";
import { FormEvent } from "react";
import { getMoviesByTitle } from "@/services/movies";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Header } from "@/components/Header";

export function Home() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie[]>();
  function onGetMoviesByTitle(event: FormEvent) {
    if (title != "") {
      event.preventDefault();
      getMoviesByTitle(title).then((response) => setMovies(response));
      console.log(movies);
    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen flex-col items-center justify-center font-poppins p-8 bg-zinc-50 pt-[10dvh]">
        <h1 className="font-bold text-2xl mb-2">MovieLens</h1>
        <p className="opacity-70 mb-4">Search movies by title</p>
        <form
          className="w-full flex items-center justify-center"
          onSubmit={onGetMoviesByTitle}
        >
          <input
            type="search"
            placeholder="Enter the movie title..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            spellCheck="false"
            className="border-[1px] border-black border-opacity-30 rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md border-r-0 h-8 w-3/5 p-4"
          />
          <button
            type="submit"
            onClick={onGetMoviesByTitle}
            className="hover:bg-zinc-700 transition-colors border-[1px] flex items-center border-black border-opacity-30 rounded-tl-none rounded-tr-md rounded-br-md border-l-0 bg-zinc-900 cursor-pointer rounded-bl-none h-8 w-12 p-4"
          >
            <Search strokeWidth={2} color="#f0f0f5" />
          </button>
        </form>
        <div className="w-4/5 flex flex-wrap gap-4 justify-center pt-6">
          {movies?.map((movie) => (
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
