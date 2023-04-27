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
    handleDeleteStep = (projId) =>{
        this.model.deleteStep(projId);
    }
    handleEditStep = (id, stepText) =>{
        this.model.editStep(id, stepText);
    }
}