function logOutUserSession() {
    sessionStorage.removeItem('activeUserId');
    window.location = "../html/login.html";
}

function showCurrentUserInfo(){
    if((localStorage.getItem('registeredUserRecord') === null) || (sessionStorage.getItem('activeUserId') === null)){
        window.location = "../html/login.html";
        return;
    }
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    
    document.getElementById('fName').value = userRecord[currentUser].userFirstName;
    document.getElementById('lName').value = userRecord[currentUser].userLastName;
    document.getElementById('email').value = userRecord[currentUser].userEmail;
    document.getElementById('password').value = atob(userRecord[currentUser].userPassword);
    document.getElementById('address').value = userRecord[currentUser].UserAddress;
    document.getElementById('userPic').src = userRecord[currentUser].displayPicture;

    if((userRecord[currentUser].userGender) == 'male'){
        document.getElementsByName("gender")[0].checked = true;
    }
    else  if((userRecord[currentUser].userGender) == 'female'){
        document.getElementsByName("gender")[1].checked = true;
    }
    else  if((userRecord[currentUser].userGender) == 'other'){
        document.getElementsByName("gender")[2].checked = true;
    }
}

function updateProfile(){
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let password = document.getElementById("password").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;

    if((firstName == "") || (lastName == "") || (password == "") || (address == "")){
        alert("Please fill out all the Fields..!!");
        return false;
    }
    else{
        updateUserData(firstName,lastName,password,genderType,address);
    }
}

function updateUserData(firstName,lastName,password,genderType,address){
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    let currentUser = sessionStorage.getItem('activeUserId');
    let tempToDoArray = userRecord[currentUser].userToDo;

    userRecord[currentUser].userFirstName = firstName;
    userRecord[currentUser].userLastName = lastName;
    userRecord[currentUser].userPassword = btoa(password);
    userRecord[currentUser].userGender = genderType;
    userRecord[currentUser].UserAddress = address;
    userRecord[currentUser].userToDo = tempToDoArray;
    userRecord[currentUser].displayPicture = sessionStorage.displayPicture;

    localStorage.setItem("registeredUserRecord", JSON.stringify(userRecord));
    alert('Your changes has been saved successfully..!!');
    sessionStorage.removeItem('displayPicture');
    window.location.reload();
}

