const fetch = require("node-fetch");

/**
 * @class Stor - The Stor DB config
 * @param { string } - Link to your Stor DB
 * @param { string } - Your token
 */
class Stor {
    constructor(link, token) {
        this.link = link;
        this.token = token;
    }
    Table (name) {
        return new _Table(this.link, this.token, name);
    }
}

class _Table {
    constructor(link, token, name) {
        this.link = link;
        this.token = token;
        this.name = name;
    }

    /**
     * @function Init - Init your Table with an object
     * @param { Object } content 
     */
    async Init (content) { 
        return await fetch(`${this.link}/table/`, {
            method: 'POST',
            body: JSON.stringify({name: this.name, content: content}),
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * @function SelectAll - Select all your table 
     */
    async SelectAll() {
        return await fetch(`${this.link}/query/${this.name}/all`, {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        });
    }

    /**
     * @function Get - Get something where champ ... is ...
     * @param { string } champ - The champ
     * @param { string } is - The champ value
     */
    async Get(champ, is) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        });
    }

    /**
     * @function Put - Put something
     * @param { string } champ - The champ
     * @param { string } is - The champ value
     * @param { string } content - The new content
     */
    async Put(champ, is, content) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'PUT',
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        });
    }

    /**
     * @function Delete - Delete something where champ ... is ...
     * @param { string } champ - The champ
     * @param { string } is - The champ value
     */
    async Delete(champ, is) {
        return await fetch(`${this.link}/query/${this.name}/where/${champ}/is/${is}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.token,
            }
        });
    }

    /**
     * @function Create - Create an object in your table
     * @param { Object } content 
     */
    async Create(content) {
        return await fetch(`${this.link}/query/${this.name}/create`, {
            method: 'POST',
            headers: {
                'Authorization': this.token,
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

/* Connection
stor = new Stor("http://localhost:8080", "password") or new Stor(process.env.STOR_LINK, process.env.STOR_PASSWORD)
let users = stor.Table("test")
*/

/* Create DB
users.Init([{name: 'jean'},{name: 'marie'}])
.then(res => res.text())
.then(body => console.log(body))
*/

/* Select all
users.SelectAll()
.then(res => res.json())
.then(body => console.log(body.content))
*/

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

/* Delete
users.Delete('name', 'user')
.then(res => res.text())
.then(body => console.log(body))
*/

/* Create
users.Create({name:'pierre'})
.then(res => res.text())
.then(body => console.log(body))
*/