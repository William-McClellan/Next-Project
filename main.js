// Utils
import { subscribeToModel } from './utils.js';

// Todos
import {TodosModel} from './model/todos-model.js';
import {TodosController} from './todo-list/todos-controller.js';
import {TodosView} from './todo-list/todos-view.js';

// Projects
import {ProjectsModel} from './model/projects-model.js';
import {ProjectsController} from './projects/projects-controller.js';
import {ProjectsView} from './projects/projects-view.js';

// todos instances
const todosModel = new TodosModel();
const todosView = new TodosView(todosModel);
const todosController = new TodosController(todosModel,todosView);

todosView.bindAddTodo(todosController.handleAddTodo);
todosView.bindDeleteTodo(todosController.handleDeleteTodo);
todosView.bindToggleComplete(todosController.handleToggleComplete);
todosView.bindEditTodo(todosController.handleEditTodo);

// projects instances
const projectsModel = new ProjectsModel();
const projectsView = new ProjectsView(projectsModel);
const projectsController = new ProjectsController(projectsModel,projectsView);


projectsView.bindAddProject(projectsController.handleAddProject);
projectsView.bindDeleteProject(projectsController.handleDeleteProject);
projectsView.bindToggleComplete(projectsController.handleToggleComplete);
projectsView.bindEditProject(projectsController.handleEditProject);


subscribeToModel(todosModel, todosView, ()  => {
    return todosModel.getTodos();
});

subscribeToModel(projectsModel, projectsView, ()  => {
    return projectsModel.getTodos();
});

subscribeToProjectsModel(projectsModel, projectsView, (model)  => {
    return model.getProjects();
});

const initialTodos = todosModel.getTodos();
todosView.displayTodoList(initialTodos);

todosModel.bindTodosChanged(todos => {
    todosView.displayTodoList(todos);
})


        
    

