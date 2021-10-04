import {
  projectArray, 
  allFolder,
  todayFolder,
  weekFolder,
  todayMaker,
  removeToday,
  removeFromWeek,
  removeAdd,
  closeItemInput,
} from './inputs.js';

window.onload = function(){
  listHeader.textContent = "All Items";
  headDiv.appendChild(listHeader);
  removeAdd();
}
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
   } else if (e.target.classList.contains('active')){
     return;
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
      closeItemInput();
    }
  }
};
//Appends correct list to page
function displayList(){
  doList.innerHTML = "";
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      listHeader.textContent = folderButtons[i].textContent;
      getList();
    }
  }
    headDiv.appendChild(listHeader);
    removeAdd();
    return headDiv;
};
//Gets correct list to append to page. 
function getList(){ 
  let folderButtons = document.querySelectorAll('.project-button');
  for(let i = 0; i < folderButtons.length; i++){
  if (folderButtons[i].classList.contains('active')){
    let list = folderButtons[i].textContent;
    if(list == "All Items"){getAll();
    }else if(list == "Today"){getToday();
    } else if(list == "This week"){getWeek();
    }
    else {
    for (let i = 0; i < projectArray.length; i++){
    if (list == projectArray[i].name){
        for (let j = 0; j < projectArray[i].list.length; j++){
          //list items
        let listItem = document.createElement('div');
        listItem.classList.add('list-item-div');
        let removeItem = document.createElement('button');
        removeItem.textContent = "x";
        removeItem.classList.add('remove-item');
        let listButton = document.createElement('div');
        listButton.classList.add('list-button');
        listButton.textContent = projectArray[i].list[j];
        removeItem.addEventListener("click",deleteItem);
        removeItem.addEventListener("click",deleteFromAll);
          //dates for list items
        let dateInputDiv = document.createElement('div');
        let date = document.createElement('input');
        date.setAttribute('type','date');
        date.addEventListener("input",showDate);
        date.addEventListener("input",removeToday);
        date.addEventListener("input",removeFromWeek);
        date.addEventListener("input",todayMaker);
        
        let dateDisplay = document.createElement('div');
        dateDisplay.classList.add('date-display');
          let thisDate = projectArray[i].dates[j];
           if(thisDate == undefined){
            dateDisplay.textContent = `(No Date)`;
            }else{
            dateDisplay.textContent = ` (${projectArray[i].dates[j]})`;
            }
        listItem.appendChild(removeItem);
        listItem.appendChild(listButton);
        listItem.appendChild(dateDisplay);
        dateInputDiv.appendChild(date);
        doList.appendChild(listItem);
        doList.appendChild(dateInputDiv);
        }
        return doList; 
        }
      }
    } 
  }
}
};
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
function getToday(){
  for (let i = 0; i < todayFolder.list.length; i++){
    let listItem = document.createElement('div');
    listItem.classList.add('list-item-div');
    let listButton = document.createElement('div');
    listButton.textContent = todayFolder.list[i];
    listItem.appendChild(listButton);
    doList.appendChild(listItem);
  }
  return doList;
}
function getWeek(){
  for (let i = 0; i < weekFolder.list.length; i++){
    let listItem = document.createElement('div');
    listItem.classList.add('list-item-div');
    let listButton = document.createElement('div');
    listButton.textContent = weekFolder.list[i];
    listItem.appendChild(listButton);
    doList.appendChild(listItem);
  }
  return doList
}

function showDate(e){
  let listThing = e.target.parentNode.previousElementSibling.firstChild.nextSibling.textContent; 
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length; i++){
    if (folderButtons[i].classList.contains('active')){
      let currentProject = folderButtons[i].textContent;
        for (let i = 0; i < projectArray.length; i++){
        if (currentProject == projectArray[i].name){
          for (let j = 0; j < projectArray[i].list.length; j++){
            if (listThing === projectArray[i].list[j]){
              let indexed = projectArray[i].list.indexOf(listThing);
              let newDate = e.target.value;
              projectArray[i].add(indexed,newDate);
              displayList();
            }
          }
        }
      }
    }
  }
};

