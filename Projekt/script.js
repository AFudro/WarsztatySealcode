function getTasks(_callback) {
	task=[];
	var i=0
	qwest.get(url, {}, {cache: true}).then(
		function(xhr, response) {
			response.forEach(function(element) { 
				task[i]={
					title:element.body.title,
					id:element.id,
					is_done: element.body.is_done
				};
				i++;
			}
		);
		_callback();
	});
}

function refresh(){
	getTasks(function() {
		console.log(task);
		var myNode = document.getElementById("tasklist");
		while (myNode.firstChild){
			myNode.removeChild(myNode.firstChild);
		}
		
		var i=0;
		while(i<task.length) {
			var newElement = document.createElement('li');
			var newText = document.createTextNode(" "+task[i].title);
			var newButton = document.createElement('input');
			var newCheckBox = document.createElement('input');
			newButton.setAttribute("type","submit");
			newButton.setAttribute("value","usuń");
			newCheckBox.setAttribute("type","checkbox");
			newCheckBox.setAttribute("value","yes");
			if(task[i].is_done==true){
				newCheckBox.setAttribute("checked","");
			}
				
			newElement.appendChild(newButton);
			newElement.appendChild(newCheckBox);
			newElement.appendChild(newText);
			taskList.appendChild(newElement);
			i++;
		}
		i=0;
		var taskl = document.querySelectorAll('#tasklist li');
		while(i<task.length) {
			taskl[i].firstChild.Id = i;
			taskl[i].firstChild.addEventListener("click", remove);
			taskl[i].firstChild.nextElementSibling.Id = i;
			taskl[i].firstChild.nextElementSibling.addEventListener("click", changeState);
			i++;
		}
	});
}

function addTask(){
	 console.log(task);
	 if(textBox.value!=0){
			 console.log(textBox.value);
			qwest.post(url, {title: textBox.value, is_done: false}, {cache: true}); 
	 }
	 textBox.value="";
	refresh();
}

function changeState(evt){
	var i=evt.target.Id;

	var cTask= new Object();
	cTask.id=task[i].id
	cTask.body={
		title: task[i].title,
		is_done: !task[i].is_done 
	};
	console.log(cTask);
	qwest.map('PATCH', url+'/'+cTask.id, cTask.body, {cache: true}).then(function(xhr, response) { 
		refresh(); 
	});
}

function remove(evt){
	var i=evt.target.Id;
	console.log(i);
	 qwest.delete(url+'/'+task[i].id, null, {cache: true}).then(function(xhr, response) { 
		 refresh(); 
	 });
}


var task = [];
var url="http://sealcode.org:8082/api/v1/resources/task";
var textBox = document.getElementById("task");
var addButton = document.getElementById("add");
var date = document.getElementById("date");
var taskList = document.getElementById("tasklist");
var d = new Date();
addButton.addEventListener("click", addTask);
textBox.addEventListener('keypress', function (e) {if (e.keyCode == 13) addTask()});
date.innerHTML=('0'+(d.getDate())).slice(-2)+"-"+('0'+(d.getMonth()+1)).slice(-2)+"-"+d.getFullYear();
refresh();