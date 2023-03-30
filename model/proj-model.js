export class ProjModel{
    constructor(){
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
        this.stepArr = JSON.parse(localStorage.getItem("stepArr")) || [];
    }

    // PROJECT METHODS

    bindProjChanged(callback){
        this.projChanged = callback
    }

    _commitToStorage(projArr, stepArr){
    localStorage.setItem("projArr", JSON.stringify(projArr))
    localStorage.setItem("stepArr", JSON.stringify(stepArr));
    }
    
    _commitDisplay(projArr, stepArr){
        this.projChanged(projArr, stepArr)
    };
    

    addProject(projectText){
        const project = {
            text: projectText,
            id: new Date().getTime(),
            complete: false,
        }
        this.projArr.push(project)
        this._commitDisplay(this.projArr, this.stepArr);
        this._commitToStorage(this.projArr, this.stepArr);
        console.log(this.projArr);
    }

    deleteProject(id){
        this.projArr = this.projArr.filter(project => project.id !== id);
        this._commitToStorage(this.projArr, this.stepArr);
        this._commitDisplay(this.projArr, this.stepArr);
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )

            this._commitDisplay(this.projArr, this.stepArr);
            this._commitToStorage(this.projArr, this.stepArr);
        }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

            this._commitDisplay(this.projArr, this.stepArr);
            this._commitToStorage(this.projArr, this.stepArr);
    }

    getproj(){
        const proj = this.projArr;
        return proj;
    }

    // STEP METHODS
    
    addStep(projId, stepText){
            const step = {
            text: stepText,
            id: new Date().getTime(),
            projId: projId,
            complete: false,
            }
            this.stepArr.push(step);

            this._commitDisplay(this.projArr, this.stepArr);
            this._commitToStorage(this.projArr, this.stepArr);

        } 

    
    deleteStep(stepId){
        this.stepArr = this.stepArr.filter(step => step.id !== stepId);
        this._commitDisplay(this.projArr, this.stepArr);
        this._commitToStorage(this.projArr, this.stepArr);
    }


    editStep(id, editText){
        this.projArr.stepArr = this.projArr.stepArr.map(
            step => step.id === id ? {text: editText, id: step.id, complete: step.complete} : step 
        )

            this._commitDisplay(this.projArr, this.stepArr);
            this._commitToStorage(this.projArr, this.stepArr);
    }

    getStepArr(){
        const stepArr = this.stepArr;
        return stepArr;
    }

}

const instance = new ProjModel();

export default instance;