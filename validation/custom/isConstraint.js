let { check } = require("express-validator");
let db = require("../../config/database");
let QueryTypes = require("sequelize").QueryTypes;

let getRaw = async (table, column, columnValue) => {
    let raw = await db.query(
        `SELECT id FROM ${table} WHERE ${column} = ?`,
        {
            replacements: [columnValue],          
            type: QueryTypes.SELECT
        }
    )
    return raw;
}

let isConstraint = (table, column) => 
    check(field).custom( async (value, { req }) => {
        try {
            let raw = await getRaw(table, column, req.body[column]);
                
            if (raw.length === 0) 
                throw new Error(`select correct ${column}`)
            
            return true;

        } catch (error) {
            throw new Error(error || "can't find this field")
        }
    })

module.exports = isConstraint;