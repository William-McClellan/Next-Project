export function clearList(list) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }    
}

export function getElement(selector){
        const element = document.querySelector(selector)
        return element
    }

export function createElement(tag, classNames = []) {
        const element = document.createElement(tag);
        element.className = Array.isArray(classNames) ? classNames.join(' ') : classNames;
        return element;
    }   

export function addEditTextListener(element, handler){
        if(element && element.classList.contains('editable')){
            element.addEventListener('click', event => {
            event.stopPropagation(); 
        });
        
        element.addEventListener('blur', event => {
            let editText = event.target.textContent;
            let id = event.target.parentElement.id;
            handler(id, editText);
        })
        }
    }



