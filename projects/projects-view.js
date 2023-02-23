import { getElement } from "../utils.js";
import { createElement } from "../utils.js";

export class ProjectsView{
    constructor(){
        this.getElement = getElement;
        this.createElement = createElement;
        

        this.app = this.getElement('#root');
        
        this.projectsList =  this.createElement('ul', 'projects-list');

        this.form = this.createElement('form');

        this.projectsInput =  this.createElement('input');
        this.projectsInput.type = 'text';
        this.projectsInput.placeholder = 'Projects are multi-action'
    }

}