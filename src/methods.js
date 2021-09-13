import {projectArray} from './inputs.js';

//Project Title Div
const doList = document.getElementsByClassName("to-do-list")[0];
const toDoList = document.getElementsByClassName('list-div')[0];
const headDiv = document.getElementsByClassName('to-do-head')[0];
let listHeader  = document.createElement('h2');

toDoList.appendChild(doList);

//Chooses Active Folder

function stayActive(e){
  let btnName = e.target.textContent;
  if (e.target.classList.contains('inactive')){
    e.target.classList.remove('inactive');
    e.target.classList.add('active');
    changeActive(btnName);
  } else {
    e.target.classList.remove('active');
    e.target.classList.add('inactive');
  }
};
//Removes selected folder when new folder selected

function changeActive(button){
  let folderButtons = document.querySelectorAll('.project-button');
  for(let i = 0; i < folderButtons.length; i++){
    if (!(button == folderButtons[i].innerHTML)){
      folderButtons[i].classList.remove('active');
      folderButtons[i].classList.add('inactive');
    }
  }
}

function displayList(e){
  doList.innerHTML = "";
  listHeader.textContent = e.target.textContent;
  headDiv.appendChild(listHeader);
  getList();
  return headDiv;
}

function getList(){ 
  let array = [];
  let folderButtons = document.querySelectorAll('.project-button');
  for(let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      let list = folderButtons[i].textContent;
      for (let i = 0; i < projectArray.length; i++){
        if (list == projectArray[i].name){
         array.push(projectArray[i].list);
          for (let i = 0; i < array[0].length; i++){
            let listItem = document.createElement('div');
            listItem.classList.add('list-item-button');
            listItem.textContent = array[0][i];
            doList.appendChild(listItem);
          }
          return doList; 
        }
        
      } 
      
    }
   
  }
}


class ProjectList{
  constructor(name){
    this.name = name;
    this.list = [];
  }
  push(item){
    this.list.push(item);
    return; 
  }
}

export{
  stayActive,
  changeActive,
  displayList,
  ProjectList
};