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

    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }
    
    
    displayProjList(projArr, handleAddStep, handleDeleteStep, handleEditStep){
            console.log('DISPLAYED');

        while(this.projList.firstChild){
            this.projList.removeChild(this.projList.firstChild)
        }

        projArr.forEach(proj => {
            const projListItem = createElement('div', 'proj-list-item')
            projListItem.id = proj.id
            
            const completeCheckbox = createElement('input')
            completeCheckbox.type = 'checkbox'
            completeCheckbox.checked = proj.complete; 

            const projListItemSpan = createElement('span', 'editable');
            projListItemSpan.contentEditable = true;

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
         
            projListItem.append(completeCheckbox, strikeThrough, projListItemSpan, deleteButton)

            projListItem.appendChild(dropDownButton);

          

            

            const displayStepList = (proj) => {        
                // DOM ELEMENTS                    

                const stepList = createElement('ol','step-list');

                const newStepInput =  createElement('input', 'new-step-input')
                newStepInput.type = 'text';
                newStepInput.placeholder = 'small + precise = easy';

                const stepForm = createElement('form', 'step-form');

                const dropdownDiv = createElement('div', 'dropdown-div');
                
                if(proj.dropDownButtonOn === false){
                dropdownDiv.style.display = 'none';
                }
                console.log('display func made proj.dropDownButtonOn = ' + proj.dropDownButtonOn);

                stepForm.append(newStepInput);

                dropdownDiv.append(stepForm, stepList);

                this.projList.append(projListItem, dropdownDiv );

                // LINSTENERS

                // edit step listener
                 stepList.addEventListener('input', event => {
                    if(event.target.className === 'editable'){
                        const _stepEditText = event.target.textContent;
                        handleEditStep(_stepEditText);
                    }
                     })

                 // add step listener
                stepForm.addEventListener('submit', (event) =>{
                    event.preventDefault();
                    const newStepText = newStepInput.value;
                    handleAddStep(proj.id, newStepText);
                    console.log('newStepText = ' + newStepText);

                // Refocus the input field after submission with a slight delay NOT WORKING

                    setTimeout(() => newStepInput.focus(), 50);
                })


                dropDownButton.addEventListener('click', event => {
                    if(event.target.className === 'dropdown-button' && dropdownDiv.style.display === 'none' ){
                    dropdownDiv.style.display = 'block';
                    projListItem.style.borderBottom = 'none';
                    proj.dropDownButtonOn = true;
                    newStepInput.focus();
                } else if (event.target.className === 'dropdown-button'){
                    dropdownDiv.style.display = 'none';
                    projListItem.style.borderBottom = '4px solid lightblue';

                    proj.dropDownButtonOn = false;
                    }
                }
                )
                
                if(proj.stepArr){
                    proj.stepArr.map((step) => {
                        const stepItem = createElement('li', 'step-item');
                        stepItem.textContent = step.text;
                        console.log('stepItem.textContent = ' + stepItem.textContent);
                        console.log('step.textContent = ' + step.textContent);
                        stepItem.id = step.id;
                        
                        const deleteStepButton = createElement('button', 'delete-step-button');
                        deleteStepButton.innerText = 'Delete';

                        stepItem.append(deleteStepButton);
                        stepList.append(stepItem);

                        // delete step listener
                        deleteStepButton.addEventListener('click', event =>{
                            if(event.target.className === 'delete-step-button'){
                            const stepId = parseInt(event.target.parentElement.id);
                            const projId = parseInt(proj.id);
                            console.log('projId = ' + projId);
                            handleDeleteStep(projArr, projId, stepId);
                            }
                        })
                        })          
                    }
                 }       
                 displayStepList(proj);
                })
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

}

