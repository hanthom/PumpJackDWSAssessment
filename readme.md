# Readme for Pumpjacks Dataworks Assessment

To run this code locally, you will need two terminals open, one for the at the **server** and the other at the **client**.
This is all based on the assumption that nodejs is installed on the machine this will run on.

## Server

To get the **server** set up, follow these steps (in the api directory):
1. npm install
2. npm start
3. There is a .env file that is on github that has basic variables for the postgres connection. You can either update these to have your connection details, or create this database and user locally yourself.

If you need to create the database and local user to match the variables in the .env file, follow the code snippets below:

1. The first thing that needs to be done is you need to have postgresql on your machine. I assume this is there, but I will write this out as if it isn't (skip to number 3 if you have postgres on your machine).
```
brew install postgresql
```
2. Once this is done, we start postgresql.
```
brew services start postgresql
```
3. From your terminal, use the following command to gain access to postgresql.
```
psql postgres
```
4. Optional: This step will remove a database called ***pumpjacks*** if you have one locally that you think will interfere with this code.
```
DROP DATABASE IF EXISTS pumpjacks;
```
5. Next, we create the user with password:
```
CREATE ROLE local_user WITH LOGIN PASSWORD 'secretpassword'
```
6. Next, we will create the database:
```
CREATE DATABASE `Pumpjacks`;
```
7. Now that we have the database, we need to seed the database. This code base uses Sequelize to do this. First line is to install Sequelize if you do not have it (make sure you are in the ***server*** directory for these last steps).
```
npm install sequelize
```
8. Now we will set up the tables with this command:
```
sequelize db:migrate
```
9. And finally, to seed the data:
```
sequelize db:seed:all
```

## Client

To get the **client** set up, follow these steps (in the client directory):
1. npm install
2. npm start

Note: The client is listening to localhost port 3000, while the server is listening to port 9000.

## Authentication

The authentication that is in this code base is simple in this form. The only two routes that are not protected are the "login" route and the get all users route. Any access to products is tied behind having an authenticated token available on the api calls. Once you login as a user through the button click, you can then view products tied to users.

In regards to seeing who is making a request, I have the name of the "authed" user logging out when api calls are made. This is all done through a JSON web token that gets set when you auth in as a user.

It's important to note, if you are going to try and make api calls to the server through either postman or curl commands, you must hit the auth route first to get the token, then use it in your request header with the key 'x-auth-token'. The return from the initial auth route will give you this token as a string.
