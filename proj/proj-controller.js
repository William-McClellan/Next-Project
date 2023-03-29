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
    handleDeleteStep = (projArr, projId, stepId) =>{
        this.model.deleteStep(projArr, projId, stepId);
    }
    handleEditStep = (id, stepText) =>{
        this.model.editStep(id, stepText);
    }
}