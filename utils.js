// export function subscribeToModel(model,view,callback){
//     model.addSubscriber(() => {
//         const data = callback(model);
//         view.displayTodoList(data);
//     })
// }

export function getElement(selector){
        const element = document.querySelector(selector)
        return element
    }
export function createElement(tag, className){
        const element = document.createElement(tag)

        if(className) element.classList.add(className)
        return element
    }


