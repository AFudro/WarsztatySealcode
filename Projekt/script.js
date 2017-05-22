
function addTask(){
	if(textBox.value!=0){
		var newElement = document.createElement('li');
		var newText = document.createTextNode(" "+textBox.value);
		var newButton = document.createElement('input');
		var newCheckBox = document.createElement('input');
		newButton.setAttribute("type","submit");
		newButton.setAttribute("value","usuń");
		newCheckBox.setAttribute("type","checkbox");
		newCheckBox.setAttribute("value","yes");
		newElement.appendChild(newButton);
		newElement.appendChild(newCheckBox);
		newElement.appendChild(newText);
		taskList.appendChild(newElement);
	}
	refresh();
}

function remove(evt){
	var i=evt.target.Id;
	task[i].parentNode.removeChild(task[i]);
}

function refresh(){
	task = document.querySelectorAll('#tasklist li')
	var i=0;
	while(i<task.length) {
		task[i].firstChild.Id = i;
		task[i].firstChild.addEventListener("click", remove);
		i++;
	}
}

var textBox = document.getElementById("task");
var addButton = document.getElementById("add");
var date = document.getElementById("date");
var taskList = document.getElementById("tasklist");
var d = new Date();

addButton.addEventListener("click", addTask);
textBox.addEventListener('keypress', function (e) {if (e.keyCode == 13) addTask()});
date.innerHTML=('0'+(d.getDate())).slice(-2)+"-"+('0'+(d.getMonth()+1)).slice(-2)+"-"+d.getFullYear();
refresh();













