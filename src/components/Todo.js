import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  const handleDelete = id => {
    removeTodo(id);
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <><div
      className={todo.isComplete ? 'todo-row complete bg-nvidia/50 inline w-full' : 'todo-row bg-nvidia inline'}
      key={index} onClick={() => completeTodo(todo.id)}
    >
      <div className='inline' key={todo.id}>
        {todo.text}
      </div>
    </div><div className='icons inline'>
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon inline' />
        <RiCloseCircleLine
          onClick={() => handleDelete(todo.id)}
          className='delete-icon inline' />
      </div></>
  ));
};

export default Todo;