function validateCredentials(){
    let emailId = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let allowUser = fetchUserDetails(emailId,password);
    if(allowUser == true){
        window.location = '../html/todo.html';
    }
    else{
        return;
    }
}

function fetchUserDetails(emailId,password){
    let userRecord = JSON.parse(localStorage.getItem('registeredUserRecord'));
    if(userRecord == null){
        alertUser('noRecordFound',"No Record Found..!!");
        return false;
    }
    else{
        return authenticateUser(userRecord,emailId,password);
    }
}

function authenticateUser(userRecord,emailId,password){
    let flag  = true;
    let index = 0;

    for(index=0;index<userRecord.length;index++){
        if(userRecord[index].userEmail == emailId){
            let decryptedPassword = atob(userRecord[index].userPassword);
            if(decryptedPassword == password){
                sessionStorage.setItem('activeUserId', index);
                flag = true;
                break;
            }
            else if(decryptedPassword != password){
                alertUser('wrongpass',"Wrong password.Try again..!!");
                document.getElementById('password').value = "";
                flag = false;
                break;
            }
        }
        else{
            flag = false;
        }   
    }

    if((index == userRecord.length) && flag == false){
        alertUser('noRecordFound',"No Record Found..!!");
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        return false;
    }
    else if(flag == false){
        return false;
    }
    else{
        return true;
    }
}

function alertUser(elementId,message){
    document.getElementById(elementId).innerHTML = message;
}

(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            validateCredentials();
        }
    })
})();