
function checkMandatoryFields() {

    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let emailId = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    // let confPasswd = document.getElementById("confirmPassword").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;
   
    if ((firstName == "") || (lastName == "") || (emailId == "") || (passwd == "")) {
        document.getElementById("mandatory").innerHTML = "Please fill out all the mandatory Fields..!!";
        document.getElementById("mandatory").scrollIntoView({ "behavior": 'smooth' });
        return false;
    }
    else {
        // storeUserData
        let userData = StoreItems(firstName, lastName, address, emailId, passwd, genderType);

        if (userData == true) {
            console.log('inside redirecting..');
            alert("Registered Successfully..!!");
            sessionStorage.removeItem("displayPicture");
            window.location = '../html/login.html';
        }

        function StoreItems(firstName, lastName, address, emailId, passwd, genderType) {
            let ToDoList = new Array();

            // if (sessionStorage.getItem('displayPicture') === null) {
            //     alert("Please upload your profile picture");
            //     return false;
            // }

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
}

// function storeUserData() {

//     let firstName = document.getElementById("fName").value;
//     let lastName = document.getElementById("lName").value;
//     let emailId = document.getElementById("email").value;
//     let passwd = document.getElementById("password").value;
//     let confPasswd = document.getElementById("confirmPassword").value;
//     let genderType = document.querySelector('input[name="gender"]:checked').value;
//     let address = document.getElementById("address").value;

//     let bRet = StoreItems(firstName, lastName, address, emailId, passwd, genderType);

//     if (bRet == true) {
//         console.log('inside redirecting..');console.log('inside redirecting..');
//         // alert("Registered successfully");
//         // sessionStorage.removeItem("displayPicture");
//         location.assign('login.html')    
//     }

//     function StoreItems(firstName, lastName, address, emailId, passwd, genderType) {
//         let ToDoList = new Array();

//         // if (sessionStorage.getItem('displayPicture') === null) {
//         //     alert("Please upload your profile picture");
//         //     return false;
//         // }

//         let encryptedPassword = btoa(passwd);
//         let profilePicture = sessionStorage.displayPicture;

//         let userInfo = {
//             'userFirstName': firstName,
//             'userLastName': lastName,
//             'UserAddress': address,
//             'userEmail': emailId,
//             'userPassword': encryptedPassword,
//             'userGender': genderType,
//             'userToDo': ToDoList,
//             'displayPicture': profilePicture
//         };

//         let tempArray = JSON.parse(localStorage.getItem('registeredUserRecord'));

//         if (tempArray == null) {
//             tempArray = [];

//             tempArray.push(userInfo);
//             localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
//             return true;
//         }
//         else {
//             let i = 0;
//             for (i = 0; i < tempArray.length; i++) {
//                 if (tempArray[i].userEmail == emailId) {
//                     break;
//                 }
//             }

//             if (i == tempArray.length) {
//                 tempArray.push(userInfo);
//                 localStorage.setItem("registeredUserRecord", JSON.stringify(tempArray));
//                 return true;
//             }
//             else {
//                 // alert("Email ID already exists");
//                 document.getElementById('wrongemail').innerHTML = "Email ID already exists..!!";
//                 return false;
//             }
//         }
//     }
// }
