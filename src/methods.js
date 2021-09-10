import {projectArray} from './inputs.js';

//Project Title Div
const toDoList = document.getElementsByClassName('list-div')[0];
const headDiv = document.getElementsByClassName('to-do-head')[0];
let listHeader  = document.createElement('h2');

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
  listHeader.textContent = e.target.textContent;
  headDiv.appendChild(listHeader);
  let projectName = listHeader.textContent;
  //for (let i = 0; i < projectArray.length; i++){
  //  if (projectName == projectArray[i].name){
  //    let test = document.createElement("li");
  //    test.textContent = projectArray[i].list.innerHTML;
  //    toDoList.appendChild(test);
  //  }
  //}
  return headDiv; 
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

//function render (){
//  doList = "";
//  for (let i = 0; i < folderButtons.length; i++){
//    if (folderButtons[i].classList.contains('active')){
//      doList.appendChild(folderButtons[i].firstChild);
//    }
//  }
//}



export{
  stayActive,
  changeActive,
  displayList,
  ProjectList
};