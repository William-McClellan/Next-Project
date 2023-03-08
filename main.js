// Utils
import { subscribeToModel } from './utils.js';

// todo
import {TodoModel} from './model/todo-model.js';
import {TodoController} from './todo-list/todo-controller.js';
import {TodoView} from './todo-list/todo-view.js';

// proj
import {ProjModel} from './model/proj-model.js';
import {ProjController} from './proj/proj-controller.js';
import {ProjView} from './proj/proj-view.js';

// proj instances
const projModel = new ProjModel();
const projView = new ProjView(projModel);
const projController = new ProjController(projModel,projView);

// todo instances
const todoModel = new TodoModel();
const todoView = new TodoView(todoModel);
const todoController = new TodoController(todoModel,todoView);

todoView.bindAddTodo(todoController.handleAddTodo);
todoView.bindDeleteTodo(todoController.handleDeleteTodo);
todoView.bindToggleComplete(todoController.handleToggleComplete);
todoView.bindEditTodo(todoController.handleEditTodo);

projView.bindAddProject(projController.handleAddProject);
projView.bindDeleteProject(projController.handleDeleteProject);
projView.bindToggleComplete(projController.handleToggleComplete);
projView.bindEditProject(projController.handleEditProject);


subscribeToModel(projModel, projView, ()  => {
    return projModel.getproj();
});

subscribeToModel(todoModel, todoView, ()  => {
    return todoModel.gettodo();
});


const initialproj = projModel.getproj();
projView.displayprojList(initialproj);

const initialtodo = todoModel.gettodo();
todoView.displayTodoList(initialtodo);

projModel.bindProjChanged(proj => {
    projView.displayprojList(proj);
})

todoModel.bindtodoChanged(todoList => {
    todoView.displayTodoList(todoList);
})



        
    

