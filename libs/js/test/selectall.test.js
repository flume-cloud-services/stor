const stor = require("../stor.js");

Stor = new stor.Stor("http://90.109.132.10:8080", "password");

let users = Stor.Table("test");

it('Select all the Database', async () => {
    const response = await users.SelectAll();
    const body = await response.json();
    expect(JSON.parse(body.content)).toEqual([{name: 'jean'},{name: 'marie'}]);
});