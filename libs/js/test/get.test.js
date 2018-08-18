const stor = require("../stor");

const Stor = new stor.Stor("http://90.109.132.10:8080", "password");

let users = Stor.Table("test");

it("Select all where", async () => {
    const response = await users.Get("name", "marie");
    const body = await response.text();
    expect(JSON.parse(body)).toEqual({name: 'marie'});
});
