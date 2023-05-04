import { getElement, createElement, clearList} from "../utils.js";
import { ProjModel } from "../model/proj-model.js";

    
export class TodoView{
    constructor(rootElement ,model){
        this.createElement = createElement;
        this.clearList = clearList;

        this.model = model;
        this.app = rootElement;       

        this.todoDiv = createElement('div','todo-div')

//         document.addEventListener('focusout', event => {
//     if (!event.target.isContentEditable && event.target.type !== 'input') {
//         if (document.activeElement) {
//             document.activeElement.blur();
//         }
//     }
// });


        this.todoList = createElement('ul', 'todo-list');

        this.title = createElement('h1');
        this.title.textContent = 'Next Actions';

        this.form = createElement('form');

        this.todoTextInput = createElement('input','todo-input');
        this.todoTextInput.type = 'text';
        this.todoTextInput.placeholder = 'small + precise = actionable';

        this.submitTodoButton = createElement('button');
        this.submitTodoButton.textContent = 'Add';
        
        this.form.append(this.todoTextInput, this.submitTodoButton );
        this.todoDiv.append( this.title, this.form, this.todoList);
        this.app.append(this.todoDiv);

        this.firstStepList = createElement('ul', 'first-step-list');
    }

    resetInput(){
        this.todoTextInput.value = '';
    }

    createFirstStepItem(handleDeleteFirstStep, step, handleEditFirstStep){
      if(step){
      
        const firststepItem = createElement('li', 'first-step-item');
        firststepItem.id = step.id;

        const firststepItemSpan = createElement('span', 'editable');
        firststepItemSpan.contentEditable = true;
        firststepItemSpan.textContent = step.text;

        const firststepItemProjText = createElement('span', 'project-text');
        firststepItemProjText.textContent = '# ' + step.projText;

        // const firststepItemCheckbox = createElement('input');
        // firststepItemCheckbox.type = 'checkbox';
        // firststepItemCheckbox.checked = step.complete;

        const firststepItemDeleteButton = createElement('button', ['delete-button', 'delete-first-step-button']);
        firststepItemDeleteButton.textContent = 'Done';

        this.addDeleteFirstStepButtonListener( handleDeleteFirstStep, firststepItemDeleteButton, step);
        this.addEditTextListener(firststepItemSpan, handleEditFirstStep);

        firststepItem.append(firststepItemSpan, firststepItemProjText, firststepItemDeleteButton);
       
        return firststepItem;
      }
    }
    

