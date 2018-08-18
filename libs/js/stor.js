const fetch = require("node-fetch");

// Stor.js API wrapper
class Stor {
    constructor(link, token) {
        this.link = link;
        this.token = token;
    }
    Table (name) {
        return new Table(this.link, this.token, name);
    }
}

class Table {
    constructor(link, token, name) {
        this.link = link;
        this.token = token;
        this.name = name;
    }
    async Init (content) { 
        return await fetch(`${this.link}/table/`, {
            method: 'POST',
            body: JSON.stringify({name: this.name, content: content}),
            headers: {
                'Authentification': this.token,
                'Content-Type': 'application/json'
            }
        });
    }
    async SelectAll() {
        return await fetch(`${this.link}/query/${this.name}/all`, {
            method: 'GET',
            headers: {
                'Authentification': this.token
            }
        });
    }
    async Get(champ, is) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'GET',
            headers: {
                'Authentification': this.token
            }
        });
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
        });
    }
    async Delete(champ, is) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'DELETE',
            headers: {
                'Authentification': this.token,
            }
        });
    }
    async Create(content) {
        return await fetch(`${this.link}/query/${this.name}/create`, {
            method: 'POST',
            headers: {
                'Authentification': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        });
    }
}

exports.Stor = Stor
exports.Table = Table


stor = new Stor("http://localhost:8080", "password") //or new Stor(process.env.STOR_LINK, process.env.STOR_PASSWORD)
let users = stor.Table("test")


/* Create DB
users.Init([{name: 'jean'},{name: 'marie'}])
.then(res => res.text())
.then(body => console.log(body))
*/


users.SelectAll()
.then(res => res.json())
.then(body => console.log(body.content))


/* Get
users.Get('name', 'marie')
.then(res => res.text())
.then(body => console.log(body))
*/

/* Put
users.Put('name', 'marie', 'marinette')
.then(res => res.text())
.then(body => console.log(body))
*/

/*Delete
users.Delete('name', 'user')
.then(res => res.text())
.then(body => console.log(body))
"No results found"
*/