import { getElement, createElement } from "../utils.js";
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

        // create step list outside of displayStepList
        this.stepList = createElement('ol','step-list');

        this.newStepInput = createElement('input', 'new-step-input');
        this.newStepInput.type = 'text';
        this.newStepInput.placeholder = 'small + precise = easy';

    }

// PROJ METHODS
    
    resetInput(){
        this.projTextInput.value = '';
    }
    
    displayProjList(projArr, stepArr, handleAddStep, handleDeleteStep){


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

            projListItem.append(completeCheckbox, strikeThrough, projListItemSpan, deleteButton)

            const dropDownButton = createElement('button', 'dropdown-button');
            dropDownButton.textContent = 'Steps';
            projListItem.appendChild(dropDownButton);
            this.projList.append(projListItem);
            
            const stepForm = createElement('form', 'step-form');
                stepForm.append(this.newStepInput);
                stepForm.append(this.stepList);
                 this.projList.append(stepForm);


            const displayStepList = (proj) => {        
                dropDownButton.addEventListener('click', event => {
                    stepForm.style.display = 'none';
                if(event.target.className === 'dropdown-button'){
                    stepForm.style.display = (stepForm.style.display === 'block') ? 'none' : 'block';
                    console.log('test')

                    } 
                })
                // add step listener
                



                stepForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const stepText = this.newStepInput.value;
                    handleAddStep(proj.id, stepText);
                    this.resetInput(); 
                })
                // make this so that it only displays the steps for the project that is clicked and steps are linked to their respective projects
                // steps will need an ID and a projID which will be created in the model and passed to the view to display 
                if(stepArr){
                    this.stepList.innerHTML = '';
                    stepArr.forEach(step => {
                        const stepItem = createElement('li', 'step-item');
                        stepItem.textContent = step.textContent;
                        stepItem.id = step.id;
                        
                        const deleteStepButton = createElement('button', 'delete-step-button');
                        deleteStepButton.innerText = 'Delete';

                        // delete step listener
                        deleteStepButton.addEventListener('click', event =>{
                            if(event.target.className === 'delete-step-button'){
                            const stepId = parseInt(event.target.parentElement.id);
                            const projId = parseInt(proj.id);
                            handleDeleteStep(projArr, projId, stepId);
                            }
                        })

                        stepItem.append(deleteStepButton);
                        this.stepList.append(stepItem);

                        // stepList.addEventListener('focusout', event =>{
                        //             if(this._editText){
                        //                 const id = parseInt(event.target.parentElement.id)
                        //                 handler(id, this._editText)
                        //                 this._editText = ''
                        //             }
                        //         })
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
    
}

