export class ProjModel{
    constructor(){
        this.projArr = [];
        this.firstStepArr = [];
        this.loadFromLocalStorage();

        this.projChangedCallbacks = [];

        this.projChanged = () => {};
    }

    loadFromLocalStorage(){
        
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
        this.firstStepArr = JSON.parse(localStorage.getItem("firstStepArr")) || [];
        

    }

    savetoLocalStorage(key, arrToSave){
    localStorage.setItem(key, JSON.stringify(arrToSave));
    }


// PROJECT METHODS
    bindProjChanged(callback){
            this.projChangedCallbacks.push(callback);
    }
    
    render(){
        this.projChangedCallbacks.forEach((callback) => callback());
    }

    updateProjectSteps(projId, updatedSteps){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        if(projIndex !== -1){
            this.projArr[projIndex].stepArr = updatedSteps;
            this.savetoLocalStorage('projArr', this.projArr)
            // // // console.log("🚀 ~ file: proj-model.js:39 ~ ProjModel ~ updateProjectSteps ~ this.projArr:", this.projArr)
            this.render()
        }
    }

    deleteStepFromFirstStepArr(stepId){
        const stepIndex = this.firstStepArr.findIndex(step => step.id === stepId);
        // // // console.log("🚀 ~ file: proj-model.js:45 ~ ProjModel ~ deleteStepFromFirstStepArr ~ stepIndex:", stepIndex)
        if(stepIndex !== -1){
            this.firstStepArr.splice(stepIndex, 1);
            this.savetoLocalStorage('firstStepArr', this.firstStepArr)
            // // // console.log("🚀 ~ file: proj-model.js:49 ~ ProjModel ~ deleteStepFromFirstStepArr ~ this.firstStepArr:", this.firstStepArr)
            this.render()
        }
    }

    getProjById(projId){
        const proj = this.projArr.find(proj => proj.id === projId);
        return proj;
    }

    getProjIdByStepId(stepId){
        const proj = this.projArr.find(proj => proj.stepArr.find(step => step.id === stepId));
        return proj.id;
    }

    stepArrExistsAndPopulated(proj){
        if(proj.stepArr && proj.stepArr.length > 0){
            return true;
        } else {
            // console.log("🚀 ~ file: proj-model.js:71 ~ ProjModel ~ stepArrExistsAndPopulated ~ 'No steps yet':")
            return false;
        }
    }
        
    projArrExistsAndPopulated(projArr){
       if(projArr && projArr.length > 0){
              return true;
       } else {
            
           // console.log("🚀 ~ file: proj-model.js:80 ~ ProjModel ~ projArrExistsAndPopulated ~ 'No projects yet':")
                return false;
         }
    } 

    getFirstStepArr(){
        // console.log("🚀 ~ file: proj-model.js:71 ~ ProjModel ~ getFirstStepArr ~ getFirstStepArr CALLED")
        this.loadFromLocalStorage();

        this.firstStepArr = [];

        if(this.projArrExistsAndPopulated(this.projArr)){
            // console.log("🚀 ~ file: proj-model.js:88 ~ ProjModel ~ getFirstStepArr ~ this.projArrExistsAndPopulated(this.projArr):", this.projArrExistsAndPopulated(this.projArr))
            this.projArr.forEach(proj => {
                if(this.stepArrExistsAndPopulated(proj)) {
                // console.log("🚀 ~ file: proj-model.js:91 ~ ProjModel ~ getFirstStepArr ~ this.stepArrExistsAndPopulated:", this.stepArrExistsAndPopulated(proj))

                    const step = proj.stepArr[0];

                    const existingStep = this.firstStepArr.find(s => s.id === step.id);
                    // console.log("🚀 ~ file: proj-model.js:96 ~ ProjModel ~ getFirstStepArr ~ existingStep:", existingStep)

                    if (!existingStep) {
                        this.firstStepArr.push(step);
                    }   
                }
        })
        // console.log("🚀 ~ file: proj-model.js:90 ~ ProjModel ~ getFirstStepArr ~ this.firstStepArr:", this.firstStepArr)
        return this.firstStepArr;
        }

    }   
    
