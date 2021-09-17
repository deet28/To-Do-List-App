import {projectArray, allFolder} from './inputs.js'
import {stayActive, displayList,removeHeader,getAll, deleteAllFromAll} from './methods.js'

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
  return projects;
}

//Removes a project folder from project folder list.
//Removes array item associated with that project folder (arrayCheck) 
//Now also removes item associated with object folder (projects)

function removeProject(e){
  for (const key in projects){
  if (e.target.parentNode.firstChild.textContent == projects[key]){
    for(let i = 0; i < arrayCheck.length; i++){
    if (arrayCheck[i] == projects[key]){
      delete arrayCheck[i];
      delete projects[key];
      }
    }
      deleteAllFromAll(e);
      removeHeader(e);
      removeFullProject(e)
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
  }
}

//Removes full project list if project is open and it is deleted. 
function removeFullProject(e){
  let removedProject = e.target.parentNode.firstChild.textContent
  for (let i = 0; i < projectArray.length; i++){
  if (removedProject == projectArray[i].name){
    projectArray.splice(projectArray[i],1);
    console.log(projectArray);
    }
  }
}


//don't think I need this?
//function removeFromAll(item){
//  for (let i = 0; i < allFolder.length; i++){
//    if (allFolder[i].includes(`(${item})`)){
//      doList.removeChild(item.parentNode);
//  }
//}
//}

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
  removeFullProject,
  projFolder,
  buttonListeners,
  arrayCheck,
  projects,
  allButton
}