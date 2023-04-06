export class ProjModel{
    constructor(){
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
    }

// PROJECT METHODS

    getFirstStepArr(){
        if (this.projArr.length === 0) {
        return [];
    }
        const firstStepArr = [];
       this.projArr.forEach(proj => {
        if (proj.stepArr.length > 0) {
            firstStepArr.push(proj.stepArr[0]);
            }
    });
        return firstStepArr;
    }

    bindProjChanged(callback){
        this.projChanged = callback
    }

    _commitDisplay(projArr){
        this.projChanged(projArr)
    };
    
    _commitToStorage(projArr){
    localStorage.setItem("projArr", JSON.stringify(projArr))
    }

    addProject(projectText, input){
        const project = {
            text: projectText,
            id: new Date().getTime(),
            complete: false,
            newStepInput: input,
            stepArr: [],
            dropDownButtonOn: false,
        }
        this.projArr.push(project)
        this._commitToStorage(this.projArr)
        this._commitDisplay(this.projArr);
    }

    deleteProject(id){
        this.projArr = this.projArr.filter(project => project.id !== id);
        this._commitToStorage(this.projArr);
        this._commitDisplay(this.projArr);
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )

        this._commitToStorage(this.projArr)
        this._commitDisplay(this.projArr);
    }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

        this._commitToStorage(this.projArr)
        this._commitDisplay(this.projArr);
    }

    getproj(){
        const proj = this.projArr;
        return proj;
    }

// STEP METHODS
    
    addStep(projId, stepText){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        
        if(projIndex !== -1){
            const step = {
            text: stepText,
            id: new Date().getTime(),
            complete: false,
            projText: this.projArr[projIndex].text,
        }
        this.projArr[projIndex].stepArr.push(step);
        
        this._commitToStorage(this.projArr);
        this._commitDisplay(this.projArr);
        // console.log(this.projArr[projIndex].stepArr);
        } 
    }

    

    deleteStep(projArr, projId, stepId){
    // get the index of the project
    const projIndex = projArr.findIndex(proj => proj.id === projId);
    //console.log(projIndex, projId);
     if (projIndex !== -1) {
        // get the index of the step
        const stepIndex = projArr[projIndex].stepArr.findIndex(step => step.id === stepId);
        //console.log('stepIndex = ' + stepIndex + ' stepId = ' + stepId);
        if (stepIndex !== -1) {
            // remove the step
            projArr[projIndex].stepArr.splice(stepIndex, 1);
            this._commitDisplay(projArr);
            this._commitToStorage(projArr);
        } else {
            //console.log('deleteStep: step not found');
        }
    } else {
        //console.log('deleteStep: project not found');
    }
    }

    editStep(id, editText){
        this.projArr.stepArr = this.projArr.stepArr.map(
            step => step.id === id ? {text: editText, id: step.id, complete: step.complete} : step 
        )

        this._commitToStorage(this.projArr.stepArr)
        this._commitDisplay(this.projArr);
    }

    getStepArr(){
        const stepArr = this.projArr.stepArr;
        return stepArr;
    }
}

const instance = new ProjModel();

export default instance;