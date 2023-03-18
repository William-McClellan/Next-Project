
export class TodoModel{
    constructor(){
        this.todo = JSON.parse(localStorage.getItem("todo")) || [];
    
    }
   
    bindtodoChanged(callback){
        this.todoChanged = callback
    }

    _commit(todo){
        this.todoChanged(todo)
        localStorage.setItem("todo", JSON.stringify(todo))
    }

    addTodo(todoText){
        const todo = {
            text: todoText,
            id: this.todo.length,
            complete: false
        }
        this.todo.push(todo)
        this._commit(this.todo)
    }

    deleteTodo(id){
        this.todo = this.todo.filter(todo => todo.id !== id)
        this._commit(this.todo)
    }

    toggleComplete(id){
        this.todo = this.todo.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit(this.todo)
    }

    editTodo(id, editText){
        this.todo = this.todo.map(
            todo => todo.id === id ? {text: editText, id: todo.id, complete: todo.complete} : todo 
        )

        this._commit(this.todo)
    }

    
    
    gettodo(){
        const todo = this.todo;
        return todo;
    }
}

const instance = new TodoModel();

export default instance;
