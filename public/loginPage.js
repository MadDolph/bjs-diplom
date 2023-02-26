"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login({login: data.login, password: data.password}, response => {        
        response.success ? window.location.reload() : userForm.setLoginErrorMessage(response.error);
    });        
}
userForm.registerFormCallback = (data) => {
    ApiConnector.register({login: data.login, password: data.password}, response => {
        response.success ? window.location.reload() : userForm.setLoginErrorMessage(response.error);
    });
}