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

projView.bindAddStep(projController.handleAddStep);
projView.bindDeleteStep(projController.handleDeleteStep);
// projView.bindStepToggleComplete(projController.handleStepToggleComplete);
projView.bindEditStep(projController.handleEditStep);




// subscribeToModel(projModel, projView, ()  => {
//     return projModel.getproj();
// });

// subscribeToModel(todoModel, todoView, ()  => {
//     return todoModel.gettodo();
// });


const initialproj = projModel.getproj();

// const initialStep = projModel.getStepArr(); NOT NEEDED BECAUSE STEPLIST IS NOW DISPLAYED FROM DISPLAY

projView.displayProjList(initialproj);

// projView.displayStepList(initialStep);

const initialtodo = todoModel.gettodo();
todoView.displayTodoList(initialtodo);

projModel.bindProjChanged(proj => {
    projView.displayProjList(proj);
})

projModel.bindStepArrChanged(proj => {
    projView.displayStepList(proj);
})

todoModel.bindtodoChanged(todoList => {
    todoView.displayTodoList(todoList);
})



        
    

