import { IGenreResponseProps } from "../../../App";

export interface ISideBarProps {
  genres: IGenreResponseProps[];
  selectedGenreId: number;
  handleClickButton: (genreId: number) => void;
}
