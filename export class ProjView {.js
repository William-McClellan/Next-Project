export class ProjView {
  constructor() {
    // ...
  }

  // ...

  displayProjList(projArr, addStepHandler) {
    // ...
    projArr.forEach((proj) => {
      // ...
      const stepForm = createElement('form', 'step-form');

      const newStepInput = createElement('input', 'new-step-input');
      newStepInput.type = 'text';
      newStepInput.placeholder = 'small + precise = easy';

      dropDownButton.addEventListener('click', (event) => {
        if (event.target.className === 'dropdown-button') {
          stepForm.style.display = stepForm.style.display === 'block' ? 'none' : 'block';
          //console.log('dropDownButton HIT');
        }
      });

      stepForm.append(newStepInput);

      this.projList.append(stepForm);

      // Call the add step handler when the form is submitted
      stepForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const stepText = newStepInput.value;
        const projId = proj.id;
        if (stepText) {
          addStepHandler(projArr, projId, stepText);
          this.resetStepInput();
        }
      });

      // ...
    });
  }
}

// Define the setupAddStepHandler function outside of ProjView
function setupAddStepHandler(projArr, projId, stepText, handler) {
  // Find the project that matches the given projId
  const projIndex = projArr.findIndex((proj) => proj.id === projId);

  if (projIndex !== -1) {
    // Create the new step object
    const step = {
      text: stepText,
      id: new Date().getTime(),
      complete: false,
    };

    // Add the new step to the project's step array
    projArr[projIndex].stepArr.push(step);

    // Call the handler function
    handler(projArr);
  } else {
    console.log('addstep: project not found');
  }
}

const view = new ProjView();

// Call displayProjList and pass in the setupAddStepHandler function
view.displayProjList(projArr, (projArr, projId, stepText) => {
  setupAddStepHandler(projArr, projId, stepText, (projArr) => {
    instance.bindProjChanged(() => {
      view.displayProjList(instance.getproj(), addStepHandler);
    });
  });
});
