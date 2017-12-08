class Transaction {
    constructor(title, amount, notes) {
        // Build from query result
        if (arguments.length == 1) {
            var userData = arguments[0];
            this.id = userData.id;
            this.userId = userData.userId;
            this.title = userData.title;
            this.amount = userData.amount;
            this.notes = userData.notes;
            this.date = userData.date;
            return;
        }
        else if (arguments.length == 3) {
            this.title = title;
            this.amount = amount;
            this.notes = notes;
            return;
        }
        throw new Error("Argument signature mismatch in transaction constructor");
    }

    static async getTransactionsForUser(email) {
        const QUERY = "select * from transactions where userId = (select id from users where email = ?)";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [email], function () {
                resolve(arguments);
            })
        });
        var retVal = [];
        for (const result of queryResults[1]) {
            retVal.push(new Transaction(result))
        }
        return retVal;
    }

    async addTransactionToUser(userId) {
        const QUERY = "insert into transactions (`userId`, `title`, `amount`, `notes`) values (?, ?, ?, ?)";
        console.log(this);
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [userId, this.title, this.amount, this.notes, this.date], function () {
                resolve(arguments);
            })
        });
        console.log(queryResults, "should return id of new transaction¡");
    }

    async updateTransaction(title, amount, notes) {
        const QUERY = "update transactions set title = ?, amount = ?, notes = ? where id = ?";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [title, amount, notes, this.id], function () {
                resolve(arguments);
            })
        });
        console.log(queryResults, "should return id of edited transaction.");
    }

    async deleteTransaction() {
        const QUERY = "delete from transactions where id = ?";
        var queryResults = await new Promise(resolve => {
            global.mysqlPool.query(QUERY, [id], function () {
                resolve(arguments);
            })
        });
        console.log(queryResults, "should return id of deleted transaction.");
    }
}

module.exports = Transaction;