const Transaction = require('./transaction');

class User {
    constructor(id, email, name, password) {
        // Build from query result
        if (arguments.length == 1) {
            var userData = id[0];
            this.id = userData.id;
            this.email = userData.email;
            this.name = userData.name;
            this.password = userData.password;
            return;
        }
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    getBalance() {
        var retVal = 0;
        for (const transaction of this.transactions) {
           retVal += transaction.amount; 
        }
        return retVal;
    }

    async getTransactions() {
        var transactions = await Transaction.getTransactionsForUser(this.email);
        this.transactions = transactions;
        console.log(transactions);
        return transactions;
    }

    async getTransaction(id) {
        var transactions = await Transaction.getTransactionsForUser(this.email);
        for (const transaction of transactions) {
            if (id == transaction.id) return transaction;
        }
    }

    addTransaction(title, amount, notes) {
        try {
            var transaction = new Transaction(title, amount, notes);
            transaction.addTransactionToUser(this.id);
        } catch (error) {
            console.log(error);
        }
    }

    static async register(name, email, password) {
        const QUERY = "insert into users(`name`, `email`, `password`) values (?, ?, ?)";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [name, email, password], function () {
                resolve(arguments);
            })
        });
        if (queryResults[0]) throw new Error("User exists");
        return User.getUser(email);
    }

    static async login(email, password) {
        const QUERY = "select * from users where `email` = ? and `password` = ?";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [email, password], function () {
                resolve(arguments);
            })
        });
        if (queryResults[0] /* error */) {
            throw new Exception("Error in get user");
        }
        else {
            return new User(queryResults[1]);
        }
    }

    static async getUser(email) {
        const QUERY = "select * from users where `email` = ?";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [email], function () {
                resolve(arguments);
            })
        });
        if (queryResults[0] /* error */) {
            throw new Exception("Error in get user");
        }
        else {
            return new User(queryResults[1]);
        }
    }
}

module.exports = User;