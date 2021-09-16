import {projectArray, allFolder,removeAdd} from './inputs.js';

//Project Title Div
const doList = document.getElementsByClassName("to-do-list")[0];
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
};

//Appends correct list to page
function displayList(){
  doList.innerHTML = "";
  let folderButtons = document.querySelectorAll('.project-button')
  for (let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      listHeader.textContent = folderButtons[i].textContent;
    }
  }
    headDiv.appendChild(listHeader);
    removeAdd();
    getList();
    return headDiv;
};

//Gets correct div to append to page. 
function getList(){ 
  let folderButtons = document.querySelectorAll('.project-button');
  let array = [];
  for(let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      let list = folderButtons[i].textContent;
      if(list == "All Items"){getAll();
      } else {
      for (let i = 0; i < projectArray.length; i++){
        if (list == projectArray[i].name){
          array.push(projectArray[i].list);
          for (let i = 0; i < array[0].length; i++){
            let listItem = document.createElement('div');
            listItem.classList.add('list-item-div');
            let removeItem = document.createElement('button');
            removeItem.textContent = "x";
            removeItem.classList.add('remove-item');
            let listButton = document.createElement('div');
            listButton.classList.add('list-button');
            listButton.textContent = array[0][i];

            removeItem.addEventListener("click",deleteItem);
            listItem.appendChild(removeItem);
            listItem.appendChild(listButton);
            doList.appendChild(listItem);
          }
          return doList; 
          }
        }
      } 
    }
  }
};

//All items list displays items from all project folders

function getAll(){
    for (let i = 0; i < allFolder.list.length; i++){
    let listItem = document.createElement('div');
    listItem.classList.add('list-item-div');
    let listButton = document.createElement('div');
    listButton.textContent = allFolder.list[i];
    listItem.appendChild(listButton);
    doList.appendChild(listItem);
  }
  return doList;
}

//Deletes a list item from project folder list. 
function deleteItem(e){
  let folderButtons = document.querySelectorAll('.project-button');
  let itemValue = e.target.nextSibling.textContent; 
  
  for(let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
    let list = folderButtons[i].textContent;
      for (let i = 0; i < projectArray.length;i++){
        if (list == projectArray[i].name){
        for (let j = 0; j < projectArray[i].list.length; j++){
          if (itemValue == projectArray[i].list[j]){
            let index = projectArray[i].list.indexOf(projectArray[i].list[j]);
            projectArray[i].list.splice(index,1);
            deleteFromAll(itemValue,list);
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          }
        }
      }
    }
  }
}
}

//deleting one item at a time from project folders also removes it from All Items folder. 
function deleteFromAll(item, project){
  for (let i = 0; i < allFolder.list.length; i++){
      if (`${item}`+ " " + `(${project})` == allFolder.list[i]){
      let listItem  = `${item}`+ " " + `(${project})` 
      let index = allFolder.list.indexOf(listItem);
      allFolder.list.splice(index,1);
      console.log(allFolder.list);
    }
  }
}

//Creates project list to store projects and corresponding lists.   
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
  headDiv,
  doList,
  ProjectList
};