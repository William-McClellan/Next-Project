export class ProjModel{
    constructor(){
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
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
    
    setupAddStepHandler(projArr, projId, stepText, handler){
        const projIndex = projArr.findIndex(proj => proj.id === projId);
        
        if(projIndex !== -1){
            const step = {
            text: stepText,
            id: new Date().getTime,
            complete: false
        }

        projArr[projIndex].stepArr.push(step);
        
      handler(projArr)
        this._commit(projArr);
        console.log(projArr);
        } else {
            console.log('addstep: project not found');
        }   
    }

    deleteStep(id){
        this.projArr.stepArr = this.projArr.stepArr.filter(step => step.id !== id)
        this._commit(this.projArr.stepArr)
    }

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