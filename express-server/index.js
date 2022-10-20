const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

/* Routes */
/* Create a new todo */
app.post('/todos', async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo_table (description) VALUES ($1) RETURNING *', [description]);
        res.json(newTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

/* Get all todos */
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo_table');
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

/* Get a todo */
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo_table WHERE id = $1', [id]);
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
});

/* Update a todo */
app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query('UPDATE todo_table SET description = $1 WHERE id = $2', [description, id]);
        res.json('Update successful.');
    } catch (error) {
        console.log(error.message);
    }
});

/* Delete a todo */
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo_table WHERE id = $1', [id]);
        res.json('Delete successful.');
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log('Server has started on port 5000.');
});