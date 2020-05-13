export type Dispatch = React.Dispatch<IAction>;

export interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: { medium: string; original: string };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  url: string;
}

export interface IState {
  // episodes: Array<object>;
  // episodes: IEpisode[];
  episodes: Array<IEpisode>;
  favorites: Array<IEpisode>;
}

export interface IAction {
  type: string;
  payload: Array<IEpisode> | any;
}

export interface IEpisodeProps {
  episodes: IEpisode[];
  store: { state: IState; dispatch: Dispatch };
  favorites: IEpisode[];
  toggleFavAction: (state: IState, dispatch: Dispatch, episode: IEpisode) => IAction;
}
