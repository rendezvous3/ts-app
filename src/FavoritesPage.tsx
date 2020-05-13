import React, { useContext } from 'react';
import { Store } from './Store';
import { fetchDataAction, toggleFavAction } from './actions';
import { IEpisodeProps } from './interfaces';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function FavoritesPage(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  const episodeListProps: IEpisodeProps = {
    episodes: state.favorites,
    store: { state, dispatch },
    favorites: state.favorites,
    toggleFavAction: toggleFavAction,
  };

  return (
    <React.Suspense fallback={<div>...Loading</div>}>
      <EpisodeList {...episodeListProps} />
    </React.Suspense>
  );
}
