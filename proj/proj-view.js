import { TodoView } from "../todo-list/todo-view.js";
import { getElement, createElement, clearList} from "../utils.js";
export class ProjView{
    constructor(rootElement, model){
    
        // PROJECT CONSTRUCTION
        this.getElement = getElement;
        this.createElement = createElement;
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

    
    createProjListItem(proj, handleEditProject){
        const projListItem = createElement('div', 'proj-list-item')
        projListItem.id = proj.id

        // CHECKBOX SERVES NO PURPOSE, MAY BRING BACK LATER
        // const completeCheckbox = createElement('input')
        // completeCheckbox.type = 'checkbox'
        // completeCheckbox.checked = proj.complete; 

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

        this.addEditTextListener(projListItemSpan, handleEditProject);
        // // // // // // // console.log("🚀 ~ file: proj-view.js:71 ~ ProjView ~ createProjListItem ~ projListItemSpan:", projListItemSpan)
        // // // // // // // console.log("🚀 ~ file: proj-view.js:71 ~ ProjView ~ createProjListItem ~ projListItemSpan:", projListItemSpan)

        return projListItem;

    }
    
    createDropDown(proj, handleAddStep){        
        // DOM ELEMENTS                    

        const stepList = createElement('ol','step-list');

        const newStepInput =  createElement('input', 'new-step-input')
        newStepInput.type = 'text';
        newStepInput.placeholder = 'small + precise = easy';

        const stepForm = createElement('form', 'step-form');

        const dropDownDiv = createElement('div', 'dropdown-div');
        

        stepForm.append(newStepInput);

        dropDownDiv.append(stepForm, stepList);

        // // // // // // // console.log("🚀 ~ file: proj-view.js:98 ~ ProjView ~ createDropDown ~ stepList:", stepList)
        
        this.addNewStepListener(stepForm, handleAddStep, proj);

        return dropDownDiv;
        }  
    
    createStepItem(handleDeleteStep, handleEditStep, step, proj, projArr){

                const stepItem = createElement('li', ['step-item', 'editable']);
                const stepItemTextSpan = createElement('span', 'step-item-text-span');
                stepItemTextSpan.contentEditable = true; 
                // // // // // console.log("🚀 ~ file: proj-view.js:107 ~ ProjView ~ createStepItem ~ stepItemTextSpan:", stepItemTextSpan)
                stepItemTextSpan.textContent = step.text;
                stepItem.id = step.id;

    stepItemTextSpan.classList.add('editable'); // Add this line

                
                const deleteStepButton = createElement('button', ['delete-step-button', 'delete-button']);
                deleteStepButton.innerText = 'Done';
                this.addDeleteStepListener(deleteStepButton, handleDeleteStep, proj, projArr);
                this.addEditTextListener(stepItemTextSpan, handleEditStep);

                stepItem.append(stepItemTextSpan ,deleteStepButton);

                return stepItem;
    }

    addDeleteStepListener(deleteStepButton, handler, proj){
        deleteStepButton.addEventListener('click', event =>{
            if(event.target.classList.contains('delete-step-button')){
            const stepId = (event.target.parentElement.id);
            const projId = (proj.id);
            
            handler(projId, stepId);
            }
        })
    }

    addEditTextListener(element, handler){
        if(element && element.classList.contains('editable')){
        
            element.addEventListener('click', event => {
                event.stopPropagation(); // Add this line to stop event propagation
            });
            
            element.addEventListener('blur', event => {
                let editText = event.target.textContent;
                let id = event.target.parentElement.id;
                // // // // // console.log("🚀 ~ file: proj-view.js:133 ~ ProjView ~ addEditTextListener ~ event.target.parentElement:", event.target.parentElement)
                // // // // // console.log("🚀 ~ file: proj-view.js:133 ~ ProjView ~ addEditTextListener ~ id:", id)
                // // // // // console.log("🚀 ~ file: proj-view.js:138 ~ ProjView ~ addEditTextListener ~ id, editText BEFORE HANDLER CALL:", id, editText)
                handler(id, editText);
                // // // // // console.log("🚀 ~ file: proj-view.js:140 ~ ProjView ~ addEditTextListener ~ id, editText AFTER HANDLER CALL:", id, editText)
            })
        }
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
        
            // // // // // // console.log("🚀 ~ file: proj-view.js:170 ~ ProjView ~ addDropDownButtonListener ~ dropDownButton.addEventListener:", dropDownButton.addEventListener)
        
            if(event.target.className === 'dropdown-button' && dropDownDiv.style.display === 'none' ){
                dropDownDiv.style.display = 'block';
                // // // // // // console.log("🚀 ~ file: proj-view.js:160 ~ ProjView ~ addDropDownButtonListener ~ dropDownDiv.style.display:", dropDownDiv.style.display)
                proj.dropDownButtonOn = true;
                newStepInput.focus();
            } 
                else if (event.target.className === 'dropdown-button'){
                dropDownDiv.style.display = 'none';
                // // // // // // console.log("🚀 ~ file: proj-view.js:166 ~ ProjView ~ addDropDownButtonListener ~ dropDownDiv.style.display:", dropDownDiv.style.display)
                proj.dropDownButtonOn = false;
                }
        })
        
    }

    initializeDropDownDisplay(dropDownProperty, dropDownDiv){
        if(dropDownProperty === false){
          // // // // // // console.log("🚀 ~ file: proj-view.js:172 ~ ProjView ~ initializeDropDownDisplay ~ dropDownProperty === false:", dropDownProperty === false)
          dropDownDiv.style.display = 'none';
          }
    }



    displayProjList(projArr, handleAddStep, handleEditStep, handleDeleteStep, handleEditProject){
    // // // // // // console.log("🚀 ~ file: proj-view.js:183 ~ ProjView ~ displayProjList ~ displayProjList START:")
    
    clearList(this.projList);
    
    
        projArr.forEach(proj => {
        
            // // // // // // console.log("🚀 ~ file: proj-view.js:187 ~ ProjView ~ displayProjList ~ proj:", proj)
            const projListItem = this.createProjListItem(proj, handleEditProject);
            
            const dropDownDiv = this.createDropDown(proj, handleAddStep, handleEditStep);
            const stepList = dropDownDiv.querySelector('.step-list');
            
            if(proj.stepArr){
                
                proj.stepArr.map((step) => {
            const stepItem = this.createStepItem(handleDeleteStep, handleEditStep, step, proj, projArr);
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
        // // // // // // console.log("🚀 ~ file: proj-view.js:183 ~ ProjView ~ displayProjList ~ displayProjList END:")
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
                // // // // // // // console.log("🚀 ~ file: proj-view.js:225 ~ ProjView ~ bindDeleteProject ~ event.target.parentElement:", event.target.parentElement)
                // // // // // // // console.log("🚀 ~ file: proj-view.js:225 ~ ProjView ~ bindDeleteProject ~ id:", id)
                handler(id)
                // // // // // // // console.log("🚀 ~ file: proj-view.js:222 ~ ProjView ~ bindDeleteProject ~ bindDeleteProject:")
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

