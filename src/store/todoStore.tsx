import { createContext } from 'react';
import { observable, action, computed, runInAction } from 'mobx';

import Todo from './models/interfaces/Todo';

const initialState: Todo[] = [
	{
		userId: 1,
		id: Math.random(),
		title: 'Learn MobX',
		completed: false,
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with React-Toolkit',
		completed: true,
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Figure out why it doesnt get deleted',
		completed: true,
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with MobX-Map',
		completed: false,
	},
];

class TodoStore {
	@observable todos: Todo[] = [];
	@observable selectedTodo?: Todo;

  @action loadTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    runInAction(() => {
      this.todos = data.slice(0, 15);
    })
  }

  @action addTodo = (title: string) => {
    const newTodo: Todo = {
      userId: 1,
      id: this.generateId(),
      title,
      completed: false
    }

    this.todos.push(newTodo);
  }

  @action toggleCompleted = (id: number) => {
    const todo = this.todos.find(todo => todo.id === id);
    if(!todo) return;
    todo.completed = !todo.completed;
  }

  @action editTodo = (title: string) => {
    const index = this.todos.findIndex(todo => todo.id === this.selectedTodo!.id);
    
    if(index === -1 || !this.selectedTodo) return;

    const editedTodo = {
      userId: this.selectedTodo.userId,
      id: this.selectedTodo.id,
      title,
      completed: this.selectedTodo.completed
    }

    this.todos.splice(index, 1, editedTodo);
  }

  @action deleteTodo = (id: number) => {
    const index = this.todos.findIndex(todo => todo.id === id);
    if(index === -1) return;
    this.todos.splice(index, 1);
  }

  @action selectTodo = (id: number) => {
    const selected = this.todos.find(todo => todo.id === id);
    if(!selected) return;
    this.selectedTodo = selected;
  }

  @action deselect = () => {
    this.selectedTodo = undefined;
  }

  @computed get getUnfinishedTodoCount(): number{
    return this.todos.filter(todo => todo.completed === false).length;
  }

	private generateId = (): number => {
		return Math.random();
	};
}

export default createContext(new TodoStore());
