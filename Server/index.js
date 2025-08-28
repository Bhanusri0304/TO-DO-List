const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.put('/todos/:id', (req, res) => {
    TodoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err }));
});

app.delete('/todos/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
        .then(result => res.json({ message: 'Todo deleted', result }))
        .catch(err => res.status(500).json({ error: err }));
});

app.get('/todos', (req, res) => {
    TodoModel.find()
        .then(todos => res.json(todos))
        .catch(err => {
            console.error('Error fetching todos:', err);
            res.status(500).json({ error: err });
        });
});

app.post('/add', (req, res) => {
    console.log('Received body:', req.body);
    const task = req.body.task;
    if (!task || typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ error: 'Task is required and must be a non-empty string.' });
    }
    TodoModel.create({ task: task, done: false })
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error saving todo:', err);
            res.status(500).json({ error: err });
        });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});