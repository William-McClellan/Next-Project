import {Model as todosModel} from './model/todos-model.js';
import {Controller as todosController} from './todo-list/todos-controller.js';
import {View as todosView} from './todo-list/todos-view.js';



        
    



const app = new todosController(new todosModel(), new todosView());