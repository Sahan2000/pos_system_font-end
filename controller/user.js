import{UserModel} from "../model/UserModel.js";
import{UserApi} from "../api/userApi.js";

let name = $('#name');
let email =$('#email');
let password = $('#password1');
let confirm_password = $('#password2');

let userName = $('#userName');
let userPassword = $('#password');


let signUpBtn = $('#signUp');
let login = $('#login');

const userApi = new UserApi();

signUpBtn.eq(0).on('click', function (){
    console.log("Hello");
    let nameValue = name.val();
    let emailValue = email.val();
    let passwordValue = password.val();
    let confirm_passwordValue = confirm_password.val();

    if(passwordValue === confirm_passwordValue){
        let userModel = new UserModel(nameValue,emailValue,passwordValue);
        userApi.saveUser(userModel);
    }
});

login.eq(0).on('click',function (){
    event.preventDefault();
    let userNameValue = userName.val();
    let userPasswordValue = userPassword.val();

    userApi.getUser(userNameValue,userPasswordValue);
});