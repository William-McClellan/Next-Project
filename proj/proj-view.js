import { getElement } from "../utils.js";
import { createElement } from "../utils.js";

export class ProjView{
    constructor(){
    
        // PROJECT CONSTRUCTION
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
        this.newStepText = this._newStepText;

        // this.dropDownDiv = document.querySelector('.dropdown-div');


        //console.log('proj Form constructreeeeeeed');
    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }
    
    displayProjList(projArr, handleAddStep, handleDeleteStep){
        while(this.projList.firstChild){
            this.projList.removeChild(this.projList.firstChild)
        }

        projArr.forEach(proj => {
            const projListItem = createElement('div', 'proj-list-item')
            projListItem.id = proj.id
            
            const completeCheckbox = createElement('input')
            completeCheckbox.type = 'checkbox'
            completeCheckbox.checked = proj.complete; 
            projListItem.append(completeCheckbox)

            // const dropDownDiv = createElement('div','dropdown-div');

            const projListItemSpan = createElement('span', 'editable');
            projListItemSpan.contentEditable = true;

                if(proj.complete === true){
                    const strikeThrough = createElement('s', 's')
                    strikeThrough.textContent = proj.text
                    projListItem.append(strikeThrough)
                }   else {
                    projListItemSpan.textContent = proj.text
                    projListItem.append(projListItemSpan)
                }

            const deleteButton = createElement('button', 'proj-delete-button')
            deleteButton.textContent = 'Delete'

            projListItem.append(deleteButton)
            // this.projList.append( dropDownDiv);
            // const dropDownDiv = createElement('div', 'dropdown-div');

            const dropDownButton = createElement('button', 'dropdown-button');
            dropDownButton.textContent = 'Steps';
            projListItem.appendChild(dropDownButton);
            
            this.projList.append(projListItem);

            const displayStepList = (proj) => {        
                //console.log('displayStepList triggered');
                const stepList = createElement('ol','step-list');

                const stepForm = createElement('form', 'step-form');

                const newStepInput =  createElement('input', 'new-step-input')
                newStepInput.type = 'text';
                newStepInput.placeholder = 'small + precise = easy';


                dropDownButton.addEventListener('click', event => {
                if(event.target.className === 'dropdown-button'){
                    stepForm.style.display = (stepForm.style.display === 'block') ? 'none' : 'block';

                    } 
                    
                    })

                    stepForm.addEventListener('click', event => {
                        event.stopPropagation();
                    });
                
                stepForm.append(newStepInput);

                this.projList.append(stepForm);

                // add step listener
                stepForm.addEventListener('submit', event =>{
                    event.preventDefault()
                    const newStepText = newStepInput.value;
                    handleAddStep(proj.id, newStepText);
                    newStepInput.value = '';
                })
                
                if(proj.stepArr){
                    proj.stepArr.map((step) => {
                        const stepItem = createElement('li', 'step-item');
                        stepItem.textContent = step.textContent;
                        stepItem.id = step.id;
                        //console.log('step textContent = ' + step.textContent);
                        
                        const deleteStepButton = createElement('button', 'delete-step-button');
                        deleteStepButton.innerText = 'Delete';

                        // delete step listener
                        deleteStepButton.addEventListener('click', event =>{
                            if(event.target.className === 'delete-step-button'){
                            const stepId = parseInt(event.target.parentElement.id);
                            //console.log('stepId = ' + stepId);
                            const projId = parseInt(proj.id);
                            console.log('projId = ' + projId);
                            handleDeleteStep(projArr, projId, stepId);
                            }
                        })

                        stepItem.append(deleteStepButton);
                        stepList.append(stepItem);
                        stepForm.append(stepList);
                        //console.log('if statement triggered');
                        })            
                    }
                 }       
            
                 displayStepList(proj);
                })
                //console.log(projArr);
    }

     get _projText(){
        const _projText = this.projTextInput.value
        return _projText
    }
    
    // PROJ BINDING AND LISTENERS   
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

    // PROJECT STEP METHODS
    
    resetStepInput(){
        newStepInput.value = '';
    }

    //STEP METHOD BINDING / LISTENERS

    _initStepEditTextListener(){
        this.stepList.addEventListener('input', event => {
            if(event.target.className === 'editable'){
                const _stepEditText = event.target.textContent;
            }
        })
    }

    bindEditStep(handler){
        this.projList.addEventListener('focusout', event =>{
            if(this._editText){
                const id = parseInt(event.target.parentElement.id)
                handler(id, this._editText)
                this._editText = ''
            }
        })
    }
}

