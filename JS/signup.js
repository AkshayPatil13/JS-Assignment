function validateCharactersOnly(elementId, showError){
    let userText = elementId.value;
    let pattern = /^[a-zA-z]{3,15}$/g;
    if((userText.match(pattern)) || (userText == "")){
        document.getElementById(showError).innerHTML = " ";
        return true;
    }
    else{
        document.getElementById(showError).innerHTML= "should contain only alphabets(atleast 3)..!!";
        elementId.value="";
        elementId.focus();
        return false;
    }
}

function validateUserEmail(elementId,showError){
    let userEmail = elementId.value;
    let regexEmailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(userEmail.match(regexEmailid) || (userEmail == "")){
        document.getElementById(showError).innerHTML = " ";
        return true;
    }
    else{
        document.getElementById(showError).innerHTML= "Please enter valid email address..!!";
        elementId.value="";
        elementId.focus();
        return false;
    }
}

function validatePassword(elementId, showError){
    let userPass = elementId.value;
    let regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(userPass.match(regexPasswd) || (userPass == "")){
        document.getElementById(showError).innerHTML = " ";
        return true;
    }
    else{
        document.getElementById(showError).innerHTML= "Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol..!!";
        elementId.value="";
        elementId.focus();
        return false;
    }
}

function validateconfPassword(elementId,showError){
    let password = document.getElementById('passwd').value;
    let confpassword = elementId.value;
    if(confpassword.match(password)){
        document.getElementById(showError).innerHTML = " ";
        return true;
    }
    else{
        document.getElementById(showError).innerHTML= "Confirm password should be same as the entered password..!!";
        elementId.value="";
        elementId.focus();
        return false;
    }

}

function signup(){
    let obj = {};
    let userName = document.getElementById('userName').value;
    // let email = document.getElementById('email').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    // let gender = document.getElementById('gender').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById('address').value;
    // let profilePicture = document.getElementById('profilePicture').value;
    
    
    obj.userName = userName;
    // obj.email = email;
    obj.firstName = firstName;
    obj.lastName = lastName;
    obj.gender = gender;
    obj.address = address;
    // obj.userImage = userImage;

    console.log(obj);

   localStorage.setItem(obj.userName, JSON.stringify(obj));
}