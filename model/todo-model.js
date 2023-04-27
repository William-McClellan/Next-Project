import projModelInstance from "./proj-model.js";
export class TodoModel{
    constructor(){
        this.todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
        this.projModel = projModelInstance;   
        
        this.todoArrChanged = () => {};
    }
 
   
    bindTodoArrChanged(callback){
        this.todoArrChanged = () => callback();    
    }

    _commit(){
        this.todoArrChanged()
        localStorage.setItem("todoArr", JSON.stringify(todoModelInstance.getTodoArr()))
    }

    addTodo(todoText){
        const todo = {
            text: todoText,
            id: crypto.randomUUID(),
            complete: false
        }
        this.todoArr.push(todo)
        this._commit()
    }
 
    
    deleteTodo(id){
        this.todoArr = this.todoArr.filter(todoArr => todoArr.id !== id)
        this._commit()
    }

    toggleComplete(id){
        this.todoArr = this.todoArr.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit()
    }

    editTodo(id, editText){
        this.todoArr= this.todoArr.map(
            todo => todo.id === id ? {text: editText, id: todo.id, complete: todo.complete} : todo 
        )

        this._commit()
    }

    getTodoArr(){
        const todoArr = this.todoArr;
        return todoArr;
    }

    deleteFirstStep(projId, stepId){
        
    const proj = this.projModel.getProjById(projId);
    
    if (proj) {
        const stepIndexInProj = proj.stepArr.findIndex(step => step.id === proj.stepId);

        if(stepIndexInProj !== -1){
            proj.stepArr.splice(stepIndexInProj, 1);
            // 1. does updateProjectSteps need to be fixed in proj-model.js?
            this.projModel.updateProjectSteps(projId, proj.stepArr);
        }
    }

    
    this.projModel.deleteStepFromFirstStepArr(stepId);
    this._commit();
    }
}


const todoModelInstance = new TodoModel();

export default todoModelInstance;
