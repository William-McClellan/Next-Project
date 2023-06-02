import { createElement, clearList, truncateString} from "../utils.js";
export class TodoView{
    constructor(rootElement , model, controller = null){
        this.createElement = createElement;
        this.clearList = clearList;

        this.model = model;
        this.app = rootElement;   
        this.controller = controller;    

        this.todoDiv = createElement('div','todo-div')

        this.todoList = createElement('ul', 'todo-list');

        this.title = createElement('h1');
        this.title.textContent = 'Next Actions';

        this.form = createElement('form');

        this.todoTextInput = createElement('input','todo-input');
        this.todoTextInput.type = 'text';
        this.todoTextInput.placeholder = 'Small + precise = actionable.';

        this.submitTodoButton = createElement('button', 'submit-todo-button');
        this.submitTodoButton.textContent = 'Add';
        
        this.form.append(this.todoTextInput, this.submitTodoButton );
        this.todoDiv.append( this.title, this.form, this.todoList);
        this.app.append(this.todoDiv);

        this.firstStepList = createElement('ul', 'first-step-list');
    }

    resetInput(){
        this.todoTextInput.value = '';
    }

      setTextareaToSavedHeight(savedHeight, textarea, handleSaveHeight){
    if(savedHeight){
        textarea.style.height = savedHeight;
    } else {
        window.requestAnimationFrame(() => {
            textarea.style.height = (textarea.scrollHeight) + 'px'; 
            handleSaveHeight(textarea.id, textarea.style.height);
        });
    }
}

    createFirstStepItem(handleDeleteFirstStep, step, handleGetHeight, handleSaveHeight){
      if(step){
      
        const firststepItem = createElement('li', 'first-step-item');
        firststepItem.id = step.id;

        const firststepItemTextarea = createElement('textarea', ['editable', 'first-step-item-text']);
        firststepItemTextarea.value = step.text;
        this.setTextareaToSavedHeight(handleGetHeight(step.id), firststepItemTextarea, handleSaveHeight);
        this.listenForInputThenResize(firststepItemTextarea, handleSaveHeight);

        const firststepItemProjText = createElement('span', 'project-text');
        const truncatedFirstStepItemProjText = truncateString(step.projText, 20);
        firststepItemProjText.textContent = '# ' + truncatedFirstStepItemProjText;
        
        const firststepItemDeleteButton = createElement('button', ['delete-button', 'delete-first-step-button']);
        firststepItemDeleteButton.textContent = 'Done';

        this.addDeleteFirstStepButtonListener( handleDeleteFirstStep, firststepItemDeleteButton, step);

        firststepItem.append(firststepItemTextarea, firststepItemProjText, firststepItemDeleteButton);
       
        return firststepItem;
      }
    }

    addDeleteFirstStepButtonListener(handleDeleteFirstStep, deleteButton, step){
        deleteButton.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-first-step-button') && e.target.classList.contains('delete-button')){
                e.preventDefault();
                const projId = step.projId;
                const stepId = step.id;
                handleDeleteFirstStep(projId, stepId);
            }
        })
    }

    resizeToScrollHeight(textarea, handleSaveHeight) {
        textarea.style.height = 'auto'; 
        textarea.style.height = (textarea.scrollHeight) + 'px'; 
        handleSaveHeight(textarea.id, textarea.style.height);
    }

   listenForInputThenResize(textarea, handleSaveHeight){
       textarea.addEventListener('input', () => {
         this.resizeToScrollHeight(textarea, handleSaveHeight);
        });
    }
    
    createTodoListPlaceHolder(){
        const todoListPlaceholder = createElement('p')
        todoListPlaceholder.textContent = 'Nothing left to do! Add steps to a project to create more next actions, or add small todos yourself.'
        this.todoList.append(todoListPlaceholder)
    }

    createTodoListItem(todo, handleGetHeight, handleSaveHeight){
        const todoListItem = createElement('li', 'todo-list-item')
        todoListItem.id = todo.id 

        const todoListItemTextarea = createElement('textarea', ['editable', 'todo-list-item-text']);
        todoListItemTextarea.value = todo.text;
        todoListItemTextarea.id = todo.id;

        this.setTextareaToSavedHeight(handleGetHeight(todoListItemTextarea.id), todoListItemTextarea, handleSaveHeight);
        this.listenForInputThenResize(todoListItemTextarea, handleSaveHeight);

        todoListItemTextarea.textContent = todo.text
        todoListItem.append(todoListItemTextarea)

        const deleteButton = createElement('button',['delete-todo-button', 'delete-button'])
        deleteButton.textContent = 'Done'
        todoListItem.append(deleteButton)


        return todoListItem;
    }

    todoArrExistsAndPopulated(todoArr){
        if(todoArr && todoArr.length > 0){
            return true;
        } else {
            return false;
        }
    }

    firstStepArrExistsAndPopulated(firstStepArr){
        if(firstStepArr && firstStepArr.length > 0){
            return true;
        } else {
            return false;
        }
    }

    displayTodoList({
        handleDeleteFirstStep,
        todoArr,
        firstStepArr,
        handleGetHeight,
        handleSaveHeight
    }){

        clearList(this.todoList);
        clearList(this.firstStepList);
        
        if(!this.todoArrExistsAndPopulated(todoArr) && !this.firstStepArrExistsAndPopulated(firstStepArr)){
            this.createTodoListPlaceHolder();
         } else {
                todoArr.forEach(todo => {
                const todoListItem = this.createTodoListItem(todo, handleGetHeight, handleSaveHeight);
                this.todoList.append(todoListItem)
                })
            if(this.firstStepArrExistsAndPopulated(firstStepArr)){
                firstStepArr.forEach((step) => {
                const firstStepItem = this.createFirstStepItem(handleDeleteFirstStep, step, handleGetHeight, handleSaveHeight);

                this.firstStepList.append(firstStepItem);
                this.todoList.prepend(this.firstStepList);
            })
        }
        }
    }

    get _todoText(){
        const _todoText = this.todoTextInput.value
        return _todoText
    }
    
    bindAddTodo(handler){
        this.form.addEventListener('submit', event =>{
            event.preventDefault()

            if(this._todoText){
                handler(this._todoText)
                this.resetInput()
            }
        })
    }

    bindDeleteTodo(handler){
        this.todoList.addEventListener('click', event =>{
            if(event.target.className === "delete-todo-button delete-button"){
                const id = event.target.parentElement.id
                handler(id)    
            }
        })
        
    }

    bindToggleComplete(handler){
        this.todoList.addEventListener('change', event =>{
            if(event.target.type === 'checkbox'){
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
        })
    }

}


