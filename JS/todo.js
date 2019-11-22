
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

// function checkEmptyList(arr) {
//     if (arr.length == 0) {

//         document.getElementById('todoTable').style.display = "none";
//         document.getElementById('noDataFound').style.display = "block";
//     }
// }

function addNewToDoItem() {
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    let title = document.getElementById('toDoTitle').value;
    let sDate = document.getElementById('startDate').value;
    let dDate = document.getElementById('dueDate').value;
    let isToDoPublic = document.getElementById('isToDoPublic').checked;
    let categoryType = document.querySelector('input[name="categories"]:checked').value;
    let todoDescription = document.getElementById('description').value;

    let tempstartDate = new Date(sDate);
    let tempdueDate = new Date(dDate);

    if (title == "") {
        document.getElementById('alertUser').innerHTML = "Please enter Title for ToDo Item..!!";
        return;
    }

    if (sDate == "") {
        document.getElementById('alertUser').innerHTML = "Please set the start date..!!";
        return;
    }

    if (dDate == "") {
        document.getElementById('alertUser').innerHTML = "Please set the due date..!!";
        return;
    }

    if (tempdueDate.getTime() < tempstartDate.getTime()) {
        document.getElementById('alertUser').innerHTML = "Due date should come after the start date..!!";
        return;
    }

    if (todoDescription == "") {
        document.getElementById('alertUser').innerHTML = "Please enter the description for ToDo Item..!!";
        return;
    }

    isToDoPublic = isToDoPublic === true ? "Yes" : "No";

    let ToDoItem = {
        'title': title,
        'startDate': sDate,
        'dueDate': dDate,
        'isPublic': isToDoPublic,
        'catogory': categoryType,
        'description': todoDescription,
        'status': 'pending',
    }

    tempArray[currentUser].userToDo.push(ToDoItem);

    localStorage.setItem('registeredUserRecord', JSON.stringify(tempArray));

    if (tempToDoArray.length > 0) {
        document.getElementById('todoTable').style.display = "inline-table";
        document.getElementById('noDataFound').style.display = "none";
    }

    clearToDoTable();
    printToDoTable(tempArray[currentUser].userToDo);
    document.getElementById("addToDo").reset();
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

function showCurrentUserToDo() {

    if ((localStorage.getItem('registeredUserRecord') === null) || (sessionStorage.getItem('activeUserId') === null)) {
        window.location = "../html/login.html";
        return;
    }

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    if(tempToDoArray.length == 0){
        document.getElementById('todoTable').style.display = "none";
        document.getElementById('noDataFound').style.display = "block";
    }
    else{
        clearToDoTable();
        printToDoTable(tempToDoArray);
    }
    // checkEmptyList(tempToDoArray);
}


function editToDoItem() {

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let selectedItemArray = document.getElementsByName('selectedItem');

    let flag = 0;
    let index = 0;
    let editItem = 0;


    for (index = (tempArray[currentUser].userToDo.length - 1); index >= 0; index--) {

        if (selectedItemArray[index].checked === true) {
            flag++;
            editItem = index;
        }
    }

    if (flag == 1) {
        if (selectedItemArray[editItem].checked === true) {
            document.getElementById('toDoTitle').value = tempArray[currentUser].userToDo[editItem].title;
            document.getElementById('startDate').value = tempArray[currentUser].userToDo[editItem].startDate;
            document.getElementById('dueDate').value = tempArray[currentUser].userToDo[editItem].dueDate;

            if ((tempArray[currentUser].userToDo[editItem].isPublic) == "No") {
                document.getElementById("isToDoPublic").checked = false;
            }
            else {
                document.getElementById("isToDoPublic").checked = true;
            }

            if ((tempArray[currentUser].userToDo[editItem].catogory) == "Home") {
                document.getElementsByName("categories")[0].checked = true;
            }

            else if ((tempArray[currentUser].userToDo[editItem].catogory) == "Personal") {
                document.getElementsByName("categories")[1].checked = true;
            }

            else {
                document.getElementsByName("categories")[2].checked = true;
            }

            document.getElementById('description').value = tempArray[currentUser].userToDo[editItem].description;
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

    let index = sessionStorage.getItem('EditedItemIndex');
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');

    tempArray[currentUser].userToDo[index].title = document.getElementById('toDoTitle').value;
    tempArray[currentUser].userToDo[index].startDate = document.getElementById('startDate').value;
    tempArray[currentUser].userToDo[index].dueDate = document.getElementById('dueDate').value;

    if (document.getElementById("isToDoPublic").checked == true) {
        tempArray[currentUser].userToDo[index].isPublic = "Yes";
    }
    else {
        tempArray[currentUser].userToDo[index].isPublic = "No";
    }

    if (document.getElementsByName("categories")[0].checked == true) {
        tempArray[currentUser].userToDo[index].catogory = "Home";
    }
    else if (document.getElementsByName("categories")[1].checked == true) {
        tempArray[currentUser].userToDo[index].catogory = "Personal";
    }
    else {
        tempArray[currentUser].userToDo[index].catogory = "Office";
    }

    tempArray[currentUser].userToDo[index].description = document.getElementById('description').value;
    localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
    sessionStorage.removeItem('EditedItemIndex');
}

function updateToDoItemStatus() {
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;
    let selectedItemArray = document.getElementsByName('selectedItem');

    let flag = 0;
    let index = 0;
    let selectedItem = 0;

    for (index = (tempArray[currentUser].userToDo.length - 1); index >= 0; index--) {

        if (selectedItemArray[index].checked === true) {
            flag++;
            selectedItem = index;
            tempArray[currentUser].userToDo[selectedItem].status = "Done";
            // document.getElementById('todoTable').rows[index].style.backgroundColor = "#4bae4f";
        }
    }

    if (flag == 0) {
        alert('Please select a Todo Item to update its Status..!!');
    }

    else {
        localStorage.setItem('registeredUserRecord', JSON.stringify(tempArray));
        // window.location.reload();
        clearToDoTable();
        printToDoTable(tempToDoArray);
    }

}

function deleteToDoItem() {
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let selectedItemArray = document.getElementsByName('selectedItem');
    let tempToDoArray = tempArray[currentUser].userToDo;

    let flag = 0;
    let index = 0;
    let selectedItem = 0;

    for (index = (tempArray[currentUser].userToDo.length - 1); index >= 0; index--) {

        if (selectedItemArray[index].checked === true) {
            flag++;
            selectedItem = index;
            tempArray[currentUser].userToDo.splice(selectedItem, 1);
        }
    }

    if (flag == 0) {
        alert('Please select a Todo Item to delete..!!');
    }

    else {
        localStorage.setItem('registeredUserRecord', JSON.stringify(tempArray));
        // window.location.reload();
        clearToDoTable();
        printToDoTable(tempToDoArray);
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
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let itemsToDisplay = new Array();

    let filterType = document.getElementById('filterByStatus');
    let filterName = filterType.options[filterType.selectedIndex].value;

        for (let index = (tempArray[currentUser].userToDo.length - 1); index >= 0; index--) {
            if (tempArray[currentUser].userToDo[index].status == filterName) {
                itemsToDisplay.push(tempArray[currentUser].userToDo[index]);
            }
        }
        filterResultData(itemsToDisplay);  
}

function filterItemsByCategories() {
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let itemsToDisplay = new Array();

    let filterType = document.getElementById('filterByCategories');
    let filterName = filterType.options[filterType.selectedIndex].value;

    for (let index = (tempArray[currentUser].userToDo.length - 1); index >= 0; index--) {
        if (tempArray[currentUser].userToDo[index].catogory == filterName) {
            itemsToDisplay.push(tempArray[currentUser].userToDo[index]);
        }
    }
    
    filterResultData(itemsToDisplay);
}

function filterByDateRange() {

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    let sDate = document.getElementById('filterStartDate').value;
    let dDate = document.getElementById('filterDueDate').value;
    let itemsToDisplay = new Array();

    let tempstartDate = new Date(sDate);
    let tempdueDate = new Date(dDate);

    if (tempdueDate.getTime() < tempstartDate.getTime()) {
        document.getElementById('filterError').innerHTML = "Due date should come after the start date..!!";
        return;
    }
    document.getElementById('filterError').innerHTML = "";

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
    // window.location.reload();
    document.getElementById('filterBy').selectedIndex = 0;
    document.getElementById('filterByStatus').selectedIndex = 0 ;
    document.getElementById('filterByCategories').selectedIndex = 0;
    document.getElementById('filterByStatus').style.display = "none";
    document.getElementById('filterByCategories').style.display = "none"; 
    document.getElementById("addToDo").reset();
    document.getElementById('todoTable').style.display = "inline-table";
    document.getElementById('noDataFound').style.display = "none";

}