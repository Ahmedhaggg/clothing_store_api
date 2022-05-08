let db = require("../config/database");

let createTransaction = async () => await db.transaction();

let cancel = async transaction => await transaction.rollback(); 

let saving = async transaction => await transaction.commit();



module.exports = { 
    createTransaction,
    cancel,
    saving
}