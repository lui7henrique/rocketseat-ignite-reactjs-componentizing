import { IGenreResponseProps, IMovieProps } from "../../../App";

export interface IContentProps {
  selectedGenre: IGenreResponseProps;
  movies: IMovieProps[];
}
