const projectSection = document.getElementById("view-section");
const addButton = document.getElementById('add-button');


function test (){

  addButton.onclick = function (){
    let test= document.createElement("div");
    test.textContent = "Hello";
    projectSection.appendChild(test);
  }
    console.log("moved buttons back to html");
  }

export default test;