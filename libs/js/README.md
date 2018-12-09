<h1 align="center">
    <img width="500" src="https://media.discordapp.net/attachments/368671564608045058/480525711283716096/stor.svg.png?width=799&height=549"/>
</h1>

<p align="center">
    <img src="https://img.shields.io/badge/version-1.2-brightgreen.svg"/>
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

Stor uses Environment variable :

    STOR_MONGO_URI is the link to your MongoDB database
    STOR_PORT is the port number you want the database to run on
    STOR_PASSWORD is the token you will write for each request on the request header
    STOR_CORS is the Cors config object : 1 if cors is enabled, by default is true; 0 if cors is disabled
    STOR_CORS_WHITELIST (optionnal, the domain you want to be validate) Example: STOR_CORS_WHITELIST=www.mydomain.com,www.myotherdomain.com

Once you finished to complete this fields just transpile it :

    npx tsc

## 3. Run it

If you want to run it just for testing you can launch it with this command :

    npm start

## 4. Use it

Install the official js library :

    npm install stor-js

Connect to your Stor database and select your table :
```js
const stor = require("stor-js");

const Stor = new stor.Stor("link to your Stor database", "Your AuthToken in your configuration file");

let users = Stor.Table("users");
```

Then init your Stor database :
```js
users.Init([])
    .then(res => res.text())
    .then(body => console.log(body))
```
### Select All :
```js
users.SelectAll()
    .then(res => res.json())
    .then(body => console.log(body.content))
```
### Create :
```js
users.Create({name:'pierre'})
    .then(res => res.text())
    .then(body => console.log(body))
```
### Get where :
```js
users.Get('name', 'pierre')
    .then(res => res.text())
    .then(body => console.log(body))
```
*Get user when name is 'pierre'*

### Update :
```js
    users.Put('name', 'pierre', 'jean')
    .then(res => res.text())
    .then(body => console.log(body))
```
*Update user when name is 'pierre' to 'jean'*

### Delete :
```js
    users.Delete('name', 'jean')
    .then(res => res.text())
    .then(body => console.log(body))
```
*Delete user when name is 'jean'*
