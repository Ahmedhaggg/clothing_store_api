let db = require("../config/database");

let createTransaction = async () => await db.transaction();

let rollback = async transaction => await transaction.rollback(); 

let commit = async transaction => await transaction.commit();



module.exports = { 
    createTransaction,
    rollback,
    commit
}