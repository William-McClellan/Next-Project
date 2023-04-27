// todo
import todoModelInstance from './model/todo-model.js';
import {TodoController} from './todo-list/todo-controller.js';
import {TodoView} from './todo-list/todo-view.js';

// proj
import {ProjController} from './proj/proj-controller.js';
import projModelInstance from './model/proj-model.js';
import {ProjView} from './proj/proj-view.js';

// proj instances
const projView = new ProjView(projModelInstance);
const projController = new ProjController(projModelInstance,projView);

// todo instances
const todoView = new TodoView(todoModelInstance);
const todoController = new TodoController(todoModelInstance,todoView);

todoView.bindAddTodo(todoController.handleAddTodo);
todoView.bindDeleteTodo(todoController.handleDeleteTodo);
todoView.bindToggleComplete(todoController.handleToggleComplete);
todoView.bindEditTodo(todoController.handleEditTodo);

projView.addNewProjectListener(projController.handleAddProject);
projView.bindDeleteProject(projController.handleDeleteProject);
projView.bindToggleComplete(projController.handleToggleComplete);
projView.bindEditProject(projController.handleEditProject);


const initialproj = projModelInstance.getProjArr();

projView.displayProjList(initialproj, projController.handleAddStep, projController.handleEditStep, projController.handleDeleteStep);
console.log("After displaying project list - initialproj:", initialproj);


const initialTodoArray = todoModelInstance.getTodoArr();
const initialFirstStepArr = projModelInstance.getFirstStepArr();

todoView.displayTodoList( todoController.handleDeleteFirstStep ,initialTodoArray, initialFirstStepArr);

projModelInstance.bindProjChanged(() => {
           console.log("Inside bindProjChanged - Before displayProjList");

    projView.displayProjList(projModelInstance.getProjArr(), projController.handleAddStep, projController.handleEditStep, projController.handleDeleteStep)
    console.log("Inside bindProjChanged - After displayProjList");

        console.log("Inside bindProjChanged - Before displayTodoList");

    todoView.displayTodoList(todoController.handleDeleteFirstStep, todoModelInstance.getTodoArr(), projModelInstance.getFirstStepArr());
        console.log("Inside bindProjChanged - After displayTodoList");

   })

todoModelInstance.bindTodoArrChanged(() => {
    projView.displayProjList(projModelInstance.getProjArr(), projController.handleAddStep, projController.handleEditStep, 
    projController.handleDeleteStep)
    todoView.displayTodoList(todoController.handleDeleteFirstStep, todoModelInstance.getTodoArr(), projModelInstance.getFirstStepArr());
})







        
    

