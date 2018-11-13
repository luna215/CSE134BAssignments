var customDialog = (function() {
  var favDialog = document.getElementById('favDialog');
  var label = document.getElementById('label');
  var menu = document.getElementById('menu');
  var outputBox = document.getElementById('output');

  customAlert = function (text) {
    outputBox.innerHTML = '';
    label.innerHTML = text;
    this.menu.innerHTML = `<button>Ok</button>`
    favDialog.showModal();
  }

  customConfirm = function (text) {
    outputBox.innerHTML = '';
    label.innerHTML = text;
    menu.innerHTML = `<button onClick="confirm()">confirm</button> <button onClick="confirmCancel()">Cancel</button>`
    favDialog.showModal();
  }

  customPrompt = function (text) {
    outputBox.innerHTML = '';
    label.innerHTML =  `What is your name?<input id="userText" type="text">`;
    menu.innerHTML = `<button onClick="promptConfirm()">Ok</button> <button onClick="promptCancel()">Cancel</button>`;
    favDialog.showModal();
  }

  confirm = function() {
    outputBox.innerHTML = `<output id="true">Confirm result: true</output>`;
  }

  confirmCancel = function() {
    outputBox.innerHTML = `<output id="false">Confirm result: false</output>`;
  }

  promptConfirm = function() {
    userText = document.getElementById('userText').value;
    if(userText === '') {
      outputBox.innerHTML = `<output>Prompt result: User did not input anything.</output>`;
    } else {
      outputBox.innerHTML = DOMPurify.sanitize(`<output>Prompt result: ${userText}</output>`);
    }
  }

  promptCancel = function() {
    outputBox.innerHTML = `<output>Prompt result: User did not input anything.</output>`;
  }

}());