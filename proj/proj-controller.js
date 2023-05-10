export class ProjController{
    constructor(model, view){
        this.model = model
        this.view = view

            // this.addDeselectContentEditableListener();

    }

//     addDeselectContentEditableListener() {
//   document.addEventListener('click', (event) => {
//     const targetElement = event.target;
//     console.log("🚀 ~ file: proj-controller.js:15 ~ ProjController ~ targetElement.parentElement.getAttribute ~ targetElement.parentElement:", targetElement.parentElement)
    
//     if (targetElement.getAttribute('contenteditable') !== 'true' &&
//         targetElement.parentElement.getAttribute('contenteditable') !== 'true') {
//       const focusedElement = document.querySelector('[contenteditable]:focus');
//       if (focusedElement) {
//         focusedElement.blur();
//       }
//     }
//   });
// }



    handleClick(event){
        event.target.addEventListener('click', event => {
            event.stopPropagation(); 
    })
    }

    handleFocusOut(event) {
        console.log("handleFocusOut event triggered");
        const targetElement = event.target;

        if (targetElement.classList.contains('editable')) {
            let editText = targetElement.textContent;
            let id = targetElement.parentElement.id;

            if (targetElement.parentElement.classList.contains('proj-list-item')) {
                this.model.editProject(id, editText);
            }

            if (targetElement.parentElement.classList.contains('step-item')) {
                const projId = this.model.getProjIdByStepId(id);
                this.model.editStep(id, editText, projId);
            }
        }

    }

    addFocusOutListener() {
        document.getElementById('root').addEventListener('focusout', this.handleFocusOut.bind(this));
    }

    // ...

    // PROJ HANDLERS
    handleAddProject = (projectText) =>{
        this.model.addProject(projectText)
    }
    handleDeleteProject = (id) =>{
        this.model.deleteProject(id)
    }
    handleEditProject = (id, editText) => {
        this.model.editProject(id, editText)
    }
    handleToggleComplete = (id) =>{
        this.model.toggleComplete(id)
    }

    // STEP HANDLERS
    handleAddStep = (projId, stepText) => {
        this.model.addStep( projId, stepText);
    }
    handleDeleteStep = (projId, stepId) => {
        console.log("🚀 ~ file: proj-controller.js:26 ~ ProjController ~ handleDeleteStep ~ projId, stepId:", projId, stepId)
        this.model.deleteStep(projId, stepId);
    }
    handleEditStep = (id, editText) =>{
        const projIndex = this.model.projArr.findIndex(proj => proj.stepArr.some(step => step.id === id));
        // console.log("🚀 ~ file: proj-controller.js:30 ~ ProjController ~ projIndex:", projIndex)
        if(projIndex !== -1){
        this.model.editStep(id, editText, projIndex);
        }
    }
}