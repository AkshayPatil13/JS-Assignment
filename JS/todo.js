function logOutUserSession() {
    sessionStorage.removeItem('activeUserId');
    window.location = "../html/login.html";
}

function disablePreviousDates(elementId) {
    let dateInput = document.getElementById(elementId);
    const cur_date = new Date();
    const cur_month = cur_date.getMonth() > 9 ? cur_date.getMonth() + 1 : '0' + (cur_date.getMonth() + 1);
    const cur_day = cur_date.getDate() > 9 ? cur_date.getDate() : '0' + cur_date.getDate();
    const dateStr = cur_date.getFullYear() + '-' + cur_month + '-' + cur_day;
    dateInput.setAttribute('min', dateStr);
}

function alertUser(elementId,message){
    document.getElementById(elementId).innerHTML = message;
}

function validateToDoData(title,todoStartDate,todoDueDate,tempstartDate,tempdueDate,todoDescription){
    if (title == "") {
        alertUser('inputError', "Please enter Title for ToDo Item..!!");
        return false;
    }
    if (todoStartDate == "") {
        alertUser('inputError', "Please set the start date..!!");
        return false;
    }
    if (todoDueDate == "") {
        alertUser('inputError', "Please set the due date..!!");
        return false;
    }
    if (tempdueDate.getTime() < tempstartDate.getTime()) {
        alertUser('inputError', "Due date should come after the start date..!!");
        return false;
    }
    if (todoDescription == "") {
        alertUser('inputError', "Please enter the description for ToDo Item..!!");
        return false;
    }
    return true;
}

function showCurrentUserToDo() {
    if ((localStorage.getItem('registeredUserRecord') === null) || (sessionStorage.getItem('activeUserId') === null)) {
        window.location = "../html/login.html";
        return;
    }

    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = userRecord[currentUser].userToDo;
    
    if(tempToDoArray.length == 0){
        document.getElementById('todoTable').style.display = "none";
        document.getElementById('noDataFound').style.display = "block";
    }
    else{
        clearToDoTable();
        printToDoTable(tempToDoArray);
    }
}

function addNewToDoItem() {
    let title = document.getElementById('toDoTitle').value;
    let todoStartDate = document.getElementById('startDate').value;
    let todoDueDate = document.getElementById('dueDate').value;
    let isToDoPublic = document.getElementById('isToDoPublic').checked;
    let categoryType = document.querySelector('input[name="categories"]:checked').value;
    let todoDescription = document.getElementById('description').value;
    let tempstartDate = new Date(todoStartDate);
    let tempdueDate = new Date(todoDueDate);
    let allowInsertion = validateToDoData(title,todoStartDate,todoDueDate,tempstartDate,tempdueDate,todoDescription);
    
    if(allowInsertion == true){
        document.getElementById('inputError').innerHTML = "";
        let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
        let currentUser = sessionStorage.getItem('activeUserId');
        let tempToDoArray = userRecord[currentUser].userToDo;
        isToDoPublic = isToDoPublic === true ? "Yes" : "No";

        let ToDoItem = {
            'title': title,
            'startDate': todoStartDate,
            'dueDate': todoDueDate,
            'isPublic': isToDoPublic,
            'catogory': categoryType,
            'description': todoDescription,
            'status': 'pending',
            'id' : new Date().getTime()
        }
    
        userRecord[currentUser].userToDo.push(ToDoItem);
        localStorage.setItem('registeredUserRecord', JSON.stringify(userRecord));

        if (tempToDoArray.length > 0) {
            document.getElementById('todoTable').style.display = "inline-table";
            document.getElementById('noDataFound').style.display = "none";
        }
        clearToDoTable();
        printToDoTable(userRecord[currentUser].userToDo);
        document.getElementById("addToDo").reset();
    } 
}

function clearToDoTable() {
    let todoContent = document.getElementById('todoBody');
    let deleteTodoRow = todoContent.lastElementChild;
    while (deleteTodoRow) {
        todoContent.removeChild(deleteTodoRow);
        deleteTodoRow = todoContent.lastElementChild;
    }
}

function printToDoTable(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newToDoItem = document.createElement("tr");
        newToDoItem.setAttribute("id","row-" + arr[i].id);
        newToDoItem.innerHTML = "<td>" + "<input name='selectedItem' type='checkbox' value='yes' id='checkbox-" + arr[i].id + "' </td>" +
            "<td>" + arr[i].title + "</td>" +
            "<td>" + arr[i].startDate + "</td>" +
            "<td>" + arr[i].dueDate + "</td>" +
            "<td>" + arr[i].isPublic + "</td>" +
            "<td>" + arr[i].catogory + "</td>" +
            "<td>" + arr[i].description + "</td>" +
            "<td>" + arr[i].status + "</td>"

        document.getElementById("todoBody").appendChild(newToDoItem);
    }
}

