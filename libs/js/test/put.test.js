const stor = require("../stor.js");

Stor = new stor.Stor("http://90.109.132.10:8080", "password");

let users = Stor.Table("test");

it("Change a champ in the tabl", async () => {
    const response = await users.Put('name', 'marie', 'marie');
    const body = await response.text();
    expect(JSON.parse(body)).toEqual({"n": 1, nModified: 0, ok: 1});
});