// todo
import {TodoModel} from './model/todo-model.js';
import {TodoController} from './todo-list/todo-controller.js';
import {TodoView} from './todo-list/todo-view.js';

// proj
import {ProjController} from './proj/proj-controller.js';
import {ProjModel} from './model/proj-model.js';
import {ProjView} from './proj/proj-view.js';

// proj instances
const projModel = new ProjModel();
const projView = new ProjView(projModel);
const projController = new ProjController(projModel,projView);

// todo instances
const todoModel = new TodoModel(projModel);
const todoView = new TodoView(todoModel);
const todoController = new TodoController(todoModel,todoView);

todoView.bindAddTodo(todoController.handleAddTodo);
todoView.bindDeleteTodo(todoController.handleDeleteTodo);
todoView.bindToggleComplete(todoController.handleToggleComplete);
todoView.bindEditTodo(todoController.handleEditTodo);

projView.addNewProjectListener(projController.handleAddProject);
projView.bindDeleteProject(projController.handleDeleteProject);
projView.bindToggleComplete(projController.handleToggleComplete);
projView.bindEditProject(projController.handleEditProject);


const initialproj = projModel.getProjArr();

projView.displayProjList(initialproj, projController.handleAddStep, projController.handleEditStep, projController.handleDeleteStep);

const initialtodo = todoModel.getTodoArr();
const initialFirstStepArr = projModel.getFirstStepArr();
todoView.displayTodoList(initialtodo, initialFirstStepArr);

projModel.bindProjChanged(() => {
    projView.displayProjList(projModel.getProjArr(), projController.handleAddStep, projController.handleDeleteStep)
    todoView.displayTodoList(todoModel.getTodoArr(), projModel.getFirstStepArr());
    localStorage.setItem("todoArr", JSON.stringify(todoModel.getTodoArr()))
    localStorage.setItem("projArr", JSON.stringify(projModel.getProjArr()))
    localStorage.setItem("firstStepArr", JSON.stringify(projModel.getFirstStepArr()))
})

todoModel.bindTodoArrChanged((projArr, firstStepArr) => {
    projView.displayProjList(projArr, projController.handleAddStep, projController.handleDeleteStep)
    todoView.displayTodoList(todoModel.getTodoArr(), firstStepArr);
    localStorage.setItem("todoArr", JSON.stringify(todoModel.getTodoArr()))
    localStorage.setItem("projArr", JSON.stringify(projArr))
    localStorage.setItem("firstStepArr", JSON.stringify(projModel.getFirstStepArr()))
})







        
    

