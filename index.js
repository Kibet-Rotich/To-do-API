const express = require('express');
const app = express();

const port = 3000;
app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("We couldn't find your todo");
    }
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: nextId++,
        title: req.body.title,
        description: req.body.description
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.title = req.body.title;
        todo.description = req.body.description;

        res.json(todo);
    } else {
        res.status(404).send('To-Do item not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
