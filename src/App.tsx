import React, { useContext } from 'react';
import { Store, actionsTypes } from './Store';
import { IAction, IEpisode } from './interfaces';

export default function App(): JSX.Element {
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

  console.log('STATE ', state);
  return (
    <div data-testid='component-app'>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode</p>
      <div data-testid='episodes-list'>
        {state.episodes.length &&
          state.episodes.map((episode: IEpisode) => {
            // console.log('EPISODE', episode.image);
            return (
              <div data-testid='episode-list-item' key={episode.id}>
                {episode.image && (
                  <img
                    src={episode.image.medium}
                    alt={`Rick and Morty ${episode.name}`}
                  />
                )}

                <div>{episode.name}</div>
                <div>
                  <div>
                    Season: {episode.season} Number: {episode.number}
                  </div>
                  <button
                    type='button'
                    onClick={() => toggleFavAction(episode)}
                  >
                    {state.favorites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
