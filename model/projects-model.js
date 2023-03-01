export class ProjectsModel{
    constructor(){
        this.projects = JSON.parse(localStorage.getItem("projects")) || [];
        this.subscribers = [];
    }


    getProjects(){
        const projects = this.projects;
        return projects;
    }
}