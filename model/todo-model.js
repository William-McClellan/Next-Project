import { ProjModel } from "./proj-model.js";
export class TodoModel{
    constructor(){
        this.todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
        this.projModel = new ProjModel();   
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || this.projModel.getProjArr();
        this.firstStepArr = JSON.parse(localStorage.getItem("firstStepArr")) || this.projModel.getFirstStepArr();
        
        console.log('this.projArr from TodoModel constructor: ', this.projArr);
    }

   
    bindTodoArrChanged(callback){
        const projArr = this.projModel.getProjArr();
        const firstStepArr = this.projModel.getFirstStepArr();
        this.todoArrChanged = () => callback(projArr, firstStepArr);    
    }

    _commit(projArr, firstStepArr){
        this.todoArrChanged(projArr, firstStepArr)
    }

    addTodo(todoText){
        const todo = {
            text: todoText,
            id: this.todoArr.length,
            complete: false
        }
        this.todoArr.push(todo)
        this._commit(this.projModel.getProjArr(), this.projModel.getFirstStepArr())
    }

    deleteTodo(id){
        this.todoArr = this.todoArr.filter(todoArr => todoArr.id !== id)
        this._commit(this.projModel.getProjArr(), this.projModel.getFirstStepArr())
        console.log('deleteTodo method ran')
    }

    toggleComplete(id){
        this.todoArr = this.todoArr.map(
            todo => todo.id === id ? {text: todo.text, id: todo.id, complete: !todo.complete} : todo
            )

        this._commit(this.projModel.getProjArr(), this.projModel.getFirstStepArr())
    }

    editTodo(id, editText){
        this.todoArr= this.todoArr.map(
            todo => todo.id === id ? {text: editText, id: todo.id, complete: todo.complete} : todo 
        )

        this._commit(this.projModel.getProjArr(), this.projModel.getFirstStepArr())
    }

    getTodoArr(){
        const todoArr = this.todoArr;
        return todoArr;
    }

    deleteFirstStep(projId){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        
        if (projIndex !== -1) {
        this.projArr[projIndex].stepArr.splice(0,1);
        console.log('this.projArr[projIndex].stepArr = ', this.projArr[projIndex].stepArr)

        this.firstStepArr = this.projModel.getFirstStepArr();

        this._commit(this.projArr, this.firstStepArr);
        }
    }
}

const instance = new TodoModel();

export default instance;
