import { createContext } from 'react';
import { observable, action, computed, runInAction } from 'mobx';

import Todo from './models/interfaces/ITodo';
import ITodo from './models/interfaces/ITodo';

const initialState: Todo[] = [
	{
		userId: 1,
		id: Math.random(),
		title: 'Learn MobX',
    completed: false,
    urgent: true
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with React-Toolkit',
    completed: true,
    urgent: false
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Figure out why it doesnt get deleted',
    completed: true,
    urgent: true
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with MobX-Map',
    completed: false,
    urgent: true
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

  @action addTodo = ({ title, urgent }: { title: string, urgent: boolean }) => {
    const newTodo: Todo = {
      userId: 1,
      id: this.generateId(),
      title,
      completed: false,
      urgent
    }

    this.todos.push(newTodo);
  }

  @action toggleCompleted = (id: number) => {
    const todo = this.todos.find(todo => todo.id === id);
    if(!todo) return;
    todo.completed = !todo.completed;
  }

  @action editTodo = (editedTodo: ITodo) => {
    const index = this.todos.findIndex(todo => todo.id === editedTodo.id);
    
    if(index === -1 || !this.selectedTodo) return;

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
