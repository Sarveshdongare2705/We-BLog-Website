//mysql connection
import { Express } from "express";
import mysql from "mysql";
export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Myp@ssw0rd",
    database:"blog",
})