// Removes header and list when project deleted whose header and list is on page.
function removeHeader(e){
  let folderButtons = document.querySelectorAll('.project-button');
  for(let i = 0; i < folderButtons.length;i++){
    if (folderButtons[i].classList.contains('active')&& folderButtons[i].textContent == e.target.parentNode.firstChild.textContent){
      headDiv.textContent = "";
      doList.textContent = "";
      removeAdd();
    }
  } 
  
}
//Deletes an indivdual list item from project folder list. 
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
        projectArray[i].dates.splice(index,1);
        deleteFromAll(itemValue,list);
        deleteFromToday(itemValue,list);
        deleteFromWeek(itemValue,list);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode.nextSibling);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
      }
    }
  }
  }
}
}
function deleteFromAll(item, project){
  for (let i = 0; i < allFolder.list.length; i++){
  if (`${item}`+ " " + `(${project})` == allFolder.list[i]){
    let listItem  = `${item}`+ " " + `(${project})` 
    let index = allFolder.list.indexOf(listItem);
    allFolder.list.splice(index,1);
    return allFolder.list;
    }
  }
}
function deleteAllFromAll(e){
  let array = [];
  let tested;
  let list = e.target.parentNode.firstChild.textContent;
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length; i++){
  if (list == folderButtons[i].textContent){
      for (let i = 0; i < allFolder.list.length;i++){
      if (!(allFolder.list[i].endsWith(`(${list})`))){
          tested = allFolder.list[i]; 
          array.push(tested);
        }
      }
      allFolder.list = array;
    }
  }
}
function deleteFromToday(item,project){
  for (let i = 0; i < todayFolder.list.length; i++){
    if (`${item}`+ " " + `(${project})` == todayFolder.list[i]){
      let listItem  = `${item}`+ " " + `(${project})` 
      let index = todayFolder.list.indexOf(listItem);
      todayFolder.list.splice(index,1);
      return todayFolder.list;
      }
    }
}
function deleteFromWeek(item,project){
  for (let i = 0; i < weekFolder.list.length; i++){
    if (`${item}`+ " " + `(${project})` == weekFolder.list[i]){
      let listItem  = `${item}`+ " " + `(${project})` 
      let index = weekFolder.list.indexOf(listItem);
      weekFolder.list.splice(index,1);
      return weekFolder.list;
      }
  }
}
function deleteAllFromToday(e){
  let array = [];
  let tested;
  let list = e.target.parentNode.firstChild.textContent;
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length;i++){
    if (list == folderButtons[i].textContent){
      for(let i = 0; i < todayFolder.list.length; i++){
        if (!(todayFolder.list[i].endsWith(`(${list})`))){
          tested = todayFolder.list[i]; 
          array.push(tested);
        }
      }
      todayFolder.list = array;
    }
  }
}
function deleteAllFromWeek(e){
  let array = [];
  let tested;
  let list = e.target.parentNode.firstChild.textContent;
  let folderButtons = document.querySelectorAll('.project-button');
  for (let i = 0; i < folderButtons.length;i++){
    if (list == folderButtons[i].textContent){
      for(let i = 0; i < weekFolder.list.length; i++){
        if (!(weekFolder.list[i].endsWith(`(${list})`))){
          tested = weekFolder.list[i]; 
          array.push(tested);
        }
      }
      weekFolder.list = array;
    }
  }
}
//Creates project list to store projects and corresponding lists.   
class ProjectList{
  constructor(name){
    this.name = name;
    this.list = [];
    this.dates = [];
  }
  push(item){
    this.list.push(item);
    return; 
  }
  add(index,date){
    this.dates[index] = date;
    return
  }
}
export{
  stayActive,
  changeActive,
  displayList,
  removeHeader,
  deleteAllFromAll,
  deleteAllFromToday,
  deleteAllFromWeek,
  getAll,
  getList,
  headDiv,
  doList,
  ProjectList
};