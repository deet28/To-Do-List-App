import {
  projFolder,
  displayList,
  removeProject
} from './button.js';

//Tracking Projects
const projectList = document.getElementsByClassName('project-list')[0];
const arrayCheck = [];

//Left Div Input. (Buttons and Inputs involved with creating new project folder)
const addButton = document.getElementById('add-button');
const inputVal = document.getElementsByClassName('input-value')[0];
const newProject = document.getElementsByClassName('new-project')[0];
const inputDiv = document.getElementsByClassName('input-box')[0];
const closeProject = document.getElementsByClassName('close-project')[0];

//Right Div Input. (Buttons and Inputs involved with creating new list items)
const listButton = document.getElementById('list-button');
const listInput = document.getElementsByClassName('list-input-box')[0];
const listInputVal = document.getElementsByClassName('list-input-value')[0];
const closeListInput = document.getElementsByClassName('close-item')[0];
const addListInput = document.getElementsByClassName('new-item')[0];

//Display input to add new project folder. (Left Div)
function addProject (){
    addButton.classList.add('add-after');
    inputDiv.classList.remove('input-box');
    inputDiv.classList.add('input-after');
} 

//Close input to add new project folder. (Left Div)
function closeProjectInput(){
    inputDiv.classList.remove('input-after');
    inputDiv.classList.add('input-box');
    addButton.classList.remove('add-after');
    inputVal.value = "";
  }

//Create new project folder. (Left Div)
function createProject(){
  for (let i = 0; i < arrayCheck.length; i++){
    if (inputVal.value == arrayCheck[i]){
      return alert ("Can't have same folder twice!");
    }
  } if (inputVal.value === ""){
      alert("Enter project name");
    
  } else {
    let folderDiv = document.createElement('div');
    folderDiv.classList.add('folder-div');
    
    let newFolder = document.createElement('button');
    newFolder.classList.add('proj-elem');
    newFolder.textContent = inputVal.value;
    newFolder.addEventListener("click",displayList);
    arrayCheck.push(newFolder.textContent);

    let deleteProj = document.createElement('button');
    deleteProj.textContent = "-";
    deleteProj.classList.add('delete-proj');
    deleteProj.addEventListener("click",removeProject)

    folderDiv.appendChild(newFolder);
    folderDiv.appendChild(deleteProj);
    projectList.appendChild(folderDiv);
    projFolder(folderDiv);
    inputVal.value = "";
    inputDiv.classList.remove('input-after');
    inputDiv.classList.add('input-box');
    addButton.classList.remove('add-after');
    }
 }

// Display input to add new list item. (Right Div)
function addListItem (){
  listButton.classList.add('add-after');
  listInput.classList.remove('list-input-box');
  listInput.classList.add('list-input-after');
}

//Close input to add new list item. (Right Div)
function closeInput(){
  listInput.classList.remove('list-input-after');
  listInput.classList.add('list-input-box');
  listButton.classList.remove('add-after');
  listInputVal.value = "";
}

//Create new list item. 

function inputListeners(){
  listButton.addEventListener("click",addListItem);
  closeListInput.addEventListener("click",closeInput);
  closeProject.addEventListener("click", closeProjectInput);
  newProject.addEventListener("click",createProject);
  addButton.addEventListener("click",addProject)
}

export {
  addProject,
  closeProjectInput,
  createProject,
  addListItem,
  closeInput,
  inputListeners,
  arrayCheck,
  projectList
};