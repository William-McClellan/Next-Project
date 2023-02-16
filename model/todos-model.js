export class Model{
    constructor(){
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];

        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
    }

    bindTodosChanged(callback){
        this.todosChanged = callback
    }

    _commit(todos){
        this.todosChanged(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    addTodo(todoText){
        const todo = {
            text: todoText,
            id: this.todos.length,
            complete: false
        }
        this.todos.push(todo)
        this._commit(this.todos)
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id)
        this._commit(this.todos)
    }

    toggleComplete(id){
        this.todos = this.todos.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit(this.todos)
    }

    editTodo(id, editText){
        this.todos = this.todos.map(
            todo => todo.id === id ? {text: editText, id: todo.id, complete: todo.complete} : todo 
        )

        this._commit(this.todos)
    }
}