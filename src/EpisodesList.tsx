import React from 'react';
import { IEpisode } from './interfaces';

function EpisodesList(props: any): Array<JSX.Element> {
  const { episodes, toggleFavAction, favorites, store } = props;
  const { state, dispatch } = store;
  return episodes.map((episode: IEpisode) => {
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
          <button type='button' onClick={() => toggleFavAction(state, dispatch, episode)}>
            {favorites.find((fav: IEpisode) => fav.id === episode.id)
              ? 'Unfav'
              : 'Fav'}
          </button>
        </div>
      </div>
    );
  });
}

export default EpisodesList;
