import {
  removeProject,
  projFolder,
  arrayCheck,
} from './button.js';

import {
  stayActive,
  displayList,
  ProjectList
} from './methods.js';

//Tracking Projects
const projectsFolder = document.getElementsByClassName('project-list')[0];

//Left Div Input. (Buttons and Inputs involved with creating new project folder)
const addButton = document.getElementById('add-button');
const inputVal = document.getElementsByClassName('input-value')[0];
const inputDiv = document.getElementsByClassName('input-box')[0];
const newProject = document.getElementsByClassName('new-project')[0];
const closeProject = document.getElementsByClassName('close-project')[0];

//Right Div Input. (Buttons and Inputs involved with creating new list items)
const listButton = document.getElementById('list-button');
const listInput = document.getElementsByClassName('list-input-box')[0];
const listInputVal = document.getElementsByClassName('list-input-value')[0];
const addListInput = document.getElementsByClassName('new-item')[0];
const closeListInput = document.getElementsByClassName('close-item')[0];

//Display input to add new project folder. (Left Div)
function addProjectInput (){
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


let projectArray = [];

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
    newFolder.classList.add('project-button');
    newFolder.classList.add('inactive');
    newFolder.textContent = inputVal.value;
    let itemList = new ProjectList(newFolder.textContent);
    projectArray.push(itemList);
    
    newFolder.addEventListener("click",stayActive);
    newFolder.addEventListener("click",displayList);
    arrayCheck.push(newFolder.textContent);

    let deleteProj = document.createElement('button');
    deleteProj.textContent = "-";
    deleteProj.classList.add('delete-proj');
    deleteProj.addEventListener("click",removeProject)

    folderDiv.appendChild(newFolder);
    folderDiv.appendChild(deleteProj);
    projectsFolder.appendChild(folderDiv);
    projFolder(folderDiv);
    inputVal.value = "";
    inputDiv.classList.remove('input-after');
    inputDiv.classList.add('input-box');
    addButton.classList.remove('add-after');
    }

 }
// Display input to add new list item. (Right Div)
function addItemInput (){
  listButton.classList.add('add-after');
  listInput.classList.remove('list-input-box');
  listInput.classList.add('list-input-after');
}

//Close input to add new list item. (Right Div)
function closeItemInput(){
  listInput.classList.remove('list-input-after');
  listInput.classList.add('list-input-box');
  listButton.classList.remove('add-after');
  listInputVal.value = "";
}

//Create new list item. 

function createListItem(){
  let folderButtons = document.querySelectorAll('.project-button');
  if (listInputVal.value === ""){
    alert("enter thing to do!")
  } else {
    let listItem = listInputVal.value
    for (let i = 0; i < folderButtons.length; i++){
      if (folderButtons[i].classList.contains("active")){
        let list = folderButtons[i].textContent;
         for(let i = 0; i < projectArray.length; i++){
           if (list == projectArray[i].name){
              projectArray[i].push(listItem);
              console.log(projectArray[i]);
              listInput.classList.remove('list-input-after');
              listInput.classList.add('list-input-box');
              listButton.classList.remove('add-after');
              listInputVal.value = "";
            }
          }
        }
      }
    }
  }



function inputListeners(){
  addButton.addEventListener("click",addProjectInput);
  closeProject.addEventListener("click", closeProjectInput);
  newProject.addEventListener("click",createProject);

  listButton.addEventListener("click",addItemInput);
  closeListInput.addEventListener("click",closeItemInput);
  addListInput.addEventListener("click",createListItem);
}

export {
  inputListeners,
  projectArray
};