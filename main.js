
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


const initialProj = projModelInstance.getProjArr();
console.log("🚀 ~ file: main.js:38 ~ initialProj:", initialProj)

// display initial projects
projView.displayProjList({
    projArr: initialProj,
    handleAddStep: projController.handleAddStep,
    handleDeleteStep: projController.handleDeleteStep,
    handleEditProject: projController.handleEditProject,
    handleGetHeight: projController.handleGetHeight,
    handleSaveHeight: projController.handleSaveHeight,
    handleUpdateProjectDropDownProperty: projController.handleUpdateProjectDropDownProperty,
});


const initialTodoArray = todoModelInstance.getTodoArr();
const initialFirstStepArr = projModelInstance.getFirstStepArr();

// display initial todos
todoView.displayTodoList({
    handleDeleteFirstStep: todoController.handleDeleteFirstStep,
    todoArr: initialTodoArray,
    firstStepArr: initialFirstStepArr,
    handleGetHeight: todoController.handleGetHeight,
    handleSaveHeight: todoController.handleSaveHeight
});

const bindProjChangedArgs = {
    projArr: projModelInstance.getProjArr(),
    handleAddStep: projController.handleAddStep,
    handleDeleteStep: projController.handleDeleteStep,
    handleGetHeight: projController.handleGetHeight,
    handleSaveHeight: projController.handleSaveHeight,
    handleUpdateProjectDropDownProperty: projController.handleUpdateProjectDropDownProperty,
}

const bindTodoChangedArgs = { 
    handleDeleteFirstStep: todoController.handleDeleteFirstStep,
    todoArr: todoModelInstance.getTodoArr(),
    firstStepArr: projModelInstance.getFirstStepArr(),
    handleGetHeight: todoController.handleGetHeight,
    handleSaveHeight: todoController.handleSaveHeight
}

projModelInstance.bindProjChanged(() => {
    // get latest arrays
    bindProjChangedArgs.projArr = projModelInstance.getProjArr();
    console.log("🚀 ~ file: main.js:73 ~ projModelInstance.bindProjChanged ~ bindProjChangedArgs.projArr:", bindProjChangedArgs.projArr)
    
    projView.displayProjList(bindProjChangedArgs)

    // get latest arrays
    bindTodoChangedArgs.todoArr = todoModelInstance.getTodoArr();
    bindTodoChangedArgs.firstStepArr = projModelInstance.getFirstStepArr();

    todoView.displayTodoList(bindTodoChangedArgs);
    console.log("🚀 ~ file: main.js:88 ~ projModelInstance.bindProjChanged ~ bindProjChanged:")
})
   
todoModelInstance.bindTodoArrChanged(() => {
        // get latest arrays
    bindProjChangedArgs.projArr = projModelInstance.getProjArr();
    
    projView.displayProjList(bindProjChangedArgs)

    // get latest arrays
    bindTodoChangedArgs.todoArr = todoModelInstance.getTodoArr();
    bindTodoChangedArgs.firstStepArr = projModelInstance.getFirstStepArr();

    todoView.displayTodoList(bindTodoChangedArgs);
})