export class ProjModel{
    constructor(){
        this.projArr = [];
        this.firstStepArr = [];
        this.loadFromLocalStorage();

        console.log("Before retrieving from localStorage - this.projArr:", this.projArr);
    const storedProjArr = JSON.parse(localStorage.getItem("projArr"));
    console.log("After retrieving from localStorage - storedProjArr:", storedProjArr);
    
        this.projChanged = () => {};

    }

    loadFromLocalStorage(){
        
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
        this.firstStepArr = JSON.parse(localStorage.getItem("firstStepArr")) || [];
        
        console.log("After loading from localStorage - this.projArr:", this.projArr);
        console.log("After loading from localStorage - this.firstStepArr:", this.firstStepArr);

    }

// PROJECT METHODS
    bindProjChanged(callback){
            console.log("Binding callback to projChanged");

        this.projChanged = () => callback();    

                console.log("Executing callback in projChanged");

    }
    
    _commit(){
      console.log("Before this.projChanged() - this.projArr:", this.projArr);
    this.projChanged();
    console.log("After this.projChanged() - this.projArr:", this.projArr);

    console.log("Before localStorage.setItem() - this.projArr:", this.projArr);
    localStorage.setItem("projArr", JSON.stringify(this.projArr));
    console.log("After localStorage.setItem() - this.projArr:", this.projArr);

    console.log("Before localStorage.getItem() - this.projArr:", this.projArr);
    const storedProjArr = JSON.parse(localStorage.getItem("projArr"));
    console.log("After localStorage.getItem() - this.projArr:", this.projArr);
    console.log("After localStorage.getItem() - storedProjArr:", storedProjArr);

    localStorage.setItem("firstStepArr", JSON.stringify(this.firstStepArr));

    };

    updateProjectSteps(projId, updatedSteps){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        if(projIndex !== -1){
            this.projArr[projIndex].stepArr = updatedSteps;
            this._commit();
        }
    }

    deleteStepFromFirstStepArr(stepId){
        const stepIndex = this.firstStepArr.findIndex(step => step.id === stepId);
        if(stepIndex !== -1){
            this.firstStepArr.splice(stepIndex, 1);
            this._commit();
        }
    }

    getProjById(projId){
        const proj = this.projArr.find(proj => proj.id === projId);
        return proj;
    }

    getFirstStepArr(){
        this.loadFromLocalStorage();

        this.firstStepArr = [];

        if(this.projArr.length > 0){
            this.projArr.forEach(proj => {
                 if (proj.stepArr.length > 0) {

                    const step = proj.stepArr[0];

                    const existingStep = this.firstStepArr.find(s => s.id === step.id);

                    if (!existingStep) {
                        this.firstStepArr.push(step);
                    }   
                }
            })  

        }
        return this.firstStepArr;
    }

    
    
    addProject(projectText){
        const project = {
            text: projectText,
            id: crypto.randomUUID(),
            complete: false,
            stepArr: [],
            dropDownButtonOn: false,
        }
        this.projArr.push(project);
        console.log("🚀 ~ file: proj-model.js:70 ~ ProjModel ~ addProject ~ this.projArr BEFORE COMMIT:", this.projArr)
        
        this._commit();

        console.log("🚀 ~ file: proj-model.js:77 ~ ProjModel ~ addProject ~ this.projArr AFTER COMMIT:", this.projArr)
    }

    deleteProject(id){
        this.projArr = this.projArr.filter(project => project.id !== id);
        this._commit();
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )

        // this._commitToStorage(this.projArr)
        this._commit();
    }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

        // this._commitToStorage(this.projArr)
        this._commit();
    }

    getProjArr(){
        const projArr = this.projArr;
        return projArr;
    }

// STEP METHODS
    
    addStep(projId, stepText){
        console.log("🚀 ~ file: proj-model.js:105 ~ ProjModel ~ addStep ~ projId:", projId)
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        
        console.log("🚀 ~ file: proj-model.js:106 ~ ProjModel ~ addStep ~ projIndex:", projIndex)
        console.log("🚀 ~ file: proj-model.js:118 ~ ProjModel ~ addStep ~ this.projArr:", this.projArr)
        
        if(projIndex !== -1){
            const step = {
            text: stepText,
            id: crypto.randomUUID(),
            complete: false,
            projText: this.projArr[projIndex].text,
            projId: this.projArr[projIndex].id,
        }
        this.projArr[projIndex].stepArr.push(step);
        console.log("🚀 ~ file: proj-model.js:118 ~ ProjModel ~ addStep ~ this.projArr:", this.projArr)
        console.log("🚀 ~ file: proj-model.js:118 ~ ProjModel ~ addStep ~ this.projArr[projIndex].stepArr:", this.projArr[projIndex].stepArr)
        
        this._commit();
        console.log("🚀 ~ file: proj-model.js:121 ~ ProjModel ~ addStep ~ this.projArr:", this.projArr)
        } 
    }

    

    deleteStep(projId, stepId){
    const projIndex = this.projArr.findIndex(proj => proj.id === projId);
    console.log("🚀 ~ file: proj-model.js:133 ~ ProjModel ~ deleteStep ~ projId:", projId)
    console.log("🚀 ~ file: proj-model.js:133 ~ ProjModel ~ deleteStep this.projArr[projIndex].stepArr:", this.projArr[projIndex].stepArr)

        if (projIndex !== -1) {
         const stepIndex = this.projArr[projIndex].stepArr.findIndex(step => step.id === stepId);
             console.log("🚀 ~ file: proj-model.js:138 ~ ProjModel ~ deleteStep ~ stepIndex:", stepIndex)
             if (stepIndex !== -1) {
             this.projArr[projIndex].stepArr.splice(stepIndex, 1);
             console.log("🚀 ~ file: proj-model.js:144 ~ ProjModel ~ deleteStep this.projArr[projIndex].stepArr BEFORE COMMIT:", this.projArr[projIndex].stepArr)
            
             this._commit();
             console.log("🚀 ~ file: proj-model.js:144 ~ ProjModel ~ deleteStep this.projArr[projIndex].stepArr AFTER COMMIT:", this.projArr[projIndex].stepArr)
            } 
            else {
                console.log("🚀 ~ file: proj-model.js: ~ deleteStep ~ step not found in this.projArr[projIndex].stepArr")
            }
        }
        else {
            console.log("🚀 ~ file: proj-model.js: ~ deleteStep ~  proj not found in this.projArr")
        }
    }

    editStep(id, editText){
        this.projArr.stepArr = this.projArr.stepArr.map(
            step => step.id === id ? {text: editText, id: step.id, complete: step.complete} : step 
        )

        this._commit();
    }

    getStepArr(){
        const stepArr = this.projArr.stepArr;
        return stepArr;
    }
}

const projModelInstance = new ProjModel();

export default projModelInstance;