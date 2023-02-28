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
function renewFavorites() {
ApiConnector.getFavorites(response => {
        if(response.success) {
        cFavorites.clearTable();
        cFavorites.fillTable(response.data);
        mManager.updateUsersList(response.data);
        }
    });
}

renewFavorites();
cFavorites.addUserCallback = (data) => {
    if(data.id > 0) { 
        ApiConnector.addUserToFavorites({id: data.id, name: data.name}, response => {
            if(response.success) {
                renewFavorites();
                cFavorites.setMessage(response.success, "Пользователь успешно добавлен в избранное");
            } else {
                cFavorites.setMessage(response.success, response.error);
            }       
        });
    } else {
        cFavorites.setMessage(false, "id пользователя не может быть отрицательным");
        renewFavorites();
    }
}
cFavorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            renewFavorites();
            cFavorites.setMessage(response.success, "Пользователь успешно удалён из избранного");
        } else {
            cFavorites.setMessage(response.success, response.error);
        }
    });
}





