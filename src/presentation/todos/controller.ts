import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy Milk', createdAt: new Date() },
    { id: 2, text: 'Walk the dog', createdAt: new Date() },
    { id: 3, text: 'Read a book', createdAt: new Date() },
];

export class TodosController {

    constructor() {}

    public getTodos(req: Request, res: Response) {
        return res.json( todos );
    };

    public getTodoById(req: Request, res: Response) {
        const id = +req.params.id;
        
        const todo = todos.find(todo => todo.id === id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        };

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        } else {
            return res.json( todo );
        };
    };

    public createTodo(req: Request, res: Response) {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        };

        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date(),
        };
        todos.push(newTodo);
        return res.status(201).json( newTodo );
    };

    public updateTodo(req: Request, res: Response) {
        
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        };
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        };

        const { text, createdAt } = req.body;
        
        todo.text = text || todo.text;
        createdAt ? todo.createdAt = new Date(createdAt) : null;


        return res.json( todo );
    };

    public deleteTodo = (req:Request, res: Response) => {
    const id = +req.params.id;

    const todo = todos.find(todo => todo.id === id );
    if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

    todos.splice( todos.indexOf(todo), 1 );
    res.json( todo );

  };
};