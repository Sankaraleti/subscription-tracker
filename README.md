# adding eslint configuration

# npx eslint --init

# create express server

# app.listen(port , () => {})

# setup environment

# npm install dotenv

# adding routes -> create routes folder

# separate routes based on the functionality

# setting up data (login into mangodb atlas)

# Create new project & create a cluster

# create database folder -> mongodb.js file for database connection

# controllers are dedicated space to write the function logic/ api logic

# we are creating mongoose session to make atomic operations. database operations that update the state are atomic. All or nothing

# Insert either works completely or it doesn't

# Update either works completely or it doesn't

# You never get half an operation

# req.body is an object containing data from the client(POST request)

# Authorization (we need to prevent user details to be private)

# create an authentication middleware

# restrict the no.of api calls that can make in a minute (spam things)

# arcjet could help us here to prevent spam or bot apis calls

# i.e Rate limiting (you can make certain no.of calls at time)

# install arcjet for node&express and then create a config file for it and then a separate middlware for arcjet
