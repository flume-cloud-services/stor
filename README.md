<h1 align="center">STOR</h1>

**STOR** provides a JSON database with the power of HTTP requests

[![Build Status](https://travis-ci.org/dimensi0n/stor.svg?branch=master)](https://travis-ci.org/dimensi0n/stor)

## 1. Installation

*You need to install NodeJS first*

Just clone the repository :

    git clone https://www.github.com/dimensi0n/stor.git

And run :

    npm install

## 2. Configuration

Open and edit the configuration file `src/config.ts` : 

    MongoUri is the link to your MongoDB database
    PortNumber is the port number you want the database to run on
    AuthToken is the token you will write for each request on the request header

Once you finished to complete this fields just transpile it :

    ./node-modules/typescript/bin/tsc

## 3. Run it

If you want to run it just for testing you can launch it with this command :

    npm start

But if you want to run it in background lanch it with forever :

    ./node-modules/forever/bin/forever start build/app.js

## 4. Use it

*Use the official library (wait me to code it)*
