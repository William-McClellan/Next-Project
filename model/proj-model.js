export class ProjModel{
    constructor(){
        this.proj = JSON.parse(localStorage.getItem("proj")) || [];
        this.subscribers = [];
    }

     addSubscriber(callback){
        this.subscribers.push(callback);
    }

    removeSubscriber(callback){
        this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
    }

    notify(){
        this.subscribers.forEach((callback) => {
            callback(this.proj);
        })
    }

    bindProjChanged(callback){
        this.projChanged = callback
    }

      _commit(proj){
        this.projChanged(proj)
        localStorage.setItem("proj", JSON.stringify(proj))
    }

    addProject(projectText){
        const project = {
            text: projectText,
            id: this.proj.length,
            complete: false
        }
        this.proj.push(project)
        this._commit(this.proj)
    }

    deleteProject(id){
        this.proj = this.proj.filter(project => project.id !== id)
        this._commit(this.proj)
    }

    toggleComplete(id){
        this.proj = this.proj.map(
            project => project.id === id ? {text: project.text, id: project.id, complete: !project.complete} : project
            )

        this._commit(this.proj)
    }

    editProject(id, editText){
        this.proj = this.proj.map(
            project => project.id === id ? {text: editText, id: project.id, complete: project.complete} : project 
        )

        this._commit(this.proj)
    }

    getproj(){
        const proj = this.proj;
        return proj;
    }
}

const instance = new ProjModel();

export default instance;