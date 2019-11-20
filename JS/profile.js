function logOutUserSession() {
    sessionStorage.removeItem('activeUserId');
    window.location = "../html/login.html";
}

function showCurrentUserInfo(){
    if((localStorage.getItem('registeredUserRecord') === null) || (sessionStorage.getItem('activeUserId') === null)){
        window.location = "../html/login.html";
        return;
    }
    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    
   
    document.getElementById('fName').value = tempArray[currentUser].userFirstName;
    document.getElementById('lName').value = tempArray[currentUser].userLastName;
    document.getElementById('email').value = tempArray[currentUser].userEmail;
    document.getElementById('password').value = atob(tempArray[currentUser].userPassword);
    document.getElementById('address').value = tempArray[currentUser].UserAddress;
    document.getElementById('userPic').src = tempArray[currentUser].displayPicture;

    if(tempArray[currentUser].genderType == 'male'){
        document.getElementsByName("gender")[0].checked = true;
    }
    
    else  if(tempArray[currentUser].genderType == 'female'){
        document.getElementsByName("gender")[1].checked = true;
    }

    else  if(tempArray[currentUser].genderType == 'other'){
        document.getElementsByName("gender")[1].checked = true;
    }
}

function enableInputFields(){

    document.getElementById('fName').disabled = false;
    document.getElementById('lName').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('profilePicture').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('submit').disabled = false;
    for(let i=0;i<document.getElementsByName("gender").length;i++){
        document.getElementsByName("gender")[i].disabled = false;
    }

}

function updateUserData(){
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let passwd = document.getElementById("password").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = tempArray[currentUser].userToDo;

    tempArray[currentUser].userFirstName = firstName;
    tempArray[currentUser].userLastName = lastName;
    tempArray[currentUser].userPassword = btoa(passwd);
    tempArray[currentUser].userGender = genderType;
    tempArray[currentUser].UserAddress = address;
    tempArray[currentUser].userToDo = tempToDoArray;
    tempArray[currentUser].displayPicture = sessionStorage.displayPicture;

    localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
    alert('Your changes has been saved successfully..!!');
    sessionStorage.removeItem('displayPicture');
    window.location.reload();



}

