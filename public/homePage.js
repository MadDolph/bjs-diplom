const logOut = new LogoutButton();
logOut.action = () => {
    ApiConnector.logout(response => {
        response.success ? window.location.reload() : console.log("logout failed");
    });
}