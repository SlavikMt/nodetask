const Todo = require('../models/todo.model')

exports.todo_create = function(req, res) {
    let todo = new Todo({
        task: req.body.task,
        done: req.body.done
    })


    todo.save()
        .then((todo) => {
            console.log('Task:', todo)
            res.send('Task created')
        })
        .catch(err => {
            console.log(err);
            next({
                status: 400,
                error: err
            });
        })
};


exports.todo_details = (req, res) => {
    Todo.find({}, (err, todo) => {
        if (err) return next(err);
        res.send(todo)
    })
}


exports.todo_update = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
        if (err) return next(err);
        res.send('Task updated')
    });
}



exports.todo_delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('task deleted')
    })
}