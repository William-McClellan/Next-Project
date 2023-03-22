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
        this.newStepText = '';

        this.dropDownDiv = document.querySelector('.dropdown-div')
        this.newStepInput =  createElement('input', 'new-step-input')
        this.stepForm = createElement('form', 'step-form');

        console.log('proj Form constructreeeeeeed');
    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }
    
    displayProjList(projArr){
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

            const dropDownDiv = createElement('div','dropdown-div');

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
            projListItem.append( dropDownDiv);
            // const dropDownDiv = createElement('div', 'dropdown-div');

            const dropDownButton = createElement('button', 'dropdown-button');
            dropDownButton.textContent = 'Steps';
            projListItem.appendChild(dropDownButton);

            this.projList.append(projListItem, dropDownDiv);

            const displayStepList = (proj) => {        
                const stepList = createElement('ol','step-list');
                
                this.newStepInput.type = 'text';
                this.newStepInput.placeholder = 'small + precise = easy';

                this.stepForm.appendChild(this.newStepInput);
                dropDownDiv.appendChild(this.stepForm);
                
                if(proj.stepArr){
                    proj.stepArr.map((step) => {
                        const stepItem = createElement('li', 'step-item');
                        stepItem.textContent = step.textContent;
                        
                        const deleteStepButton = createElement('button', 'delete-step-button');
                        deleteStepButton.innerText = 'Delete';
                        

                        stepList.appendChild(stepItem);
                        dropDownDiv.appendChild(stepList);
                        console.log('if statement triggered');
                        })            
                    }
                    
                    dropDownButton.addEventListener('click', event => {
                    if(event.target.className === 'dropdown-button'){
                        console.log('dropDownButton HIT')
                        dropDownDiv.style.display = (dropDownDiv.style.display === 'block') ? 'none' : 'block';
                    }
                    })
                }       
                displayStepList(proj);


                })
                console.log(projArr);
    }
    get _newStepText(){
        const _newStepText = this.newStepInput.value;
        console.log('newStepText = ' + _newStepText);
        return _newStepText;
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
                handler(this._projText, this.newStepInput )
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

    _initEditTextListener(){
        this.projList.addEventListener('input', event =>{
            if(event.target.className === 'editable'){
                this._editText = event.target.innerText
            }
        })
    }

    // PROJECT STEP METHODS
    
    // display
    



    
    resetStepInput(){
        this.newStepInput.value = '';
    }


    //STEP METHOD BINDING / LISTENERS


    _initStepEditTextListener(){
        this.stepList.addEventListener('input', event => {
            if(event.target.className === 'editable'){
                const _stepEditText = event.target.textContent;
            }
        })
    }

    //make the event target the projList and then reference the input with 'new-step-input' ID and see if that works 

    bindAddStep(handler){
        if(this.stepForm){
            this.stepForm.addEventListener('submit', event => {
                event.preventDefault();

                if(this._newStepText){
                    console.log('bindAddStep triggered'); 
                        handler(this._newStepText)
                        this.resetStepInput();
                }
            })
            
            }
        }

    bindDeleteStep(handler){
        this.projList.addEventListener('click', event =>{
            if(event.target.className === 'delete-step-button'){
                const id = parseInt(event.target.id)
                handler(id);
            }
        })
    }

    // bindToggleComplete(handler){

    // }

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