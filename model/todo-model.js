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
        const newTodoArr = this.todoArr.filter(todo => todo.id !== id);
        this.todoArr = newTodoArr;
        this._commit()
    }

    toggleComplete(id){
        this.todoArr = this.todoArr.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit()
    }

    editTodo(id, editText){
        const todoIndex = this.todoArr.findIndex(todo => todo.id === id);
        this.todoArr[todoIndex].text = editText;
        this._commit();
    }

    editFirstStep(id, editText, projId){    
        const proj = this.projModel.getProjById(projId);
        if (proj) {
            const stepIndexInProj = proj.stepArr.findIndex(step => step.id === id);
            if(stepIndexInProj !== -1){
                proj.stepArr[stepIndexInProj].text = editText;
                this.projModel.updateProjectSteps(projId, proj.stepArr);
            }
        }
        this._commit();
    }

    getTodoArr(){
        const todoArr = this.todoArr;
        return todoArr;
    }

    deleteFirstStep(projId, stepId){
    const proj = this.projModel.getProjById(projId);

    if (proj) {
        const stepIndexInProj = proj.stepArr.findIndex(step => step.id === stepId);
        if(stepIndexInProj !== -1){
            proj.stepArr.splice(stepIndexInProj, 1);
            this.projModel.updateProjectSteps(projId, proj.stepArr);
        }
    }
    this.projModel.deleteStepFromFirstStepArr(stepId);
    this._commit();
    }

    saveTextareaHeight(id, height) {
        localStorage.setItem(`textareaHeight-${id}`, height);
    }

    getTextareaHeight(id) {
       const textareaHeight = localStorage.getItem(`textareaHeight-${id}`);
       if(textareaHeight === null){
            return 0;
       } 
        return textareaHeight; 
    }

}

const todoModelInstance = new TodoModel();

export default todoModelInstance;
