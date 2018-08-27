<h1 align="center">
    <img width="500" src="https://media.discordapp.net/attachments/368671564608045058/480525711283716096/stor.svg.png?width=799&height=549"/>
</h1>

<p align="center">
    <img src="https://img.shields.io/badge/version-1.0-brightgreen.svg"/>
    <a href="https://travis-ci.org/dimensi0n/stor"><img src="https://travis-ci.org/dimensi0n/stor.svg?branch=master"/></a>
    <a href="https://github.com/dimensi0n/stor/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"/></a>
</p>

**STOR** provides a JSON database with the power of HTTP requests

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

Install the official js library :

    npm install stor-js

Connect to your Stor database and select your table :

    const stor = require("stor-js");

    const Stor = new stor.Stor("link to your Stor database", "Your AuthToken in your configuration file");

    let users = Stor.Table("users");

Then init your Stor database :

    users.Init([])
    .then(res => res.text())
    .then(body => console.log(body))

### Select All :

    users.SelectAll()
    .then(res => res.json())
    .then(body => console.log(body.content))

### Create :

    users.Create({name:'pierre'})
    .then(res => res.text())
    .then(body => console.log(body))

### Get where :

    users.Get('name', 'pierre')
    .then(res => res.text())
    .then(body => console.log(body))

*Get user when name is 'pierre'*

### Update :

    users.Put('name', 'pierre', 'jean')
    .then(res => res.text())
    .then(body => console.log(body))

*Update user when name is 'pierre' to 'jean'*

### Delete :

    users.Delete('name', 'jean')
    .then(res => res.text())
    .then(body => console.log(body))

*Delete user when name is 'jean'*
