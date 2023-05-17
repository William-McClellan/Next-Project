import {truncateString} from "../utils.js";

export class ProjModel{
    constructor(){
        this.projArr = [];
        this.firstStepArr = [];
        this.loadFromLocalStorage();
        this.projChanged = () => {};
    }

    loadFromLocalStorage(){
        this.projArr = JSON.parse(localStorage.getItem("projArr")) || [];
        this.firstStepArr = JSON.parse(localStorage.getItem("firstStepArr")) || [];
    }

    savetoLocalStorage(key, arrToSave){
    localStorage.setItem(key, JSON.stringify(arrToSave));
    }

    bindProjChanged(callback){
            this.projChanged = () => callback();
    }
    
    render(){
        console.log("🚀 ~ file: proj-model.js:29 ~ ProjModel ~ render ~ render:")
        this.projChanged();
    }

    updateProjectSteps(projId, updatedSteps){
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        if(projIndex !== -1){
            this.projArr[projIndex].stepArr = updatedSteps;
            this.savetoLocalStorage('projArr', this.projArr)
            this.render()
        }
    }

    deleteStepFromFirstStepArr(stepId){
        const stepIndex = this.firstStepArr.findIndex(step => step.id === stepId);
        if(stepIndex !== -1){
            this.firstStepArr.splice(stepIndex, 1);
            this.savetoLocalStorage('firstStepArr', this.firstStepArr)
            this.render()
        }
    }

    getProjById(projId){
        const proj = this.projArr.find(proj => proj.id === projId);
        return proj;
    }

    getProjTextById(projId){
        const proj = this.getProjById(projId);
        const projText = proj.text;
        return projText;
    }

    updateFirstStepProjText(projId){
        const proj = this.getProjById(projId);
        const newProjText = this.getProjTextById(projId);
        const truncatedProjText = truncateString(newProjText, 15);
        console.log("🚀 ~ file: proj-model.js:68 ~ ProjModel ~ updateFirstStepProjText ~ truncatedProjText:", truncatedProjText)
        if(proj.stepArr[0]){
            proj.stepArr[0].projText = truncatedProjText;
        }
        this.updateProjectSteps(projId, proj.stepArr);
        }

    getProjIdByStepId(stepId){
        const proj = this.projArr.find(proj => proj.stepArr.find(step => step.id === stepId));
        return proj.id;
    }

    stepArrExistsAndPopulated(proj){
        if(proj.stepArr && proj.stepArr.length > 0){
            return true;
        } else {
            return false;
        }
    }
        
    projArrExistsAndPopulated(projArr){
       if(projArr && projArr.length > 0){
              return true;
       } else {
            
                return false;
         }
    } 

    getFirstStepArr(){
        this.loadFromLocalStorage();

        this.firstStepArr = [];

        if(this.projArrExistsAndPopulated(this.projArr)){
            this.projArr.forEach(proj => {
                if(this.stepArrExistsAndPopulated(proj)) {

                    const step = proj.stepArr[0];

                    const existingStep = this.firstStepArr.find(s => s.id === step.id);

                    if (!existingStep) {
                        this.firstStepArr.push(step);
                    }   
                }
        })
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
        
        this.projArr.push(project);
        
        this.savetoLocalStorage("projArr", this.projArr);
        console.log("🚀 ~ file: proj-model.js:112 ~ ProjModel ~ addProject ~ this.projArr:", this.projArr)
        
        this.render();
        
    }

    deleteProject(id){
        
        this.projArr = this.projArr.filter(project => project.id !== id);
        this.savetoLocalStorage("projArr", this.projArr)
        this.render()
    }

    toggleComplete(id){
        this.projArr = this.projArr.map(
            proj => proj.id === id ? {text: proj.text, id: proj.id, complete: !proj.complete} : proj
            )
        this.savetoLocalStorage("projArr", this.projArr)
        this.render()
    }

    editProject(id, editText){
        this.projArr = this.projArr.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete, stepArr: project.stepArr, dropDownButtonOn: project.dropDownButtonOn} : project
        )
        this.savetoLocalStorage("projArr", this.projArr)

        this.render()
    }

    updateProjectDropDownProperty(projId, dropDownButtonOn){
        console.log("🚀 ~ file: proj-model.js:165 ~ ProjModel ~ updateProjectDropDownProperty ~ dropDownButtonOn:", dropDownButtonOn)
        console.log("🚀 ~ file: proj-model.js:165 ~ ProjModel ~ updateProjectDropDownProperty ~ projId:", projId)
        const projIndex = this.projArr.findIndex(proj => proj.id === projId);
        if(projIndex !== -1){
            this.projArr[projIndex].dropDownButtonOn = dropDownButtonOn;
            this.savetoLocalStorage('projArr', this.projArr)
            this.render()
        }
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

const projModelInstance = new ProjModel();

export default projModelInstance;