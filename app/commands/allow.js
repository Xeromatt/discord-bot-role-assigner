const Core = require("../../core");
const Internal = require("../internals/role-management.js");

module.exports = new Core.Command({
    name: "allow",
    description: "Allow users to assign a role to themselves",
    syntax: "allow <rolename>",
    admin: true,
    invoke: invoke
});

function invoke({ message, params, guildData }) {
    return new Promise((resolve, reject) => {
        const normalisedName = Internal.normaliseRoleName(params[0]);

        //check if we can find the role in the guild
        if (message.guild.roles.find(x => Internal.normaliseRoleName(x.name) === normalisedName)) {
            if (!guildData.allowedRoles.includes(normalisedName)) {
                guildData.allowedRoles.push(normalisedName);
                resolve("Role now allowed!");
            }
            else
                resolve("Role already allowed!");
        }
        else
            reject(`Unable to find role ${normalisedName} in guild ${message.guild.name}`);
    });
}