    addProject(projectText){
        const project = {
            text: projectText,
            id: crypto.randomUUID(),
            complete: false,
            stepArr: [],
            dropDownButtonOn: false,
        }
        // // // // console.log("🚀 ~ file: proj-model.js:89 ~ ProjModel ~ addProject ~ id:", project.id)
        
        this.projArr.push(project);
        // // // // console.log("🚀 ~ file: proj-model.js:96 ~ ProjModel ~ addProject ~ this.projArr:", this.projArr)
        
        this.savetoLocalStorage("projArr", this.projArr);
        // // // // console.log("🚀 ~ file: proj-model.js:99 ~ ProjModel ~ addProject ~ this.projArr:", this.projArr)
        
        // // // // console.log("🚀 ~ file: proj-model.js:97 ~ ProjModel ~ addProject ~ this.projArr:", this.projArr)
        this.render();
        
    }

    deleteProject(id){
        // // // // console.log("🚀 ~ file: proj-model.js:100 ~ ProjModel ~ deleteProject ~ id:", id)
        // // // // console.log("🚀 ~ file: proj-model.js:101 ~ ProjModel ~ deleteProject ~ this.projArr BEFORE FILTER:", this.projArr)
        
        this.projArr = this.projArr.filter(project => project.id !== id);
        // // // // console.log("🚀 ~ file: proj-model.js:101 ~ ProjModel ~ deleteProject ~ this.projArr AFTER FILTER:", this.projArr)
        this.savetoLocalStorage("projArr", this.projArr)
        // // // // console.log("🚀 ~ file: proj-model.js:112 ~ ProjModel ~ deleteProject ~ this.projArr (this.savetoLocalStorage):", this.projArr)
        this.render()
        // // // // console.log("🚀 ~ file: proj-model.js:110 ~ ProjModel ~ deleteProject ~ this.render():", this.projArr)
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )
        // // // console.log("🚀 ~ file: proj-model.js:122 ~ ProjModel ~ toggleComplete ~ this.projArr:", this.projArr)
        this.savetoLocalStorage("projArr", this.projArr)
        // // // console.log("🚀 ~ file: proj-model.js:124 ~ ProjModel ~ toggleComplete ~ this.projArr:", this.projArr)
        this.render()
    }

    editProject(id, editText){
        // // console.log("🚀 ~ file: proj-model.js:138 ~ ProjModel ~ editProject ~ id:", id)
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete, stepArr: project.stepArr, dropDownButtonOn: project.dropDownButtonOn} : project
        )
        // // console.log("🚀 ~ file: proj-model.js:132 ~ ProjModel ~ editProject ~ this.projArr:", this.projArr)
        this.savetoLocalStorage("projArr", this.projArr)
        // // console.log("🚀 ~ file: proj-model.js:AFTER SAVE ~ ProjModel ~ editProject ~ id:", id)

        // // console.log("🚀 ~ file: proj-model.js:134 ~ ProjModel ~ editProject ~ this.projArr:", this.projArr)
        this.render()

        // // console.log("🚀 ~ file: proj-model.js:AFTER RENDER ~ ProjModel ~ editProject ~ id:", id)

    }

    getProjArr(){
        const projArr = this.projArr;
        return projArr;
    }

// STEP METHODS
    
    addStep(projId, stepText){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        
        
        if(projIndex !== -1){
            const step = {
            text: stepText,
            id: crypto.randomUUID(),
            complete: false,
            projText: this.projArr[projIndex].text,
            projId: this.projArr[projIndex].id,
        }
        this.projArr[projIndex].stepArr.push(step);
        this.projArr[projIndex].dropDownButtonOn = true;
        
        this.savetoLocalStorage('projArr', this.projArr)
        this.render()
        } 
    }

    

    deleteStep(projId, stepId){
    const projIndex = this.projArr.findIndex(proj => proj.id === projId);

        if (projIndex !== -1) {
         const stepIndex = this.projArr[projIndex].stepArr.findIndex(step => step.id === stepId);
             if (stepIndex !== -1) {
             this.projArr[projIndex].stepArr.splice(stepIndex, 1);
            
             this.savetoLocalStorage('projArr', this.projArr)
             this.render()
            } 
            else {
            }
        }
        else {
        }
    }

    editStep(id, editText){
        const projId = this.getProjIdByStepId(id);
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        if(this.projArr[projIndex].stepArr){
            const stepIndex = this.projArr[projIndex].stepArr.findIndex(step => step.id === id);

            if(stepIndex !== -1){
                this.projArr[projIndex].stepArr[stepIndex].text = editText;
            }

            this.savetoLocalStorage('projArr', this.projArr)
            this.render()
        }
    }

    getStepArr(){
        const stepArr = this.projArr.stepArr;
        return stepArr;
    }
}

const projModelInstance = new ProjModel();

export default projModelInstance;