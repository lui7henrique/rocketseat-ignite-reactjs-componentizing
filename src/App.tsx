import { Content } from "./components/Content/Content";
import { SideBar } from "./components/SideBar/SideBar";
import { useEffect, useState } from "react";
import { api } from "./services/api";

export interface IGenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export interface IMovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  const [movies, setMovies] = useState<IMovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenreResponseProps>(
    {} as IGenreResponseProps
  );

  useEffect(() => {
    api.get<IGenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data); // retorna todos os gêneros
    });
  }, []);

  useEffect(() => {
    api
      .get<IMovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data); // retorna os filmes do gênero selecionado
      });

    api
      .get<IGenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data); // retorna o gênero selecionado
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
      />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  );
}
