import React, { useEffect, useContext } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import todoStore from './store/todoStore';

function App() {

  const store = useContext(todoStore);

  // useEffect(() => {
  //   store.loadTodos();
  // }, [store])

  return (
    <div className="container">
      <TodoList />
      <TodoForm />
    </div>
  );
}

export default App;
