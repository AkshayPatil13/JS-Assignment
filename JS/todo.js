
function closeUserSession(){
    sessionStorage.removeItem('activeUserId');
    window.location = "../html/login.html";
}

function addNewToDoItem(){
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    let title = document.getElementById('toDoTitle').value;
    let sDate = document.getElementById('startDate').value;
    let dDate = document.getElementById('dueDate').value;
    let isToDoPublic = document.getElementById('isToDoPublic').value;
    let categoryType = document.querySelector('input[name="categories"]:checked').value;
    let todoDescription = document.getElementById('description').value;

    let tempstartDate = new Date(sDate);
    let tempdueDate = new Date(dDate);

    if(title == "")
	{
		alert("Please enter Title for ToDo Item..!!")
		return;
	}

	if(sDate == "")
	{
		alert("Please set the start date..!!");
		return;
	}

	if(dDate == "")
	{
		alert("Please set the due date..!!");
		return;
	}

	if(tempdueDate.getTime() < tempstartDate.getTime())
	{
		alert("Due date should come after the start date..!!");
		return;
	}

	if(todoDescription == "")
	{
		alert("Please enter the description for ToDo Item..!!");
		return;
	}
	
    isToDoPublic =  isToDoPublic === true ? "Yes" : "No";

    let ToDoItem = {
        'title' : title,
        'startDate' : sDate,
        'dueDate' : dDate,
        'isPublic' : isToDoPublic,
        'catogory' : categoryType,
        'description' : todoDescription,
        'status' : 'pending',
		'id' : new Date().getTime()
    }

    tempArray[currentUser].userToDo.push(ToDoItem);

    localStorage.setItem('registeredUserRecord',JSON.stringify(tempArray));

    if(tempToDoArray.length > 0){
        document.getElementById('todoTable').style.display = "inline-table";
        document.getElementById('noDataFound').style.display = "none";
    }

    clearToDoTable();
	printToDoTable(tempArray[currentUser].userToDo);
	document.getElementById("add_todo").reset();
}

function clearToDoTable(){

    let todoContent = document.getElementById('todoBody');
    let deleteTodoRow = todoContent.lastElementChild;

    while(deleteTodoRow){
        todoContent.removeChild(deleteTodoRow);
        deleteTodoRow = todoContent.lastElementChild;
    }
}

function printToDoTable(arr){
    for(let i=0;i<arr.length;i++){
        let newToDoItem = document.createElement("tr");
        newToDoItem.setAttribute("id","row-" + arr[i].id);
        newToDoItem.innerHTML = "<td>" + "<input name='selectedItem' type='checkbox' value='yes' id='checkbox-" + arr[i].id + "' </td>" + 
                            "<td>" + arr[i].title + "</td>" + 
                            "<td>" + arr[i].startDate + "</td>" + 
                            "<td>" + arr[i].dueDate + "</td>" + 
                            "<td>" + arr[i].isPublic + "</td>" + 
                            "<td>" + arr[i].catogory + "</td>" + 
                            "<td>" + arr[i].description + "</td>" + 
                            // "<td>" + "<button class='read-todo' id='view-" + arr[i].id + "' onclick='readDesc(" + i + ")'>View</button" + "</td>" +
                            "<td>" + arr[i].status + "</td>" 
    
    document.getElementById("todoBody").appendChild(newToDoItem);
    }
    
}

function showCurrentUserToDo(){

    if((localStorage.getItem('registeredUserRecord') === null) || (sessionStorage.getItem('activeUserId') === null)){
        window.location = "../html/login.html";
        return;
    }

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    printToDoTable(tempToDoArray);

}

function editToDoItem(){

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;
    let selectedItemArray = document.getElementsByName('selectedItem');

    let flag = 0;
    let index = 0;
    let editItem = 0;

    for(index = (tempArray[currentUser].userToDo.length-1);index>=0;index--){

        if(selectedItemArray[index].checked === true){
            flag++;
            editItem = index;
        }
    }

    if(flag == 1){
        if(selectedItemArray[editItem].checked === true){
            document.getElementById('toDoTitle').value = tempArray[currentUser].userToDo[editItem].title;
            document.getElementById('startDate').value = tempArray[currentUser].userToDo[editItem].startDate;
            document.getElementById('dueDate').value = tempArray[currentUser].userToDo[editItem].dueDate;

            if((tempArray[currentUser].userToDo[editItem].isPublic) == "No"){
                document.getElementById("isToDoPublic").checked = false;	
            }
            else{
                document.getElementById("isToDoPublic").checked = true;	
            }

            if((tempArray[currentUser].userToDo[editItem].catogory) == "Home"){
                document.getElementsByName("categories")[0].checked = true;
            }

            else if((tempArray[currentUser].userToDo[editItem].catogory) == "Personal"){
                document.getElementsByName("categories")[1].checked = true;
            }

            else{
                document.getElementsByName("categories")[2].checked = true;
            }

            document.getElementById('description').value = tempArray[currentUser].userToDo[editItem].description;
            document.getElementById('add').style.display = "none";
            document.getElementById("delete").disabled = true;
            document.getElementById('save').style.display = "inline-block";
            sessionStorage.setItem('EditedItemIndex',editItem);

        }
    }

    else if(flag == 0){
        alert('Please select a Todo Item to edit..!!');
    }
    else{
        alert("Only one Todo item can be edited at once..!!");
    }
}

function saveChanges(){

    let index = sessionStorage.getItem('EditedItemIndex');
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');

    tempArray[currentUser].userToDo[index].title =  document.getElementById('toDoTitle').value;
    tempArray[currentUser].userToDo[index].startDate = document.getElementById('startDate').value;
    tempArray[currentUser].userToDo[index].dueDate = document.getElementById('dueDate').value;

    if(document.getElementById("isToDoPublic").checked == true)
	{
        tempArray[currentUser].userToDo[index].isPublic = "Yes";
	}
	else
	{
        tempArray[currentUser].userToDo[index].isPublic = "No";
	}

	if(document.getElementsByName("categories")[0].checked == true)
	{
		tempArray[currentUser].userToDo[index].catogory = "Home";
	}
	else if(document.getElementsByName("categories")[1].checked == true)
	{
		tempArray[currentUser].userToDo[index].catogory = "Personal";
	}
	else
	{
		tempArray[currentUser].userToDo[index].catogory = "Office";
    }
    
    tempArray[currentUser].userToDo[index].description = document.getElementById('description').value;
    localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
    sessionStorage.removeItem('EditedItemIndex');
}
