
// todo
import todoModelInstance from './model/todo-model.js';
import {TodoController} from './todo-list/todo-controller.js';
import {TodoView} from './todo-list/todo-view.js';

// proj
import {ProjController} from './proj/proj-controller.js';
import projModelInstance from './model/proj-model.js';
import {ProjView} from './proj/proj-view.js';

const rootElement = document.getElementById('root');

// proj instances
const projView = new ProjView(rootElement, projModelInstance);
const projController = new ProjController(projModelInstance, projView);

// todo instances
const todoView = new TodoView(rootElement, todoModelInstance);
const todoController = new TodoController(todoModelInstance,todoView);

todoView.bindAddTodo(todoController.handleAddTodo);
todoView.bindDeleteTodo(todoController.handleDeleteTodo);
todoView.bindToggleComplete(todoController.handleToggleComplete);
todoController.addFocusOutListener();

projView.addNewProjectListener(projController.handleAddProject);
projView.bindDeleteProject(projController.handleDeleteProject);
projView.bindToggleComplete(projController.handleToggleComplete);
projController.addFocusOutListener();


const initialproj = projModelInstance.getProjArr();

projView.displayProjList(initialproj, projController.handleAddStep, projController.handleDeleteStep, projController.handleEditProject);


const initialTodoArray = todoModelInstance.getTodoArr();
const initialFirstStepArr = projModelInstance.getFirstStepArr();

todoView.displayTodoList( todoController.handleDeleteFirstStep ,initialTodoArray, initialFirstStepArr, todoController.handleEditTodo, todoController.handleEditFirstStep);

projModelInstance.bindProjChanged(() => {

    projView.displayProjList(projModelInstance.getProjArr(), projController.handleAddStep, projController.handleDeleteStep , projController.handleEditProject)


    todoView.displayTodoList(todoController.handleDeleteFirstStep, todoModelInstance.getTodoArr(), projModelInstance.getFirstStepArr(), todoController.handleEditTodo, todoController.handleEditFirstStep);

   })
   
//    console.log("🚀 ~ file: main.js:52 ~ todoModelInstance.bindTodoArrChanged ~ todoController.handleEditTodo:", todoController.handleEditTodo)
todoModelInstance.bindTodoArrChanged(() => {
    projView.displayProjList(projModelInstance.getProjArr(), projController.handleAddStep, 
    projController.handleDeleteStep, projController.handleEditProject)
    
    todoView.displayTodoList(todoController.handleDeleteFirstStep, todoModelInstance.getTodoArr(), projModelInstance.getFirstStepArr(), todoController.handleEditTodo, todoController.handleEditFirstStep);
    // console.log("🚀 ~ file: main.js:53 ~ todoModelInstance.bindTodoArrChanged ~ todoController.handleEditTodo:", todoController.handleEditTodo)
})








        
    

