export class ProjectsController{
        constructor(model, view){
        this.model = model
        this.view = view
        }

        projectsChanged = (projects) =>{
        view.displayProjectList(projects)
        }

        handleProject = (projectText) =>{
        this.model.addProject(projectText)
        }

        handleDeleteProject = (id) =>{
        this.model.deleteProject(id)
        }

        handleEditProject = (id, editText) => {
        this.model.editProject(id, editText)
        }

        // handleSelectProject = (id) => {
        // this.model.selectProject(id)
        // }

}