import React from 'react';

export const initialState = {};

export const Store = React.createContext(initialState);

export function reducer() {
  // pass
}

export function StoreProvider(props: any): JSX.Element {
  return <Store.Provider value='test'>{props.children}</Store.Provider>;
}
