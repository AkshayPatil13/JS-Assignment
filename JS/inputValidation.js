function validate(elementId, inputData, pattern, errorMsgId, errorMsg) {
    if (inputData.match(pattern) || (inputData == "")) {
        document.getElementById(errorMsgId).innerHTML = " ";
        return true;
    }
    else {
        document.getElementById(errorMsgId).innerHTML = errorMsg;
        elementId.value = "";
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