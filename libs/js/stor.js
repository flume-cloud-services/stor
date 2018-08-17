const fetch = require("node-fetch");

// Stor.js API wrapper
class Stor {
    constructor(link, token) {
        this.link = link
        this.token = token
    }
    Table (name) {
        return new Table(this.link, this.token, name)
    }
}

class Table {
    constructor(link, token, name) {
        this.link = link
        this.token = token
        this.name = name
    }
    async Init (content) { 
        return await fetch(`${this.link}/table/`, {
            method: 'POST',
            body: JSON.stringify({name: this.name, content: content}),
            headers: {
                'Authentification': this.token,
                'Content-Type': 'application/json'
            }
        })
    }
    async SelectAll() {
        return await fetch(`${this.link}/query/${this.name}/all`, {
            method: 'GET',
            headers: {
                'Authentification': this.token
            }
        })
    }
    async Put(champ, is, content) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'PUT',
            headers: {
                'Authentification': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        })
    }
}

exports.Stor = Stor
exports.Table = Table

stor = new Stor("http://localhost:8080", "password")

let users = stor.Table("dbb33")

/* Create DB
users.Init([{name: 'jean'},{name: 'marie'}])
.then(res => res.text())
.then(body => console.log(body))
*/

/* Select All
users.SelectAll()
.then(res => res.json())
.then(body => console.log(JSON.parse(body.content)))
*/

/* Put
users.Put('name', 'marie', 'marinette')
.then(res => res.text())
.then(body => console.log(body))
*/