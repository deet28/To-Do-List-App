import {projectArray, allFolder} from './inputs.js'
import {stayActive, displayList,headDiv,doList} from './methods.js'

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
//can't decide if this is entirely neccessary? 
function projFolder(project){
  projects[project.childNodes[0].firstChild.textContent] = project.childNodes[0].firstChild.textContent;
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
        delete projects[key];
      }
    }
      removeHeader(e);
      removeFullProject(e);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
  }
}

// Removes header from list when project deleted whose header is on page. 
function removeHeader(e){
  let folderButtons = document.querySelectorAll('.project-button');
  for(let i = 0; i < folderButtons.length;i++){
    if (folderButtons[i].classList.contains('active')&& folderButtons[i].textContent == e.target.parentNode.firstChild.textContent){
      headDiv.textContent = "";
      doList.textContent = "";
    }
  }
}

//Removes full project list if project is open and it is deleted. 
function removeFullProject(e){
  let removedProject = e.target.parentNode.firstChild.textContent
  for (let i = 0; i < projectArray.length; i++){
  if (removedProject == projectArray[i].name){
    projectArray[i].list.splice(0);
    removeFromAll(removedProject);
    }
  }
}
function removeFromAll(item){
  for (let i = 0; i < allFolder.length; i++){
    if (allFolder[i].includes(`(${item})`)){
      doList.removeChild(item.parentNode);
  
// delete all parentnodes that contain ('projectfolder' title).
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