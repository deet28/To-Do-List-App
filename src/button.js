import {arrayCheck, projectList} from './inputs.js'

//Project Title Div
const headDiv = document.getElementsByClassName('to-do-head')[0];
let listHeader  = document.createElement('h2');

//Buttons for switching between project sections
const allButton = document.getElementById('all-button');
const todayButton = document.getElementById('today-button');
const weekButton = document.getElementById('week-button');

const projects = {};
//function that creates a new object with corresponding value pairs from arrayCheck.
function projFolder(project){
  projects[project.childNodes[0].firstChild.textContent] = project.childNodes[0].firstChild.textContent;
  console.log(projects);
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
//Appends project title to Right Div.
function displayList(e){
  listHeader.textContent = e.target.textContent;
  headDiv.appendChild(listHeader);
}
function buttonListeners(){
  allButton.addEventListener("click",displayList);
  todayButton.addEventListener("click",displayList);
  weekButton.addEventListener("click",displayList);
}

export {
  displayList,
  removeProject,
  projFolder,
  buttonListeners,
}