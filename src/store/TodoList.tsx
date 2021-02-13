import AsyncStorage from '@react-native-community/async-storage';
import {makeAutoObservable} from 'mobx';
import {create, persist} from 'mobx-persist';
import {useContext} from 'react';
import {createContext} from 'react';

export interface Todo {
  id: number;
  textTask: string;
}

class TodoList {
  @persist('list') todoStore: Array<Todo> = [];
  @persist total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  adicionarTodo = (todo: Todo) => {
    this.todoStore = [...this.todoStore, todo];
    this.total += 1;
  };

  removerTodo = (item: Todo) => {
    this.todoStore = [...this.todoStore.filter((tasks) => tasks !== item)];
  };
}

export const hydrate = create({
  storage: AsyncStorage, // or AsyncStorage in react-native.
  // default: localStorage
  jsonify: true, // if you use AsyncStorage, here shoud be true
  // default: true
});

//---

/**
 * Instância do estado geral
 */
const state = new TodoList();

/**
 * Contexto de estado
 */
const context = createContext(state);

/**
 * Hook de estado geral
 */
const useStore = (): TodoList => useContext(context);

export default useStore;
