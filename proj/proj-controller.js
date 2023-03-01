export class ProjController{
        constructor(model, view){
        this.model = model
        this.view = view
        }

        projChanged = (proj) =>{
        view.displayProjectList(proj)
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

        // handleSelectProject = (id) => {
        // this.model.selectProject(id)
        // }

}