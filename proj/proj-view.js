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
        this.projListItem = createElement('div', 'proj-list-item')

        this.projItemCheckbox = createElement('input')
        this.projItemCheckbox.type = 'checkbox'

        this.dropDownDiv = createElement('div','dropdown-div');

        this.projListItemSpan = createElement('span', 'editable');
        this.projListItemSpan.contentEditable = true;

        this.deleteProjButton = createElement('button', 'proj-delete-button');
        this.deleteProjButton.textContent = 'Delete';

        this.strikeThrough = createElement('s', 's')

        this.stepItem = createElement('li', 'step-item');
                    
        this.dropDownButton = createElement('button', 'dropdown-button');
        this.dropDownButton.textContent = 'Steps';

        this.deleteStepButton = createElement('button', 'delete-step-button');
        this.deleteStepButton.innerText = 'Delete';

        this.stepList = createElement('ol','step-list');

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

        this.dropDownDiv = createElement('div','dropdown-div');

        this.newStepInput =  createElement('input', 'new-step-input');
        this.newStepInput.type = 'text';
        this.newStepInput.placeholder = 'small + precise = easy';

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
            this.projListItem.id = proj.id;
            this.projItemCheckbox.checked = proj.complete; 
            
            this.projListItem.append(this.projItemCheckbox);

            if(proj.complete === true){
                console.log('complete')
                this.strikeThrough.textContent = proj.text;
                this.projListItem.append(this.strikeThrough);
            }   else {
                console.log('incomplete')

                this.projListItemSpan.textContent = proj.text;
                this.projListItem.append(this.projListItemSpan);
            }
            this.projListItem.append(this.deleteProjButton, this.dropDownButton, this.dropDownDiv);

            this.projList.append(this.projListItem);

            this.displayStepList(proj);
            })
            console.log(projArr);
    }

    displayStepList(proj){        
        this.stepForm.append(this.newStepInput);
        this.dropDownDiv.append(this.stepForm);
        
        if(proj.stepArr){
            console.log('if(proj.stepArr) === true')
            proj.stepArr.map((step) => {
                this.stepItem.textContent = step.textContent;
                
                this.stepList.append(this.stepItem);
                this.dropDownDiv.append(this.stepList);
                })            
            }
            
            this.dropDownButton.addEventListener('click', event => {
            if(event.target.className === 'dropdown-button'){
                console.log('dropdown hit')
                this.dropDownDiv.style.display = (this.dropDownDiv.style.display === 'block') ? 'none' : 'block';
            }
            })
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
    
    resetStepInput(){
        this.newStepInput.value = '';
    }

    _initStepEditTextListener(){
        this.stepList.addEventListener('input', event => {
            if(event.target.className === 'editable'){
                const _stepEditText = event.target.textContent;
            }
        })
    }

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