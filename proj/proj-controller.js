export class ProjController{
    constructor(model, view){
        this.model = model
        this.view = view
    }

    // PROJ HANDLERS
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
        console.log("🚀 ~ file: proj-controller.js:26 ~ ProjController ~ handleDeleteStep ~ projId, stepId:", projId, stepId)
        this.model.deleteStep(projId, stepId);
    }
    handleEditStep = (id, editText) =>{
        const projIndex = this.model.projArr.findIndex(proj => proj.stepArr.some(step => step.id === id));
        // console.log("🚀 ~ file: proj-controller.js:30 ~ ProjController ~ projIndex:", projIndex)
        if(projIndex !== -1){
        this.model.editStep(id, editText, projIndex);
        }
    }
}