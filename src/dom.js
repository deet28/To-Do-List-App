import {
  buttonListeners,
} from './button.js'

import {
  inputListeners,
} from './inputs.js'


function createPage (){
  buttonListeners();
  inputListeners();
}
export { 
    createPage,
}