function editToDoItem() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let selectedItemArray = document.getElementsByName('selectedItem');
    let flag = 0;
    let index = 0;
    let editItem = 0;

    for (index = (userRecord[currentUser].userToDo.length - 1); index >= 0; index--) {
        if (selectedItemArray[index].checked === true) {
            flag++;
            editItem = index;
        }
    }
    if (flag == 1) {
        if (selectedItemArray[editItem].checked === true) {
            document.getElementById('toDoTitle').value = userRecord[currentUser].userToDo[editItem].title;
            document.getElementById('startDate').value = userRecord[currentUser].userToDo[editItem].startDate;
            document.getElementById('dueDate').value = userRecord[currentUser].userToDo[editItem].dueDate;

            if ((userRecord[currentUser].userToDo[editItem].isPublic) == "No") {
                document.getElementById("isToDoPublic").checked = false;
            }
            else {
                document.getElementById("isToDoPublic").checked = true;
            }
            if ((userRecord[currentUser].userToDo[editItem].catogory) == "Home") {
                document.getElementsByName("categories")[0].checked = true;
            }
            else if ((userRecord[currentUser].userToDo[editItem].catogory) == "Personal") {
                document.getElementsByName("categories")[1].checked = true;
            }
            else {
                document.getElementsByName("categories")[2].checked = true;
            }

            document.getElementById('description').value = userRecord[currentUser].userToDo[editItem].description;
            document.getElementById('add').style.display = "none";
            document.getElementById('delete').disabled = true;
            document.getElementById('markAsDone').disabled = true;
            document.getElementById('save').style.display = "inline-block";
            sessionStorage.setItem('EditedItemIndex', editItem);
        }
    }
    else if (flag == 0) {
        alert('Please select a Todo Item to edit..!!');
    }
    else {
        alert("Only one Todo item can be edited at once..!!");
    }
}

function saveChanges() {
    let title = document.getElementById('toDoTitle').value;
    let todoStartDate = document.getElementById('startDate').value;
    let todoDueDate = document.getElementById('dueDate').value;
    let todoDescription = document.getElementById('description').value;
    let tempstartDate = new Date(todoStartDate);
    let tempdueDate = new Date(todoDueDate);
    let allowInsertion = validateToDoData(title,todoStartDate,todoDueDate,tempstartDate,tempdueDate,todoDescription);

    if(allowInsertion == true){
        alertUser('inputError',"");
        let index = sessionStorage.getItem('EditedItemIndex');
        let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
        let currentUser = sessionStorage.getItem('activeUserId');
        userRecord[currentUser].userToDo[index].title = title;
        userRecord[currentUser].userToDo[index].startDate = todoStartDate;
        userRecord[currentUser].userToDo[index].dueDate = todoDueDate;

        if (document.getElementById("isToDoPublic").checked == true) {
            userRecord[currentUser].userToDo[index].isPublic = "Yes";
        }
        else {
            userRecord[currentUser].userToDo[index].isPublic = "No";
        }
        if (document.getElementsByName("categories")[0].checked == true) {
            userRecord[currentUser].userToDo[index].catogory = "Home";
        }
        else if (document.getElementsByName("categories")[1].checked == true) {
            userRecord[currentUser].userToDo[index].catogory = "Personal";
        }
        else {
            userRecord[currentUser].userToDo[index].catogory = "Office";
        }

        userRecord[currentUser].userToDo[index].description = todoDescription;
        localStorage.setItem("registeredUserRecord", JSON.stringify(userRecord));
        sessionStorage.removeItem('EditedItemIndex');
        document.getElementById('addToDo').reset();
        document.getElementById('save').style.display = "none";
        document.getElementById('add').style.display = "inline-block";
        clearToDoTable();
        printToDoTable(userRecord[currentUser].userToDo);
    }
}

