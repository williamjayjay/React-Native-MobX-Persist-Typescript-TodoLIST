import React from 'react';
import Stores from './src/store';
import {Provider} from 'mobx-react';
import Home from './src/pages/Home';
import {useEffect} from 'react';
import useStore, {hydrate} from './src/store/TodoList';

const App = () => {
  const store = useStore();

  useEffect(() => {
    hydrate('todostore', store).then(() =>
      console.log('someStore has been hydrated'),
    );
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