    addDeleteFirstStepButtonListener(handleDeleteFirstStep, deleteButton, step){
        deleteButton.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-first-step-button') && e.target.classList.contains('delete-button')){
                e.preventDefault();
                console.log('Delete first step button clicked');
                console.log(e.target.parentElement)
                const projId = step.projId;
                const stepId = step.id;
                handleDeleteFirstStep(projId, stepId);
            }
        })
    }

    createTodoListPlaceHolder(){
        const todoListPlaceholder = createElement('p')
        todoListPlaceholder.textContent = 'Nothing left to do! Go to proj for more actions.'
        this.todoList.append(todoListPlaceholder)
    }

    createTodoListItem(todo, handleEditTodo){
        // console.log("🚀 ~ file: todo-view.js:85 ~ TodoView ~ createTodoListItem ~ handleEditTodo:", handleEditTodo)
        const todoListItem = createElement('li', 'todo-list-item')
        todoListItem.id = todo.id 

        // CHECKBOX SERVES NO PURPOSE, MAY BRING BACK LATER
        // const completeCheckbox = createElement('input')
        // completeCheckbox.type = 'checkbox'
        // completeCheckbox.checked = todo.complete
        // todoListItem.append(completeCheckbox)

        const todoListItemSpan = createElement('span', 'editable');
        todoListItemSpan.contentEditable = true;

        if(todo.complete === true){
            const strikeThrough = createElement('s', 's')
            strikeThrough.textContent = todo.text
            todoListItem.append(strikeThrough)
        }   else {
            todoListItemSpan.textContent = todo.text
            todoListItem.append(todoListItemSpan)
        }

        const deleteButton = createElement('button',['delete-todo-button', 'delete-button'])
        deleteButton.textContent = 'Done'
        todoListItem.append(deleteButton)

        this.addEditTextListener(todoListItemSpan, handleEditTodo)

        return todoListItem;
    }

    todoArrExistsAndPopulated(todoArr){
        if(todoArr && todoArr.length > 0){
            return true;
        } else {
            // // return console.log("🚀 ~ file: todo-view.js:116 ~ TodoView ~ todoArrExistsAndPopulated ~ todoArrExistsAndPopulated: FALSE")
            return false;
        }
    }

    firstStepArrExistsAndPopulated(firstStepArr){
        if(firstStepArr && firstStepArr.length > 0){
            return true;
        } else {
            // // return console.log("🚀 ~ file: todo-view.js:116 ~ TodoView ~ todoArrExistsAndPopulated ~ todoArrExistsAndPopulated: FALSE")
            return false;
        }
    }

    displayTodoList(handleDeleteFirstStep, todoArr, firstStepArr, handleEditTodo, handleEditFirstStep){
    console.log("🚀 ~ file: todo-view.js:133 ~ TodoView ~ displayTodoList ~ firstStepArr:", firstStepArr)

        clearList(this.todoList);
        clearList(this.firstStepList);
        
        if(!this.todoArrExistsAndPopulated(todoArr) && !this.firstStepArrExistsAndPopulated(firstStepArr)){
            console.log("🚀 ~ file: todo-view.js:144 ~ TodoView ~ displayTodoList ~ !this.todoArrExistsAndPopulated(todoArr) && !this.firstStepArrExistsAndPopulated(firstStepArr):", !this.todoArrExistsAndPopulated(todoArr) && !this.firstStepArrExistsAndPopulated(firstStepArr))
            this.createTodoListPlaceHolder();
         } else {
                todoArr.forEach(todo => {
                const todoListItem = this.createTodoListItem(todo, handleEditTodo);
                this.todoList.append(todoListItem)
                })
            if(this.firstStepArrExistsAndPopulated(firstStepArr)){
                console.log("🚀 ~ file: todo-view.js:149 ~ TodoView ~ firstStepArr.forEach ~ firstStepArr:", firstStepArr)
                firstStepArr.forEach((step) => {
                const firstStepItem = this.createFirstStepItem(handleDeleteFirstStep, step, handleEditFirstStep);

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

  addEditTextListener(element, handler){
        // console.log("🚀 ~ file: todo-view.js:190 ~ TodoView ~ addEditTextListener ~ element:", element)
        // console.log("🚀 ~ file: todo-view.js:190 ~ TodoView ~ addEditTextListener ~ handler:", handler)
        if(element && element.classList.contains('editable')){
            element.addEventListener('click', event => {
            event.stopPropagation(); 
        });
        
        element.addEventListener('blur', event => {
            let editText = event.target.textContent;
            let id = event.target.parentElement.id;
            // // // // // // console.log("🚀 ~ file: proj-view.js:133 ~ ProjView ~ addEditTextListener ~ event.target.parentElement:", event.target.parentElement)
            // // // // // // console.log("🚀 ~ file: proj-view.js:133 ~ ProjView ~ addEditTextListener ~ id:", id)
            // // // // // // console.log("🚀 ~ file: proj-view.js:138 ~ ProjView ~ addEditTextListener ~ id, editText BEFORE HANDLER CALL:", id, editText)
            handler(id, editText);
            // // // // // // console.log("🚀 ~ file: proj-view.js:140 ~ ProjView ~ addEditTextListener ~ id, editText AFTER HANDLER CALL:", id, editText)
        })
        }
    }

}

