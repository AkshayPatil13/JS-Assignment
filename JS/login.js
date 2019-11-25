function validateCredentials(){
    let emailId = document.getElementById('email').value;
    let passwd = document.getElementById('password').value;

    fetchUserDetails(emailId,passwd);
    let allowUser = fetchUserDetails(emailId,passwd);

    if(allowUser == true){
        window.location = '../html/todo.html';
    }
    else{
        return;
    }
}

function fetchUserDetails(emailId,passwd){

    let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));

    if(tempArray == null){
        document.getElementById('noRecordFound').innerHTML = "No Record Found..!!";
        return false;
    }

    else{
        let flag  = true;
        let index = 0;

        for(index=0;index<tempArray.length;index++){

            if(tempArray[index].userEmail == emailId){

                let decryptedPassword = atob(tempArray[index].userPassword);

                if(decryptedPassword == passwd){
                    sessionStorage.setItem('activeUserId', index);
                    flag = true;
                    break;
                }
                else if(decryptedPassword != passwd){
                    document.getElementById('wrongpass').innerHTML = "Wrong password.Try again..!!";
                    flag = false;
                    break;
                }
            }
            else{
                flag = false;
            }
            
        }

        if((index == tempArray.length) && flag == false){
            document.getElementById('noRecordFound').innerHTML = "No Record Found..!!";
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
}


(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            validateCredentials();
        }
    })
})();