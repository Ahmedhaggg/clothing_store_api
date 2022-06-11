let cron = require("node-cron");
let userService = require("../../services/admin/user.admin._service");
let sendEmail = require("../sendEmail");
let { CLIENT_URL } = require("../../config/index");

cron.schedule("0 0 1 * *", async () => {
    try {
        let LoggedUserMonthAgo = await userService.getUsersLoggedMonthAgo();

        LoggedUserMonthAgo.forEach(async user => await sendEmail({
            to: user.email,
            subject: `${user.firstName}, welcome to clothing Store`,
            html: `
                <p>Hi Ahmed, Long time no see. You can see the new offers and discounts that you are doing in order to satisfy our customers</p>
                <div>
                    <span> 
                        please click <a href="${CLIENT_URL}"}>${CLIENT_URL}</a>
                    </span>
                </div>
            `
        }))
    } catch (error) {
        console.log(error)
    }

});