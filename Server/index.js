// const express= require('express')
import express from 'express';
import dotenv, { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './DataBase/Db.js';
import Router from './Routes/Route.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', Router);



const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
});