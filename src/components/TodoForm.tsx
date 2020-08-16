import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import todoStore from '../store/todoStore';
import ITodo from '../store/models/interfaces/ITodo';
import CustomInput from './utility/CustomInput';

const TodoForm = () => {
	const { getUnfinishedTodoCount, selectedTodo, addTodo, editTodo, deselect } = useContext(todoStore);

  const [title, setTitle] = useState('');
  const [urgent, setUrgent] = useState(false);
	const [isEditState, setIsEditState] = useState(false);


  useEffect(() => {
    
    if(selectedTodo){
      setIsEditState(true)
      setTitle(selectedTodo.title)
      setUrgent(selectedTodo.urgent)
    }

  }, [selectedTodo])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(title.replace(/ /g, "").length === 0){
      return;
    }

    const editedTodo: ITodo = {
      ...selectedTodo!,
      title,
      urgent
    }
    console.log(editedTodo);
    isEditState ? editTodo(editedTodo) : addTodo({ title, urgent });

    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setUrgent(false);
    setIsEditState(false);
    deselect();
  }

	return (
		<div className='form-container'>
			<h5>You have {getUnfinishedTodoCount} unfinished todo(s).</h5>
			<form id='todo-form' onSubmit={handleSubmit}>
        <CustomInput elementId="title" elementType="text" labelText="Title" value={title} action={setTitle} />
        <CustomInput elementId="urgent" elementType="checkbox" labelText="Check if todo is urgent..." value={urgent} action={setUrgent} />
				<button type='submit'>{isEditState ? 'Edit Todo' : 'Add Todo'}</button>
        { isEditState && <button onClick={resetForm}>Cancel</button> }
			</form>
		</div>
	);
};

export default observer(TodoForm);
