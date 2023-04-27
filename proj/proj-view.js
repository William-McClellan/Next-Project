import { TodoView } from "../todo-list/todo-view.js";
import { getElement, createElement, clearList} from "../utils.js";
export class ProjView{
    constructor(){
    
        // PROJECT CONSTRUCTION
        this.getElement = getElement;
        this.createElement = createElement;
        
        this.projDiv = createElement('div', 'proj-div')

        this.app = this.getElement('#root');
        
        this.form = this.createElement('form');

        this.projList =  this.createElement('ul', 'proj-list');

        this.title = createElement('h1');
        this.title.textContent = 'Projects';

        this.projTextInput = createElement('input','proj-input');
        this.projTextInput.type = 'text';
        this.projTextInput.placeholder = 'Add a new project';

        this.submitprojButton = createElement('button');
        this.submitprojButton.textContent = 'Add';

        this.form.append(this.projTextInput, this.submitprojButton );
        this.projDiv.append(this.title, this.form, this.projList);
        this.app.append(this.projDiv);

        this._initEditTextListener();
        this._editText = '';
    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }

    
    createProjListItem(proj){
        const projListItem = createElement('div', 'proj-list-item')
        projListItem.id = proj.id
        
        const completeCheckbox = createElement('input')
        completeCheckbox.type = 'checkbox'
        completeCheckbox.checked = proj.complete; 

        const projListItemSpan = createElement('span', ['editable', 'proj-list-item-span']);
        projListItemSpan.contentEditable = true;
        projListItemSpan.textContent = proj.text;

        const strikeThrough = createElement('s', 's')

            if(proj.complete === true){
                strikeThrough.textContent = proj.text
            }   else {
                projListItemSpan.textContent = proj.text
            }

        const deleteButton = createElement('button', 'proj-delete-button')
        deleteButton.textContent = 'Delete'

        const dropDownButton = createElement('button', 'dropdown-button');
        dropDownButton.textContent = 'Steps';
        
        projListItem.append(completeCheckbox, strikeThrough, projListItemSpan, dropDownButton, deleteButton)

        return projListItem;

    }
    
    createDropDown(proj, handleAddStep, handleEditStep){        
        // DOM ELEMENTS                    

        const stepList = createElement('ol','step-list');

        const newStepInput =  createElement('input', 'new-step-input')
        newStepInput.type = 'text';
        newStepInput.placeholder = 'small + precise = easy';

        const stepForm = createElement('form', 'step-form');

        const dropDownDiv = createElement('div', 'dropdown-div');
        
        this.initializeDropDownDisplay(proj.dropDownButtonOn, dropDownDiv)

        stepForm.append(newStepInput);

        dropDownDiv.append(stepForm, stepList);

        this.addEditTextListener(stepList, handleEditStep);
        
        this.addNewStepListener(stepForm, handleAddStep, proj);

        return dropDownDiv;
        }  
    
    createStepItem(handler, step, proj, projArr){
                const stepItem = createElement('li', 'step-item');
                stepItem.textContent = step.text;
                stepItem.id = step.id;
                
                const deleteStepButton = createElement('button', 'delete-step-button', 'delete-button');
                deleteStepButton.innerText = 'Delete';
                this.addDeleteStepListener(deleteStepButton, handler, proj, projArr);

                stepItem.append(deleteStepButton);

                return stepItem;
    }

    addDeleteStepListener(deleteStepButton, handler, proj, projArr){
        deleteStepButton.addEventListener('click', event =>{

            if(event.target.className === 'delete-step-button'){
            const stepId = parseInt(event.target.parentElement.id);
            const projId = parseInt(proj.id);
            // console.log("🚀 ~ file: proj-view.js:121 ~ ProjView ~ addDeleteStepListener ~ projId:", projId)
            
            handler(projId, stepId);
            // console.log("🚀 ~ file: proj-view.js:123 ~ ProjView ~ addDeleteStepListener ~ handler")
            }
        })
    }

    addEditTextListener(element, handler){
        element.addEventListener('input', event => {
            if(event.target.className === 'editable'){
                let editText = event.target.textContent;
                handler(editText);
                }
        })
    }

    addNewStepListener(element, handler, proj){
        element.addEventListener('submit', (event) =>{
            event.preventDefault();
            const newStepTextInput = event.target.querySelector('.new-step-input');
            const newStepText = newStepTextInput.value;
            handler(proj.id, newStepText);
            console.log("🚀 ~ file: proj-view.js:139 ~ ProjView ~ addNewStepListener ~ addNewStepListener:")
            
            // Refocus the input field after submission with a slight delay NOT WORKING
                setTimeout(() => newStepTextInput.focus(), 50);
        })

    }

    addDropDownButtonListener(dropDownButton, dropDownDiv, newStepInput, proj){
        dropDownButton.addEventListener('click', event => {

            if(event.target.className === 'dropdown-button' && dropDownDiv.style.display === 'none' ){
                dropDownDiv.style.display = 'block';
                proj.dropDownButtonOn = true;
                newStepInput.focus();
            } 
                else if (event.target.className === 'dropdown-button'){
                dropDownDiv.style.display = 'none';
                proj.dropDownButtonOn = false;
                }
        })
    }

    initializeDropDownDisplay(dropDownProperty, dropDownDiv){
        if(dropDownProperty === false){
          dropDownDiv.style.display = 'none';
          }
    }



    displayProjList(projArr, handleAddStep, handleEditStep, handleDeleteStep){
    console.log("🚀 ~ file: proj-view.js:176 ~ ProjView ~ displayProjList ~ projArr:", projArr)

        clearList(this.projList);

        
        projArr.forEach(proj => {
            console.log("🚀 ~ file: proj-view.js:183 ~ ProjView ~ displayProjList ~ proj:", proj)
            const projListItem = this.createProjListItem(proj, handleAddStep, handleEditStep);

            const dropDownDiv = this.createDropDown(proj, handleAddStep, handleEditStep);
            const stepList = dropDownDiv.querySelector('.step-list');
            
            if(proj.stepArr){
            console.log("🚀 ~ file: proj-view.js:186 ~ ProjView ~ displayProjList ~ proj.stepArr:", proj.stepArr)
            
            proj.stepArr.map((step) => {
            const stepItem = this.createStepItem(handleDeleteStep, step, proj, projArr);
            stepList.append(stepItem);
            })

            const dropDownButton = projListItem.querySelector('.dropdown-button');

            const stepForm = dropDownDiv.querySelector('.step-form');

            const newStepInput = stepForm.querySelector('.new-step-input');
            this.addDropDownButtonListener(dropDownButton, dropDownDiv, newStepInput, proj)

            

            dropDownDiv.append(stepList);
            this.projList.append(projListItem, dropDownDiv);
        }
        })
    }
           
     get _projText(){
        const _projText = this.projTextInput.value
        return _projText
    }
    
    // PROJ BINDING AND LISTENERS   
    addNewProjectListener(handler){
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
            if(event.target.className === 'proj-delete-button'){
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

    _initEditTextListener(){
        this.projList.addEventListener('input', event =>{
            if(event.target.className === 'editable'){
                this._editText = event.target.innerText
            }
        })
    }

}

