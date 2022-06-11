let cron = require("node-cron");
let userService = require("../../services/admin/user.admin._service");

cron.schedule("0 0 * * sunday", async () => {
    try {
        let anonymousUsers = await userService.getUsers({ verified: false }, ["id"]);
    
        let anonymousUsersIdList = anonymousUsers.map(user => user.id);

        await userService.deleteUser({ id: anonymousUsersIdList });
    } catch (error) {
        console.log(error)
    }
});
