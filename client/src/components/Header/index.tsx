import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h-[5vh] w-full fixed shadow-md flex items-center bg-black">
      <nav className="flex w-full justify-around items-center">
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/popular" className="text-white">
          Popular Movies
        </Link>
        <Link to="/movies" className="text-white">
          Top K Movies
        </Link>
        <Link to="/movies-by-genre-and-year" className="text-white">
          Movies By Genre and Year
        </Link>
      </nav>
    </header>
  );
}
