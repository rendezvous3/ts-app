import React, { useContext } from 'react';
import { Store, actionsTypes } from './Store';
import { IAction, IEpisode, IEpisodeProps } from './interfaces';
import { Link } from '@reach/router';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function HomePage(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: actionsTypes.FETCH_DATA,
      payload: dataJSON._embedded.episodes,
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
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

  const episodeListProps: IEpisodeProps = {
    episodes: state.episodes,
    favorites: state.favorites,
    toggleFavAction: toggleFavAction,
  };

  console.log('STATE ', state);
  return (
    <div data-testid='component-home-page'>
      <div data-testid='episodes-list'>
        {state.episodes.length && (
          <React.Suspense fallback={<div>...Loading</div>}>
            <EpisodeList {...episodeListProps} />
          </React.Suspense>
        )}
      </div>
    </div>
  );
}
