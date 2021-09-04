//const projectSection = document.getElementById("view-section");
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todos');
const inputDiv = document.getElementsByClassName('input-box')[0];

function test (){

  addButton.onclick = function (){
    let test= document.createElement("li");
    test.textContent = "hey";
    todoList.appendChild(test);
    addButton.classList.add('add-after');
    inputDiv.classList.remove('input-box');
    inputDiv.classList.add('input-after');
  }

    console.log("moved buttons back to html");
  }

export default test;