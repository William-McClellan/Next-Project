export class ProjController{
        constructor(model, view){
        this.model = model
        this.view = view
        }
// PROJ HANDLERS
        // projChanged = (proj) =>{
        // view.displayProjList(proj)
        // }

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

        // handleSelectProject = (id) => {
        // this.model.selectProject(id)
        // }

        // STEP HANDLERS

        //  stepChanged = (step) =>{
        // view.displayStepList(step)
        // }

        handleAddStep = (stepText) =>{
            this.model.addStep(stepText);
        }

        handleDeleteStep = (id) =>{
            this.model.deleteStep(id);
        }

        // handleStepToggleComplete = () =>{

        // }

        handleEditStep = (id, stepText) =>{
            this.model.editStep(id, stepText);
        }


}