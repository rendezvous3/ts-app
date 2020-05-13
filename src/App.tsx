import React, { useContext } from 'react';
import { Store } from './Store';
import { Link } from '@reach/router';

export default function App(props: any): JSX.Element {
  const { state } = useContext(Store);
  return (
    <div data-testid='component-app'>
      <div>
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode</p>
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorite(s): {state.favorites.lengh}</Link>
      </div>
      {props.children}
    </div>
  );
}
