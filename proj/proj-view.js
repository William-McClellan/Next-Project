import { TodoView } from "../todo-list/todo-view.js";
import { getElement, createElement, clearList} from "../utils.js";
export class ProjView{
    constructor(rootElement, model){
    
        // PROJECT CONSTRUCTION
        this.getElement = getElement;
        this.createElement = createElement;
        this.clearList = clearList;
        this.model = model;
        
        this.projDiv = createElement('div', 'proj-div')

        this.app = rootElement;
        
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
    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }

    
    createProjListItem(proj){
        const projListItem = createElement('div', 'proj-list-item')
        projListItem.id = proj.id

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
        deleteButton.textContent = 'Done'

        const dropDownButton = createElement('button', 'dropdown-button');
        dropDownButton.textContent = 'Steps';

        projListItem.append(strikeThrough, projListItemSpan, dropDownButton, deleteButton)

        return projListItem;

    }
    
    createDropDown(proj, handleAddStep){        
        const stepList = createElement('ol','step-list');

        const newStepInput =  createElement('input', 'new-step-input')
        newStepInput.type = 'text';
        newStepInput.placeholder = 'small + precise = easy';

        const stepForm = createElement('form', 'step-form');

        const dropDownDiv = createElement('div', 'dropdown-div');
        

        stepForm.append(newStepInput);

        dropDownDiv.append(stepForm, stepList);

        this.addNewStepListener(stepForm, handleAddStep, proj);

        return dropDownDiv;
    }  
    
    createStepItem(handleDeleteStep, step, proj, projArr){

        const stepItem = createElement('li', ['step-item']);
        const stepItemTextSpan = createElement('span', ['step-item-text-span','editable']);
        stepItemTextSpan.contentEditable = true; 
        stepItemTextSpan.textContent = step.text;
        stepItem.id = step.id;

        const deleteStepButton = createElement('button', ['delete-step-button', 'delete-button']);
        deleteStepButton.innerText = 'Done';
        this.addDeleteStepListener(deleteStepButton, handleDeleteStep, proj, projArr);

        stepItem.append(stepItemTextSpan , deleteStepButton);

        return stepItem;
    }

    addDeleteStepListener(deleteStepButton, handler, proj){
        deleteStepButton.addEventListener('click', event =>{
            console.log("🚀 ~ file: proj-view.js:117 ~ ProjView ~ addDeleteStepListener ~ addEventListener:", addEventListener)
            if(event.target.classList.contains('delete-step-button')){
            console.log("🚀 ~ file: proj-view.js:112 ~ ProjView ~ addDeleteStepListener ~ if(event.target.classList.contains('delete-step-button'):")
            const stepId = (event.target.parentElement.id);
            console.log("🚀 ~ file: proj-view.js:114 ~ ProjView ~ addDeleteStepListener ~ stepId:", stepId)
            const projId = (proj.id);
            console.log("🚀 ~ file: proj-view.js:116 ~ ProjView ~ addDeleteStepListener ~ projId:", projId)
            
            handler(projId, stepId);
            }
        })
    }

    addNewStepListener(element, handler, proj){
        element.addEventListener('submit', (event) =>{
            event.preventDefault();
            const newStepTextInput = event.target.querySelector('.new-step-input');
            const newStepText = newStepTextInput.value;
            handler(proj.id, newStepText);
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

    displayProjList(projArr, handleAddStep, handleDeleteStep){
    
        clearList(this.projList);
    
    
        projArr.forEach(proj => {
            const projListItem = this.createProjListItem(proj);
            
            const dropDownDiv = this.createDropDown(proj, handleAddStep);
            const stepList = dropDownDiv.querySelector('.step-list');
            
            if(proj.stepArr){
                
                proj.stepArr.map((step) => {
                    const stepItem = this.createStepItem(handleDeleteStep, step, proj, projArr);
                    stepList.append(stepItem);
                })
                
                const dropDownButton = projListItem.querySelector('.dropdown-button');
                
                const stepForm = dropDownDiv.querySelector('.step-form');

                const newStepInput = stepForm.querySelector('.new-step-input');

                this.initializeDropDownDisplay(proj.dropDownButtonOn, dropDownDiv)
                this.addDropDownButtonListener(dropDownButton, dropDownDiv, newStepInput, proj)
                
                dropDownDiv.append(stepList);
            }
            this.projList.append(projListItem, dropDownDiv);
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
                const id = event.target.parentElement.id
                handler(id)
            }
        })
    }

    bindToggleComplete(handler){
        this.projList.addEventListener('change', event =>{
            if(event.target.type === 'checkbox'){
                const id = event.target.parentElement.id
                handler(id)
            }
        })
    }

}

