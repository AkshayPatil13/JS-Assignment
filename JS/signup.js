(function(){
    if(sessionStorage.getItem('activeUserId') !== null){
        window.location = "../html/todo.html";
    }
})();

function checkMandatoryFields() {
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let emailId = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;
   
    if ((firstName == "") || (lastName == "") || (emailId == "") || (password == "")) {
        alertUser('mandatory',"Please fill out all the mandatory Fields..!!");
        document.getElementById("mandatory").scrollIntoView({ "behavior": 'smooth' });
        return false;
    }
    else {
        let userData = StoreItems(firstName, lastName, address, emailId, password, genderType);
        if (userData == true) {
            alert("Registered Successfully..!!");
            sessionStorage.removeItem("displayPicture");
            window.location = '../html/login.html';
        }
    }
}

function StoreItems(firstName, lastName, address, emailId, password, genderType) {
    let ToDoList = new Array();
    let encryptedPassword = btoa(password);
    let profilePicture = sessionStorage.displayPicture;

    let userInfo = {
        'userFirstName': firstName,
        'userLastName': lastName,
        'UserAddress': address,
        'userEmail': emailId,
        'userPassword': encryptedPassword,
        'userGender': genderType,
        'userToDo': ToDoList,
        'displayPicture': profilePicture
    };

    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    if (userRecord == null) {
        userRecord = [];
        userRecord.push(userInfo);
        localStorage.setItem("registeredUserRecord", JSON.stringify(userRecord));
        return true;
    }
    else {
         return checkUniqueEmailId(userRecord,userInfo,emailId);
   }
}

function checkUniqueEmailId(userRecord,userInfo,emailId){
    let i = 0;
    for (i = 0; i < userRecord.length; i++) {
        if (userRecord[i].userEmail == emailId) {
            break;
        }
    }
    if (i == userRecord.length) {
        userRecord.push(userInfo);
        localStorage.setItem("registeredUserRecord", JSON.stringify(userRecord));
        return true;
    }
    else {
        alertUser('wrongemail',"Email ID already exists..!!");
        return false;
    }
}

function alertUser(elementId,message){
    document.getElementById(elementId).innerHTML = message;
}

(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            checkMandatoryFields();
        }
    })
})();
