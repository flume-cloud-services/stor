const stor = require("../stor.js");

Stor = new stor.Stor("http://localhost:8080", "password");

let users = Stor.Table("test");
    
it('Create a Database', async () => {
    expect.assertions(1);
    const response = await users.Init([{name: 'jean'},{name: 'marie'}]);
    const body = await response.text();
    expect(body).toEqual("Database already exists");
});