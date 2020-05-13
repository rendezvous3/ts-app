import { IAction, IEpisode, IState } from './interfaces';
import { actionsTypes } from './Store';


export const fetchDataAction = async (dispatch: any) => {
  const URL =
    'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch({
    type: actionsTypes.FETCH_DATA,
    payload: dataJSON._embedded.episodes,
  });
};

export const toggleFavAction = (state: IState, dispatch: any, episode: IEpisode | any): IAction => {
  const episodeInFav = state.favorites.includes(episode);
  let dispatchObj = {
    type: actionsTypes.ADD_FAVORITES,
    payload: episode,
  };
  if (episodeInFav) {
    const favWithoutEpisode = state.favorites.filter(
      (fav: IEpisode) => fav.id !== episode.id
    );
    dispatchObj = {
      type: actionsTypes.REMOVE_FAVORITES,
      payload: favWithoutEpisode,
    };
  }
  return dispatch(dispatchObj);
};