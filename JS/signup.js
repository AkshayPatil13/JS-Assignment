//Fetching the input data from HTML Form
let firstName = document.getElementById("fName").value;
let lastName = document.getElementById("lName").value;
let emailId = document.getElementById("email").value;
let passwd = document.getElementById("password").value;
let confPasswd = document.getElementById("confirmPassword").value;
let genderType = document.querySelector('input[name="gender"]:checked').value;
let address = document.getElementById("address").value;



function validate(elementId, inputData, pattern, errorMsgId, errorMsg) {
    if (inputData.match(pattern) || (inputData == "")) {
        document.getElementById(errorMsgId).innerHTML = " ";
        return true;
    }
    else {
        document.getElementById(errorMsgId).innerHTML = errorMsg;
        elementId.value = "";
        elementId.style.borderColor = "#FF0000";
        elementId.focus();
        return false;
    }
}

function validateCharactersOnly(elementId, showError) {
    let userText = elementId.value;
    let regexText = /^[a-zA-z]{3,15}$/g;
    let message = "should contain only alphabets(atleast 3)..!!";
    validate(elementId, userText, regexText, showError, message);
}

function validateUserEmail(elementId, showError) {
    let userEmail = elementId.value;
    let regexEmailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let message = "Please enter valid email address..!!";
    validate(elementId, userEmail, regexEmailid, showError, message);
}

function validatePassword(elementId, showError) {
    let userPass = elementId.value;
    let regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let message = "Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol..!!";
    validate(elementId, userPass, regexPasswd, showError, message);
}

function validateconfPassword(elementId, showError) {
    let password = document.getElementById('password').value;
    let confPassword = elementId.value;
    if (confPassword.match(password)) {
        document.getElementById(showError).innerHTML = " ";
        return true;
    }
    else {
        document.getElementById(showError).innerHTML = "Confirm password should be same as the entered password..!!";
        elementId.value = "";
        elementId.focus();
        return false;
    }

}

function validateAddress(elementId, showError) {
    let address = elementId.value;
    let regexAddrss = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    let message = "Please enter proper address..!!";
    validate(elementId, address, regexAddrss, showError, message);
}

function UploadProfilePicture() {
    let Image = document.getElementById("profilePicture").files[0];

    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);

    imagereader.onload = function () {
        let imgdata = imagereader.result;
        sessionStorage.setItem("displayPicture", imgdata);
        document.getElementById("userPic").src = sessionStorage.displayPicture;
    };

    imagereader.onerror = function (error) {
    };
}

function checkMandatoryFields() {

    if ((firstName == "") || (lastName == "") || (emailId == "") || (passwd == "")) {
        document.getElementById("mandatory").innerHTML = "Please fill out all the mandatory Fields..!!";
        document.getElementById("mandatory").scrollIntoView({ "behavior": 'smooth' });
        return false;
        // document.getElementById("fName").style.border = "2px solid red";
        // document.getElementById("lName").style.border = "2px solid red";
        // document.getElementById("email").style.border = "2px solid red";
        // document.getElementById("password").style.border = "2px solid red";
        // return true;
    }
    else {
        storeUserData();
    }
}

function storeUserData() {

    let bRet = StoreItems(firstName, lastName, address, emailId, passwd, genderType);

    if (bRet == true) {
        alert("Registered successfully");
        sessionStorage.removeItem("displayPicture");
        window.location.href = '../html/login.html';
    }

    function StoreItems(firstName, lastName, address, emailId, passwd, genderType) {
        let ToDoList = new Array();

        if (sessionStorage.getItem('displayPicture') === null) {
            alert("Please upload your profile picture");
            return false;
        }

        let encryptedPassword = btoa(passwd);
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

        let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));

        if (tempArray == null) {
            tempArray = [];

            tempArray.push(userInfo);
            localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
            return true;
        }
        else {
            let i = 0;
            for (i = 0; i < tempArray.length; i++) {
                if (tempArray[i].userEmail == emailId) {
                    break;
                }
            }

            if (i == tempArray.length) {
                tempArray.push(userInfo);
                localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
                return true;
            }
            else {
                // alert("Email ID already exists");
                document.getElementById('wrongemail').innerHTML = "Email ID already exists..!!";
                return false;
            }
        }
    }
}


// function signup() {
//     let obj = {};
//     let userName = document.getElementById('userName').value;
//     // let email = document.getElementById('email').value;
//     let firstName = document.getElementById('firstName').value;
//     let lastName = document.getElementById('lastName').value;
//     // let gender = document.getElementById('gender').value;
//     let gender = document.querySelector('input[name="gender"]:checked').value;
//     let address = document.getElementById('address').value;
//     // let profilePicture = document.getElementById('profilePicture').value;


//     obj.userName = userName;
//     // obj.email = email;
//     obj.firstName = firstName;
//     obj.lastName = lastName;
//     obj.gender = gender;
//     obj.address = address;
//     // obj.userImage = userImage;

//     console.log(obj);

//     localStorage.setItem(obj.userName, JSON.stringify(obj));
// }