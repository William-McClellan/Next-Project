export class TodosController{
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    todosChanged = (todos) =>{
        view.displayTodoList(todos)
    }

    handleAddTodo = (todoText) =>{
        this.model.addTodo(todoText)
    }

    handleDeleteTodo = (id) =>{
        this.model.deleteTodo(id)
    }

    handleToggleComplete = (id) =>{
        this.model.toggleComplete(id)
    }

    handleEditTodo = (id, editText)=>{
        this.model.editTodo(id, editText)
    }

}
