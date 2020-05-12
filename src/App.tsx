import React, { useContext } from 'react';
import { Store } from './Store';

export default function App(): JSX.Element {
  const store = useContext(Store);
  return (
    <div data-testid='component-app'>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode</p>
    </div>
  );
}
