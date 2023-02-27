const logOut = new LogoutButton();
const rBoard = new RatesBoard();
const mManager = new MoneyManager();
logOut.action = () => {
    ApiConnector.logout(response => {
        response.success ? window.location.reload() : console.log("logout failed");
    });
}
ApiConnector.current(response => {
    response.success ? ProfileWidget.showProfile(response.data) : console.log("failed");
});
function getCurrency() {
    ApiConnector.getStocks(response => {
        if(response) {
            rBoard.clearTable();
            rBoard.fillTable(response.data);
        }
    });
}
getCurrency();
let currencyReloadInterval = setInterval(getCurrency, 60000);
mManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney({currency: data.currency, amount: data.amount}, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            mManager.setMessage(response.success, "Операция выполнена успешно!");    
        } else {
            mManager.setMessage(response.success, response.error);    
        }        
    });
}
mManager.conversionMoneyCallback = (data) => {
    console.log(data);
    ApiConnector.convertMoney({fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount}, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            mManager.setMessage(response.success, "Операция выполнена успешно!");    
        } else {
            mManager.setMessage(response.success, response.error);    
        }        
    });
}




