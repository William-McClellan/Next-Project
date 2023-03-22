export class ProjModel{
    constructor(){
        
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];

        this.projArr.text = '';
        this.projArr.id = this.projArr.length;
        this.projArr.complete =  false;
        this.projArr.stepArr = [];
        

    }

// PROJECT METHODS
    bindProjChanged(callback){
        this.projChanged = callback
    }

      _commit(projArr){
        this.projChanged(projArr)
        localStorage.setItem("projArr", JSON.stringify(projArr))
    }

    addProject(projectText, input){
        const project = {
            text: projectText,
            id: this.projArr.length,
            complete: false,
            newStepInput: input,
            stepArr: []
        }
        this.projArr.push(project)
        this._commit(this.projArr)
    }

    deleteProject(id){
        this.projArr = this.projArr.filter(project => project.id !== id);
        this._commit(this.projArr);
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )

        this._commit(this.projArr)
    }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

        this._commit(this.projArr)
    }

    getproj(){
        const proj = this.projArr;
        return proj;
    }

// STEP METHODS
    
    addStep(stepText){
        const step = {
            text: stepText,
            id: new Date().getTime,
            complete: false
        }
        this.projArr.stepArr.push(step);
        this._commit(this.projArr.stepArr);
        console.log(this.projArr.stepArr);
    }

    deleteStep(id){
        this.projArr.stepArr = this.projArr.stepArr.filter(step => step.id !== id)
        this._commit(this.projArr.stepArr)
    }

    // toggleStepComplete(id){
    //     this.projArr.stepArr = this.projArr.stepArr.map(
    //         step => step.id === id ? {text: step.text, id: step.id, complete: !step.complete} : step
    //         )

    //     this._commit(this.projArr.stepArr)
    // }

    editStep(id, editText){
        this.projArr.stepArr = this.projArr.stepArr.map(
            step => step.id === id ? {text: editText, id: step.id, complete: step.complete} : step 
        )

        this._commit(this.projArr.stepArr)
    }

    getStepArr(){
        const stepArr = this.projArr.stepArr;
        return stepArr;
    }
}

const instance = new ProjModel();

export default instance;