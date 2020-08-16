import { createContext } from 'react';
import { observable, action, computed, runInAction } from 'mobx';

import Todo from './models/interfaces/Todo/ITodo';
import ITodo from './models/interfaces/Todo/ITodo';
import alertStore from './alertStore';
import IAlertStore from './models/interfaces/Alert/IAlertStore';
import ITodoStore from './models/interfaces/Todo/ITodoStore';

const initialState: Todo[] = [
	{
		userId: 1,
		id: Math.random(),
		title: 'Learn MobX',
    completed: false,
    urgent: true,
    dueDate: "2020-08-21"
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with React-Toolkit',
    completed: true,
    urgent: false,
    dueDate: "9999-99-99"
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Figure out why it doesnt get deleted',
    completed: true,
    urgent: true,
    dueDate: "2020-08-17"
	},
	{
		userId: 1,
		id: Math.random(),
		title: 'Practise with MobX-Map',
    completed: false,
    urgent: false,
    dueDate: "9999-99-99"
	},
];

class TodoStore implements ITodoStore {

  public alertStore: IAlertStore;

  constructor(alertStore: IAlertStore){
    this.alertStore = alertStore;
  }

	@observable todos: Todo[] = initialState;
	@observable selectedTodo?: Todo;

  @action loadTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    runInAction(() => {
      this.todos = data.slice(0, 15);
    })
  }

  @action addTodo = ({ title, urgent, dueDate }: { title: string, urgent: boolean, dueDate: string }) => {
    const newTodo: Todo = {
      userId: 1,
      id: this.generateId(),
      title,
      completed: false,
      urgent,
      dueDate
    }

    this.alertStore.addAlert({
      id: Math.random(),
      text: `${title} added.`,
      type: "success",
      duration: 3000
    })
    
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

    this.alertStore.addAlert({
      id: Math.random(),
      text: `${editedTodo.title} updated.`,
      type: "success",
      duration: 3000
    })

    this.todos.splice(index, 1, editedTodo);
  }

  @action deleteTodo = (id: number) => {
    const index = this.todos.findIndex(todo => todo.id === id);
    if(index === -1) return;
    this.todos.splice(index, 1);
    this.alertStore.addAlert({
      id: Math.random(),
      text: `Todo deleted.`,
      type: "success",
      duration: 3000
    })
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

  @computed get getUnfinishedUrgentTodoCount(): number{
    return this.todos.filter(todo => !todo.completed && todo.urgent).length;
  }

	private generateId = (): number => {
		return Math.random();
	};
}

export default createContext(new TodoStore(alertStore));
