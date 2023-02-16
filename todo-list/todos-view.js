export class View{
    constructor(){
        this.app = this.getElement('#root')       
        
        this.todoList = this.createElement('ul', 'todo-list')

        this.title = this.createElement('h1')
        this.title.textContent = 'Next Actions'

        this.form = this.createElement('form')

        this.todoTextInput = this.createElement('input','todoInput')
        this.todoTextInput.type = 'text'
        this.todoTextInput.placeholder = 'What to do...'

        this.submitTodoButton = this.createElement('button')
        this.submitTodoButton.textContent = 'Add'
        
        this.form.append(this.todoTextInput, this.submitTodoButton )
        this.app.append(this.title, this.form, this.todoList)

        this._initEditTextListener()
        this._editText = ''
        }


    getElement(selector){
        const element = document.querySelector(selector)
        return element
    }

    createElement(tag, className){
        const element = document.createElement(tag)

        if(className) element.classList.add(className)
        return element
    }

    resetInput(){
        this.todoTextInput.value = ''
    }



    displayTodoList(todos){
        while(this.todoList.firstChild){
            this.todoList.removeChild(this.todoList.firstChild)
        }
        if(todos.length === 0){
            console.log(todos)
            const todoListPlaceholder = this.createElement('p')
            todoListPlaceholder.textContent = 'Nothing left to do! Go to projects for more actions.'
            this.todoList.append(todoListPlaceholder)
        } else {
            todos.forEach(todo => {
                const todoListItem = this.createElement('li', 'todoListItem')
                todoListItem.id = todo.id
                // todoListItem.classList.add('li');

                const completeCheckbox = this.createElement('input')
                completeCheckbox.type = 'checkbox'
                completeCheckbox.checked = todo.complete
                todoListItem.append(completeCheckbox)

                const todoListItemSpan = this.createElement('span', 'editable');
                todoListItemSpan.contentEditable = true;

                    if(todo.complete === true){
                        const strikeThrough = this.createElement('s', 's')
                        strikeThrough.textContent = todo.text
                        todoListItem.append(strikeThrough)
                    }   else {
                        todoListItemSpan.textContent = todo.text
                        todoListItem.append(todoListItemSpan)
                    }

                const deleteButton = this.createElement('button', 'Delete')
                deleteButton.textContent = 'Delete'

                todoListItem.append(deleteButton)

                this.todoList.append(todoListItem)
            })
       }
       console.log(todos)
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
            if(event.target.className === 'Delete'){
                const id = parseInt(event.target.parentElement.id)
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

     _initEditTextListener(){
        this.todoList.addEventListener('input', event =>{
            if(event.target.className === 'editable'){
                this._editText = event.target.innerText
            }
        })
    }

    bindEditTodo(handler){
        this.todoList.addEventListener('focusout', event =>{
            if(this._editText){
                const id = parseInt(event.target.parentElement.id)
                handler(id, this._editText)
                this._editText = ''
            }
        })
    }
}
