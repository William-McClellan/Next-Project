
export class TodoModel{
    constructor(){
        this.todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
    
    }
   
    bindtodoArrChanged(callback){
        this.todoArrChanged = callback
    }

    _commit(todoArr){
        this.todoArrChanged(todoArr)
        localStorage.setItem("todoArr", JSON.stringify(todoArr))
    }

    addTodo(todoText){
        const todo = {
            text: todoText,
            id: this.todoArr.length,
            complete: false
        }
        this.todoArr.push(todo)
        this._commit(this.todoArr)
    }

    deleteTodo(id){
        this.todoArr = this.todoArr.filter(todoArr => todoArr.id !== id)
        this._commit(this.todoArr)
    }

    toggleComplete(id){
        this.todoArr = this.todoArr.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit(this.todoArr)
    }

    editTodo(id, editText){
        this.todoArr= this.todoArr.map(
            todo => todo.id === id ? {text: editText, id: todo.id, complete: todo.complete} : todo 
        )

        this._commit(this.todoArr)
    }

    
    
    getTodoArr(){
        const todoArr = this.todoArr;
        return todoArr;
    }
}

const instance = new TodoModel();

export default instance;
