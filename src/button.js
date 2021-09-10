import {} from './inputs.js'
import {stayActive, displayList} from './methods.js'

//Default Buttons
const allButton = document.getElementById('all-button');
allButton.classList.add('project-button');
allButton.classList.add('inactive');
allButton.textContent = "All Items"

const todayButton = document.getElementById('today-button');
todayButton.classList.add('inactive');
todayButton.classList.add('project-button')
todayButton.textContent = "Today"

const weekButton = document.getElementById('week-button');
weekButton.classList.add('inactive');
weekButton.classList.add('project-button');
weekButton.textContent = "This week"

const projects = {};
const arrayCheck = [];
//function that creates a new object with corresponding value pairs from arrayCheck.

function projFolder(project){
  projects[project.childNodes[0].firstChild.textContent] = project.childNodes[0].firstChild.textContent;
  console.log(projects)
}

//Removes a project folder from project folder list.
//Removes array item associated with that project folder (arrayCheck) 
//Now also removes item associated with object folder (projects)

function removeProject(e){
  for (const key in projects){
    if (e.target.parentNode.firstChild.textContent == projects[key]){
      for(let i = 0; i < arrayCheck.length; i++){
        if (arrayCheck[i] === projects[key]){
          delete arrayCheck[i];
        }
      }
      delete projects[key];
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log(projects);
    }
  }
}

function buttonListeners(){
  allButton.addEventListener("click",stayActive);
  allButton.addEventListener("click",displayList);
  
  todayButton.addEventListener("click",stayActive);
  todayButton.addEventListener("click",displayList);
  
  weekButton.addEventListener("click",stayActive);
  weekButton.addEventListener("click",displayList);
  
}

export {
  removeProject,
  projFolder,
  buttonListeners,
  arrayCheck,
  projects,
}