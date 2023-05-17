import projModelInstance from '../model/proj-model.js'

export class TodoController{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.projModel = projModelInstance;
    }

    handleClick(event){
        event.target.addEventListener('click', event => {
            event.stopPropagation(); 
    })
    }
      
    handleSaveHeight = (id, height) => {
        this.model.saveTextareaHeight(id, height);
    }

    handleGetHeight = (id) =>{
        return this.model.getTextareaHeight(id);
    }

     handleFocusOut(event) {
        console.log("handleFocusOut event triggered");
        const targetElement = event.target;

        if (targetElement.classList.contains('editable')) {
            let editText = targetElement.value;
            let id = targetElement.parentElement.id;
            if (targetElement.parentElement.classList.contains('todo-list-item')) {
                this.model.editTodo(id, editText);
            }

            if (targetElement.parentElement.classList.contains('first-step-item')) {
                const projId = this.projModel.getProjIdByStepId(id);
                this.model.editFirstStep(id, editText, projId);
            }
        }

    }

    addFocusOutListener() {
        document.getElementById('root').addEventListener('focusout', this.handleFocusOut.bind(this));
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

