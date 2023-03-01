import { getElement } from "../utils.js";
import { createElement } from "../utils.js";

export class ProjView{
    constructor(){
        this.getElement = getElement;
        this.createElement = createElement;
        
        this.projDiv = createElement('div', 'projDiv')

        this.app = this.getElement('#root');
        
        this.form = this.createElement('form');

        this.projList =  this.createElement('ul', 'proj-list');

        this.title = createElement('h1');
        this.title.textContent = 'Projects';

        this.projTextInput = createElement('input','projInput');
        this.projTextInput.type = 'text';
        this.projTextInput.placeholder = 'Add a new project';

        this.submitprojButton = createElement('button');
        this.submitprojButton.textContent = 'Add';

        this.form.append(this.projTextInput, this.submitprojButton );
        this.projDiv.append(this.title, this.form, this.projList);
        this.app.append(this.projDiv);


        this._initEditTextListener();
        this._editText = '';

        console.log('proj Form constructreeeeeeed');
    }

    _initEditTextListener(){
        this.projList.addEventListener('input', event =>{
            if(event.target.className === 'editable'){
                this._editText = event.target.innerText
            }
        })
    }


    displayprojList(proj){
        while(this.projList.firstChild){
            this.projList.removeChild(this.projList.firstChild)
        }
        proj.forEach(project => {
                const projListItem = createElement('li', 'projListItem')
                projListItem.id = project.id
                // projListItem.classLisst.add('li');

                const completeCheckbox = createElement('input')
                completeCheckbox.type = 'checkbox'
                completeCheckbox.checked = project.complete
                projListItem.append(completeCheckbox)

                const projListItemSpan = createElement('span', 'editable');
                projListItemSpan.contentEditable = true;

                    if(project.complete === true){
                        const strikeThrough = createElement('s', 's')
                        strikeThrough.textContent = project.text
                        projListItem.append(strikeThrough)
                    }   else {
                        projListItemSpan.textContent = project.text
                        projListItem.append(projListItemSpan)
                    }

                const deleteButton = createElement('button', 'Delete')
                deleteButton.textContent = 'Delete'

                projListItem.append(deleteButton)

                this.projList.append(projListItem)
            })
            console.log(proj)
       }
    

    resetInput(){
        this.projTextInput.value = '';
    }

    displayProjectList(proj){
        while(this.projectList.firstChild){
            this.projectList.removeChild(this.projectList.firstChild)
        }

        proj.forEach(project => {
        const projectListItem = createElement('li', 'projectListItem')
        projectListItem.id = project.id
        // projectListItem.classList.add('li');

        const completeCheckbox = createElement('input')
        completeCheckbox.type = 'checkbox'
        completeCheckbox.checked = project.complete
        projectListItem.append(completeCheckbox)

        const projectListItemSpan = createElement('span', 'editable');
        projectListItemSpan.contentEditable = true;

            if(project.complete === true){
                const strikeThrough = createElement('s', 's')
                strikeThrough.textContent = project.text
                projectListItem.append(strikeThrough)
            }   else {
                projectListItemSpan.textContent = project.text
                projectListItem.append(projectListItemSpan)
            }

        const deleteButton = createElement('button', 'Delete')
        deleteButton.textContent = 'Delete'

        projectListItem.append(deleteButton)

        this.projectList.append(projectListItem)
        })
        console.log(proj)
    }
    

     get _projText(){
        const _projText = this.projTextInput.value
        return _projText
    }
    
    bindAddProject(handler){
        this.form.addEventListener('submit', event =>{
            event.preventDefault()

            if(this._projText){
                handler(this._projText)
                this.resetInput()
            }
        })
    }

    bindDeleteProject(handler){
        this.projList.addEventListener('click', event =>{
            if(event.target.className === 'Delete'){
                const id = parseInt(event.target.parentElement.id)
                handler(id)    
            }
        })
        
    }

    bindToggleComplete(handler){
        this.projList.addEventListener('change', event =>{
            if(event.target.type === 'checkbox'){
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }

    bindEditProject(handler){
        this.projList.addEventListener('focusout', event =>{
            if(this._editText){
                const id = parseInt(event.target.parentElement.id)
                handler(id, this._editText)
                this._editText = ''
            }
        })
    }
}