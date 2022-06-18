# clothing_store_api

## Table of contents

- [Introduction](#introduction)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)
- [Database Models](#database)
- [architecture](#architecture)

## Introduction
online store using Node js, Express js, mysql, sequelize. 


NOTE: Please read the RUN section before opening an issue.

## Run
- download repo in your pc 
- open folder in your cli
- sure that you download docker 
- run next command : 
 ```bash
docker compose up
```
- appl will run

## technology

The application is built with:

- node.js
- express
- mysql
- sequelize
- stripe
- jsonwebtoken
- nodemailer
- bcrypt
- body-parser
- crypto
- express-validator
- jest
- multer
- mysql2
- node-cron
- slugify

## features
online store for sell clothes 
make offers in clothes


admin:
- one admin manage the application
- login
- manage categories
- manage subcategories
- manage products
- manage discount
- manage offers
- manage governorates
- manage cities
- manage orders
- manage shipping 
- manage shippers
- complete order to sales
- manage users

users: 
 - see product 
 - search about product
 - filter products
 - see categories
 - see subcategories
 - make order
 - can have multiple addresses
 - can see your sales and orders and addresses


## database 
- clone project 
```bash
install sequelize cli 
```
- run command
```bash
npx sequelize-cli db:migrate
```
- then can your show database before run project

## architecture 
router
validation : return array of rules 
controller : call services to handle with db 
services : to separte database logic about controller 
