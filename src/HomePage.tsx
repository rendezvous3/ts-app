import React, { useContext } from 'react';
import { Store } from './Store';
import { IEpisodeProps } from './interfaces';
import { fetchDataAction, toggleFavAction } from './actions';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function HomePage(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch);
  });

  const episodeListProps: IEpisodeProps = {
    episodes: state.episodes,
    store: { state, dispatch },
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
