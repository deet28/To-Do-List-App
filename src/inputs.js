import {
  removeProject,
  projFolder,
  arrayCheck,
} from './button.js';

import {
  stayActive,
  displayList,
  ProjectList,
  headDiv,
} from './methods.js';

//Tracking Projects
const projectsFolder = document.getElementsByClassName('project-list')[0];
let projectArray = [];

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

//All, Today, This Week, project folders. 

const allFolder = new ProjectList("All Items");
const todayFolder = new ProjectList("Today");
const weekFolder = new ProjectList("This week");

projectArray.push(allFolder);
projectArray.push(todayFolder);
projectArray.push(weekFolder);

//Display input to add new project folder. (Left Div)
function addProjectInput (){
  addButton.classList.add('add-after');
  inputDiv.classList.remove('input-box');
  inputDiv.classList.add('input-after');
  if (listInput.classList.contains('list-input-after')){
    listInput.classList.remove('list-input-after');
    listInput.classList.add('list-input-box');
    listButton.classList.remove('add-after');
    listInputVal.value = ""
  }
} 

//Close input to add new project folder. (Left Div)
function closeProjectInput(){
  inputDiv.classList.remove('input-after');
  inputDiv.classList.add('input-box');
  addButton.classList.remove('add-after');
  inputVal.value = "";
}

  // Display input to add new list item. (Right Div)
function addItemInput (){
  listButton.classList.add('add-after');
  listInput.classList.remove('list-input-box');
  listInput.classList.add('list-input-after');
  if (inputDiv.classList.contains('input-after')){
    inputDiv.classList.remove('input-after');
    inputDiv.classList.add('input-box');
    addButton.classList.remove('add-after');
    inputVal.value = "";
  }
}


//Close input to add new list item. (Right Div)
function closeItemInput(){
  listInput.classList.remove('list-input-after');
  listInput.classList.add('list-input-box');
  listButton.classList.remove('add-after');
  listInputVal.value = "";
}

//Create new project folder. (Left Div)
function createProject(){
  for (let i = 0; i < arrayCheck.length; i++){
  if (inputVal.value == arrayCheck[i]){
    closeProjectInput();
    return alert ("Project already listed");
    }
  } 
  if (inputVal.value === ""){
   return alert("Enter project name");
  }else{
    let folderDiv = document.createElement('div');
    folderDiv.classList.add('folder-div');
    
    let newFolder = document.createElement('button');
    newFolder.classList.add('proj-elem');
    newFolder.classList.add('project-button');
    newFolder.classList.add('inactive');
    newFolder.textContent = inputVal.value;
    let itemList = new ProjectList(newFolder.textContent);
    projectArray.push(itemList);
    console.log(projectArray);
    
    newFolder.addEventListener("click",stayActive);
    newFolder.addEventListener("click",displayList);
    arrayCheck.push(newFolder.textContent);

    let deleteProj = document.createElement('button');
    deleteProj.textContent = "-";
    deleteProj.classList.add('delete-proj');
    deleteProj.addEventListener("click",removeProject);
    

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

//Create new list item. 
function createListItem(){
  let folderButtons = document.querySelectorAll('.project-button');
  if (listInputVal.value === ""){
    alert("enter thing to do!");
  } else if (noDoubles(listInputVal.value)){
    closeItemInput();
    return alert ('You already have this to-do listed.');
  }
  else{
  let listItem = listInputVal.value
  for (let i = 0; i < folderButtons.length; i++){
  if (folderButtons[i].classList.contains("active")){
  let list = folderButtons[i].textContent;
    for(let i = 0; i < projectArray.length; i++){
    if (list == projectArray[i].name){
      projectArray[i].push(listItem);
      allFolder.list.push(`${listItem}`+ " " + `(${projectArray[i].name})`);
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

function noDoubles(item){
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      let list = folderButtons[i].textContent;
      for (let i = 0; i < projectArray.length; i++){
        if (list == projectArray[i].name){
          for (let j = 0; j < projectArray[i].list.length; j++){
            if (item == projectArray[i].list[j]){
             return true;
            }
          }
        }
      }
    }
  }
}

//Pushes all list items to today folder. 
function todayMaker(e){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today =`${yyyy}-${mm}-${dd}`;

  for (let i = 0; i < projectArray.length; i++){
    for (let j = 0; j < projectArray[i].dates.length; j++){
      if (projectArray[i].dates[j] == today){
        let test = `${projectArray[i].list[j]}` + " " + `(${projectArray[i].name})`;
        for (let i = 0; i <= todayFolder.list.length; i++){
          if (todayFolder.list.includes(test) == false){
            todayFolder.list.push(test);
            }
          }
        }
      }
    }
  }
//Removes edited date items from today folder. 
function removeToday(e){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  today =`${yyyy}-${mm}-${dd}`;

  for (let i = 0; i < projectArray.length; i++){
    for (let j = 0; j < projectArray[i].list.length; j++){
      if (!(projectArray[i].dates[j] == today)){
        let test = `${projectArray[i].list[j]}` + " " + `(${projectArray[i].name})`;
        for (let i = 0; i <= todayFolder.list.length; i++){
          if (todayFolder.list.includes(test) == true){
            let index = todayFolder.list.indexOf(test);
            todayFolder.list.splice(index,1);
          }
        }
      }
    }
  }
}
//Does not allow to add item to general items folder. 
function removeAdd(){
  if (headDiv.textContent == "All Items"||headDiv.textContent == "Today"){
    listButton.classList.add('add-after')
    }else{
    listButton.classList.remove('add-after');
  }
}

function inputListeners(){
  addButton.addEventListener("click",addProjectInput);
  closeProject.addEventListener("click", closeProjectInput);
  newProject.addEventListener("click",createProject);

  listButton.addEventListener("click",addItemInput);
  closeListInput.addEventListener("click",closeItemInput);
  addListInput.addEventListener("click",createListItem);
  addListInput.addEventListener("click",displayList);
}

export {
  inputListeners,
  removeAdd,
  todayMaker,
  removeToday,
  projectArray,
  allFolder,
  todayFolder,
  listButton
};