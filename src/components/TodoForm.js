import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props, saveTasks) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  const saveTask = e => {
    saveTasks(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 mx-16 space-y-4'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className="inline-block Input block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia"
          />
          <button onClick={handleSubmit} className="inline-block w-32 h-12 bg-green-500 rounded-lg login">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className="inline-block Input block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="inline-block w-32 h-12 bg-green-500 rounded-lg login">
            Add ToDo
          </button>
        </>
      )}
      <button onClick={saveTask} className="inline-block w-32 h-12 bg-green-500 rounded-lg login">
            Save ToDo
          </button>
    </form>
  );
}

export default TodoForm;
