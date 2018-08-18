const stor = require("../stor");

const Stor = new stor.Stor("http://localhost:8080", "password");

let users = Stor.Table("test");

it("Select all where", async () => {
    const response = await users.Get("name", "jean");
    const body = await response.text();
    expect(JSON.parse(body)).toEqual({name: 'jean'});
});