function filter(userRecord,tempToDoArray,action,message){
    let selectedItemArray = document.getElementsByName('selectedItem');
    let flag = 0;
    let index = 0;
    let selectedItem = 0;

    for (index = (tempToDoArray.length - 1); index >= 0; index--) {
        if (selectedItemArray[index].checked === true) {
            flag++;
            selectedItem = index;
            action(selectedItem);
        }
    }
    if (flag == 0) {
        alert(message);
    }
    else {
        localStorage.setItem('registeredUserRecord', JSON.stringify(userRecord));
        clearToDoTable();
        printToDoTable(tempToDoArray);
    }
}

function updateToDoItemStatus() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = userRecord[currentUser].userToDo;
    let message = "Please select a Todo Item to update its Status..!!";

    filter(userRecord,tempToDoArray,action,message);

    function action(selectedItem){
        tempToDoArray[selectedItem].status = "Done";
    }
}

function deleteToDoItem() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = userRecord[currentUser].userToDo;
    let message = "Please select a Todo Item to delete..!!";

    filter(userRecord,tempToDoArray,action,message);

    function action(selectedItem){
        tempToDoArray.splice(selectedItem, 1);
    }
}

function showFurtherFilters() {
    let filterType = document.getElementById('filterBy');
    let filterName = filterType.options[filterType.selectedIndex].value;

    if (filterName == "Categories") {
        setFilterValues("inline-block", "none", "none");
    }
    else if (filterName == "Status") {
        setFilterValues("none", "inline-block", "none");
    }
    else if (filterName == "Date") {
        setFilterValues("none", "none", "inline-block");
    }
}

function setFilterValues(category, status, date) {
    document.getElementById('filterByCategories').style.display = category;
    document.getElementById('filterByStatus').style.display = status;
    document.getElementById('filterByDate').style.display = date;
}

function filterItemsByStatus() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let itemsToDisplay = new Array();
    let filterType = document.getElementById('filterByStatus');
    let filterName = filterType.options[filterType.selectedIndex].value;

    for (let index = (userRecord[currentUser].userToDo.length - 1); index >= 0; index--) {
        if (userRecord[currentUser].userToDo[index].status == filterName) {
            itemsToDisplay.push(userRecord[currentUser].userToDo[index]);
        }
    }
    filterResultData(itemsToDisplay);  
}

function filterItemsByCategories() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let itemsToDisplay = new Array();
    let filterType = document.getElementById('filterByCategories');
    let filterName = filterType.options[filterType.selectedIndex].value;

    for (let index = (userRecord[currentUser].userToDo.length - 1); index >= 0; index--) {
        if (userRecord[currentUser].userToDo[index].catogory == filterName) {
            itemsToDisplay.push(userRecord[currentUser].userToDo[index]);
        }
    }
    filterResultData(itemsToDisplay);
}

function filterByDateRange() {
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = userRecord[currentUser].userToDo;
    let todoStartDate = document.getElementById('filterStartDate').value;
    let todoDueDate = document.getElementById('filterDueDate').value;
    let itemsToDisplay = new Array();
    let tempstartDate = new Date(todoStartDate);
    let tempdueDate = new Date(todoDueDate);

    if (tempdueDate.getTime() < tempstartDate.getTime()) {
        alertUser('filterError', "Due date should come after the start date..!!");
        return;
    }
    alertUser('filterError',"");
    for (let index = (tempToDoArray.length - 1); index >= 0; index--) {
        let todoStartDate = new Date(tempToDoArray[index].startDate);
        if ((todoStartDate.getTime() >= tempstartDate.getTime()) && (todoStartDate.getTime() <= tempdueDate.getTime())) {
            itemsToDisplay.push(tempToDoArray[index]);
        }
    }
    filterResultData(itemsToDisplay);
}

function filterResultData(arr){
    if(arr.length == 0){
        document.getElementById('todoTable').style.display = "none";
        document.getElementById('noDataFound').style.display = "block";
    }
    else{
        document.getElementById('todoTable').style.display = "inline-table";
        document.getElementById('noDataFound').style.display = "none";
        clearToDoTable();
        printToDoTable(arr);
    }
}

function showDashboard(){
    document.getElementById('filterBy').selectedIndex = 0;
    document.getElementById('filterByStatus').selectedIndex = 0 ;
    document.getElementById('filterByCategories').selectedIndex = 0;
    document.getElementById('filterByStatus').style.display = "none";
    document.getElementById('filterByCategories').style.display = "none"; 
    document.getElementById("addToDo").reset();
    document.getElementById('todoTable').style.display = "inline-table";
    document.getElementById('noDataFound').style.display = "none";
    document.getElementById('add').style.display = "inline-block";
    document.getElementById('save').style.display = "none";
}