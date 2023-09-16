import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Popular } from "./pages/Popular";
import { KMovies } from "./pages/KMovies";
import { MoviesByYearAndGenre } from "./pages/MoviesByYearAndGenre";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/popular",
      element: <Popular />,
    },
    {
      path: "/movies",
      element: <KMovies />,
    },
    {
      path: "/movies-by-genre-and-year",
      element: <MoviesByYearAndGenre />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
