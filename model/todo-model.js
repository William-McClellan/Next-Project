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
        // console.log("🚀 ~ file: todo-model.js:46 ~ TodoModel ~ editTodo TRIGGERED")
        const todoIndex = this.todoArr.findIndex(todo => todo.id === id);
        this.todoArr[todoIndex].text = editText;
        // console.log("🚀 ~ file: todo-model.js:48 ~ TodoModel ~        this.todoArr[todoIndex]:",        this.todoArr[todoIndex])
        this._commit();
    }

    editFirstStep(id, editText, projId){    
        // console.log("🚀 ~ file: todo-model.js:53 ~ TodoModel ~ editFirstStep ~ id:", id)
        // console.log("🚀 ~ file: todo-model.js:53 ~ TodoModel ~ editFirstStep ~ projId:", projId)
        const proj = this.projModel.getProjById(projId);
        // console.log("🚀 ~ file: todo-model.js:55 ~ TodoModel ~ editFirstStep ~ proj", proj)
        if (proj) {
            const stepIndexInProj = proj.stepArr.findIndex(step => step.id === id);
            // console.log("🚀 ~ file: todo-model.js:58 ~ TodoModel ~ editFirstStep ~ stepIndexInProj", stepIndexInProj)
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
    // console.log("🚀 ~ file: todo-model.js:58 ~ TodoModel ~ deleteFirstStep ~ stepId:", stepId)
    const proj = this.projModel.getProjById(projId);
            console.log(proj.stepArr.stepId)

    // console.log("🚀 ~ file: todo-model.js:59 ~ TodoModel ~ deleteFirstStep ~ proj:", proj)
    if (proj) {
        const stepIndexInProj = proj.stepArr.findIndex(step => step.id === stepId);
        // console.log("🚀 ~ file: todo-model.js:62 ~ TodoModel ~ deleteFirstStep ~ proj.stepArr:", proj.stepArr)
        // console.log("🚀 ~ file: todo-model.js:62 ~ TodoModel ~ deleteFirstStep ~ stepIndexInProj:", stepIndexInProj)
        if(stepIndexInProj !== -1){
            proj.stepArr.splice(stepIndexInProj, 1);
            console.log(proj.stepArr.stepId)
            this.projModel.updateProjectSteps(projId, proj.stepArr);
        }
    }
    this.projModel.deleteStepFromFirstStepArr(stepId);
    this._commit();
    }
}


const todoModelInstance = new TodoModel();

export default todoModelInstance;
