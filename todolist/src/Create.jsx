import React, { useState } from 'react'
import axios from 'axios'
function Create({ onAdd }) {
    const [task, setTask] = useState('');
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task : task })
            .then(response => {
                console.log(response.data);
                if (onAdd) onAdd();
            })
            .catch(error => {
                console.error('Error adding todo:', error);
            });
    }
  return (
    <div className="create_form">
        <input type="text" placeholder='Add a new task' onChange={(e) => setTask(e.target.value)} />
        <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create