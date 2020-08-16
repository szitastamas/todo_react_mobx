import React, { useContext } from 'react'
import Todo from '../store/models/interfaces/Todo/ITodo';
import { observer } from 'mobx-react-lite';

import todoStore from '../store/todoStore';

const TodoItem: React.FC<{ todo: Todo} > = ({ todo }) => {

  const { selectedTodo, selectTodo, deleteTodo, toggleCompleted } = useContext(todoStore)

  return (
    <tr className={`todo-item ${todo.urgent && 'urgent'}`} style={{textAlign: "center", padding: ".3rem .6rem"}}>
      <td>{ todo.userId }</td>
      <td>{ (todo.id*100).toFixed(2) }</td>
      <td className={`todo-title ${(selectedTodo && selectedTodo.id === todo.id) && "selected"}`} onClick={() => selectTodo(todo.id)}>{ todo.title }</td>
      <td className={`status ${todo.completed && "completed"}`} onClick={() => toggleCompleted(todo.id)}>{ todo.completed ? "Completed" : "In Progress" }</td>
      <td><button onClick={() => deleteTodo(todo.id)}>Delete</button></td>
    </tr>
  )
}

export default observer(TodoItem);
