export class Controller{
    constructor(model, view){
        this.model = model
        this.view = view

        this.model.bindTodosChanged(this.todosChanged)

        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleComplete(this.handleToggleComplete)
        this.view.bindEditTodo(this.handleEditTodo)

        this.todosChanged(this.model.todos)

    }

    todosChanged = todos =>{
        this.view.displayTodoList(todos)
    }

    handleAddTodo = todoText =>{
        this.model.addTodo(todoText)
    }

    handleDeleteTodo = id =>{
        this.model.deleteTodo(id)
    }

    handleToggleComplete = id =>{
        this.model.toggleComplete(id)
    }

    handleEditTodo = (id, editText)=>{
        this.model.editTodo(id, editText)
    }

}
