import React from 'react';
import { IAction, IState } from './interfaces';

export const actionsTypes = {
  FETCH_DATA: 'FETCH_DATA',
  ADD_FAVORITES: 'ADD_FAVORITES',
  REMOVE_FAVORITES: 'REMOVE_FAVORITES',
};

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes
export const initialState: IState = {
  episodes: [],
  favorites: [],
};

// export const Store = React.createContext<IState | any>(initialState);
export const Store = React.createContext<IState | any>(initialState);

export function reducer(state: IState, action: IAction): IState {
  const { FETCH_DATA, ADD_FAVORITES, REMOVE_FAVORITES } = actionsTypes;
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, episodes: action.payload };
    case ADD_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
