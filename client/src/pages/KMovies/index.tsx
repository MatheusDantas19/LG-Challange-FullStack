import { CardWithForm, IMovie } from "@/components/Card";
import { Header } from "@/components/Header";
import { getTopKMovies } from "@/services/movies";
import { Send } from "lucide-react";
import { ChangeEvent, useState, FormEvent } from "react";

export function KMovies() {
  const [kMovies, setKMovies] = useState<IMovie[]>();
  const [k, setK] = useState("");

  function onGetTopKMovies(event: FormEvent) {
    event.preventDefault();
    if (k) {
      getTopKMovies(Number(k)).then((response) => setKMovies(response));
    }
  }
  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen flex-col items-center justify-center font-poppins p-8 bg-zinc-50 pt-[10dvh]">
        <h1 className="text-2xl font-bold mb-2">MovieLens</h1>
        <p className="opacity-70 mb-4">The best rated K movies</p>
        <form
          onSubmit={onGetTopKMovies}
          className="flex items-center w-full justify-center"
        >
          <input
            type="number"
            placeholder="enter the number of films..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setK(event.target.value)
            }
            className="border-[1px] border-black border-opacity-30 rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md border-r-0 h-8 w-[400px] p-4"
          />
          <button
            type="submit"
            onClick={onGetTopKMovies}
            className="hover:bg-zinc-700 transition-colors border-[1px] flex items-center border-black border-opacity-30 rounded-tl-none rounded-tr-md rounded-br-md border-none bg-zinc-900 cursor-pointer rounded-bl-none h-8 w-12 p-4"
          >
            <Send strokeWidth={2} color="#f0f0f5" />
          </button>
        </form>
        <div className="w-4/5 flex flex-wrap gap-4 justify-center pt-6">
          {kMovies?.map((movie) => (
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
