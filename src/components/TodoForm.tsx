import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import todoStore from '../store/todoStore';

const TodoForm = () => {
	const { getUnfinishedTodoCount, selectedTodo, addTodo, editTodo, deselect } = useContext(todoStore);

	const [title, setTitle] = useState('');
	const [isEditState, setIsEditState] = useState(false);


  useEffect(() => {
    
    if(selectedTodo){
      setIsEditState(true)
      setTitle(selectedTodo.title)
    }

  }, [selectedTodo])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(title.replace(/ /g, "").length === 0){
      return;
    }

    isEditState ? editTodo(title) : addTodo(title);

    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setIsEditState(false);
    deselect();
  }

	return (
		<div className='form-container'>
			<h5>You have {getUnfinishedTodoCount} unfinished todo(s).</h5>
			<form id='todo-form' onSubmit={handleSubmit}>
				<label htmlFor='title'>Title</label>
				<input type='text' name='title' id='title' value={title} onChange={handleChange}/>
				<button type='submit'>{isEditState ? 'Edit Todo' : 'Add Todo'}</button>
        { isEditState && <button onClick={resetForm}>Cancel</button> }
			</form>
		</div>
	);
};

export default observer(TodoForm);
