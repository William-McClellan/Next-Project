import projModelInstance from '../model/proj-model.js'
export class TodoController{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.projModel = projModelInstance;
    }

    todoChanged = (todoArr) =>{
        view.displayTodoList(todoArr)
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

    handleDeleteFirstStep = (projId, stepId) =>{
        this.model.deleteFirstStep(projId, stepId);
    }

    handleEditFirstStep = (stepId, editText) =>{
        const projId = this.projModel.getProjIdByStepId(stepId);
        this.model.editFirstStep(stepId, editText, projId);
    }
}

