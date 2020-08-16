import React, { useContext } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Alert from './components/Alert/Alert';
import { observer } from 'mobx-react-lite';
import todoStore from './store/todoStore';

function App() {

  const { alertStore } = useContext(todoStore);

  return (
    <div className="container">
      <TodoList />
      <TodoForm />
      { alertStore.alerts.length > 0 && alertStore.alerts.map(alert => <Alert key={alert.id} alert={alert} />) }
    </div>
  );
}

export default observer(App);
