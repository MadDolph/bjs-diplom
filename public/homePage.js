const logOut = new LogoutButton();
const rBoard = new RatesBoard();
const mManager = new MoneyManager();
const cFavorites = new FavoritesWidget();
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
        if(response.success) {
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
    ApiConnector.convertMoney({fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount}, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            mManager.setMessage(response.success, "Операция выполнена успешно!");    
        } else {
            mManager.setMessage(response.success, response.error);    
        }        
    });
}
mManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney({to: data.to, currency: data.currency, amount: data.amount}, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            mManager.setMessage(response.success, "Операция выполнена успешно!");    
        } else {
            mManager.setMessage(response.success, response.error);    
        }        
    });
}
ApiConnector.getFavorites(response => {
    if(response.success) {
        cFavorites.clearTable();
        cFavorites.fillTable(response.data);
        cFavorites.updateUsersList();
    }
});





