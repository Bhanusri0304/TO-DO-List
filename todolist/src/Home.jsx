import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsCheckCircleFill } from 'react-icons/bs';

function Home() {
    const handleToggleDone = (id, done) => {
        axios.put(`http://localhost:3001/todos/${id}`, { done: !done })
            .then(() => fetchTodos())
            .catch(err => console.error('Error toggling done:', err));
    };
    const [todos, setTodos] = useState([]);
    const fetchTodos = () => {
        axios.get('http://localhost:3001/todos')
        .then(result => setTodos(result.data))
        .catch(err => console.error('Error fetching todos:', err));
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEdit = (id) => {
        // Logic to edit a todo
        const newTask = prompt('Edit todo:', todos.find(todo => todo._id === id).task);
        if (newTask) {
            axios.put(`http://localhost:3001/todos/${id}`, { task: newTask })
                .then(result => {
                    setTodos(todos => todos.map(todo => todo._id === id ? result.data : todo));
                })
                .catch(err => console.error('Error updating todo:', err));
        }
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/todos/${id}`)
            .then(() => setTodos(todos => todos.filter(todo => todo._id !== id)))
            .catch(err => console.error('Error deleting todo:', err));
    }
    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create onAdd={fetchTodos} />
        {
            todos.length === 0
             ? 
             <div><h2></h2>No todos available</div> 
             :
            todos.map(todo =>(
                <div className='task' key={todo._id}>
                    <div className='checkbox'>
                        <span onClick={() => handleToggleDone(todo._id, todo.done)}>
                            {todo.done ? <BsCheckCircleFill className="icon" style={{ color: 'green' }} /> : <BsCircleFill className="icon" />}
                        </span>
                        <p style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.task}</p>
                    </div>
                    <div>
                        <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className="icon" /></span>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default Home