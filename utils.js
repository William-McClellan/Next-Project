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

export function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
    }

