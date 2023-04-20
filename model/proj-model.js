export class ProjModel{
    constructor(){
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
        // this.firstStepArr = JSON.parse(localStorage.getItem("firstStepArr")) || [];
    }

// PROJECT METHODS

    getFirstStepArr(){
        const firstStepArr = [];
        if (this.projArr.length === 0) {
        return [];
    }
       this.projArr.forEach(proj => {
        if (proj.stepArr.length > 0) {
            firstStepArr.push(proj.stepArr[0]);
            }
    });
        console.log('firstStepArr from FirstStepArr method: ', firstStepArr);
        return firstStepArr;
    }

    bindProjChanged(callback){
        this.projChanged = callback
    }

    _commit(projArr){
        this.projChanged(projArr)
    };
    
    // _commitToStorage(projArr){
    // localStorage.setItem("projArr", JSON.stringify(projArr))
    // }

    addProject(projectText){
        const project = {
            text: projectText,
            id: new Date().getTime(),
            complete: false,
            stepArr: [],
            dropDownButtonOn: false,
        }
        this.projArr.push(project)
        // this._commitToStorage(this.projArr)
        this._commit(this.projArr);

        console.log('this.projArr from addProject: ', this.projArr);
    }

    deleteProject(id){
        this.projArr = this.projArr.filter(project => project.id !== id);
        // this._commitToStorage(this.projArr);
        this._commit(this.projArr);
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )

        // this._commitToStorage(this.projArr)
        this._commit(this.projArr);
    }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

        // this._commitToStorage(this.projArr)
        this._commit(this.projArr);
    }

    getProjArr(){
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
            projId: this.projArr[projIndex].id,
        }
        this.projArr[projIndex].stepArr.push(step);
        
        // this._commitToStorage(this.projArr);
        this._commit(this.projArr);
        // console.log(this.projArr[projIndex].stepArr);
        } 
    }

    

    deleteStep(projArr, projId, stepId){
    const projIndex = projArr.findIndex(proj => proj.id === projId);
     if (projIndex !== -1) {
        const stepIndex = projArr[projIndex].stepArr.findIndex(step => step.id === stepId);
        if (stepIndex !== -1) {
            projArr[projIndex].stepArr.splice(stepIndex, 1);
            this._commit(projArr);
        } else {
            console.log('deleteStep: step not found');
        }
    } else {
        console.log('deleteStep: project not found');
    }
    }

    editStep(id, editText){
        this.projArr.stepArr = this.projArr.stepArr.map(
            step => step.id === id ? {text: editText, id: step.id, complete: step.complete} : step 
        )

        // this._commitToStorage(this.projArr.stepArr)
        this._commit(this.projArr);
    }

    getStepArr(){
        const stepArr = this.projArr.stepArr;
        return stepArr;
    }
}

const instance = new ProjModel();

export default instance;