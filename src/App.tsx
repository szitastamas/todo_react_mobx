import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="container">
      <TodoList />
      <TodoForm />
    </div>
  );
}

export default App;
