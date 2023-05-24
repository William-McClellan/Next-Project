export class ProjController{
    constructor(model, view){
        this.model = model
        this.view = view
    }

    handleClick(event){
        event.target.addEventListener('click', event => {
            event.stopPropagation(); 
    })
    }

    handleSaveHeight = (id, height) => {
        this.model.saveTextareaHeight(id, height);
    }

    handleGetHeight = (id) =>{
        return this.model.getTextareaHeight(id);
    }

    handleFocusOut(event) {
        const targetElement = event.target;

        if (targetElement.classList.contains('editable')) {
            let editText = targetElement.value;
            let id = targetElement.parentElement.id;

            if (targetElement.parentElement.classList.contains('proj-list-item')) {
                this.model.editProject(id, editText);
                this.model.updateFirstStepProjText(id);
            }

            if (targetElement.parentElement.classList.contains('step-item')) {
                const projId = this.model.getProjIdByStepId(id);
                this.model.editStep(id, editText, projId);
            }
        }

    }

    addFocusOutListener() {
        document.getElementById('root').addEventListener('focusout', this.handleFocusOut.bind(this));
    }


    // PROJ HANDLERS
    handleUpdateProjectDropDownProperty = (projId, dropDownButtonOn) => {
        this.model.updateProjectDropDownProperty(projId, dropDownButtonOn);
    }

    handleAddProject = (projectText) =>{
        this.model.addProject(projectText)
    }
    handleDeleteProject = (id) =>{
        this.model.deleteProject(id)
    }
    handleEditProject = (id, editText) => {
        this.model.editProject(id, editText)
    }
    handleToggleComplete = (id) =>{
        this.model.toggleComplete(id)
    }

    // STEP HANDLERS
    handleAddStep = (projId, stepText) => {
        this.model.addStep( projId, stepText);
    }
    
    handleDeleteStep = (projId, stepId) => {
        this.model.deleteStep(projId, stepId);
    }

    handleEditStep = (id, editText) =>{
        const projIndex = this.model.projArr.findIndex(proj => proj.stepArr.some(step => step.id === id));
        if(projIndex !== -1){
        this.model.editStep(id, editText, projIndex);
        }
    }
}