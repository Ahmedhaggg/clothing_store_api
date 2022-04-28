let router = require("express").Router();
let adminAuthController = require("../../controllers/admin/auth.admin.controller");
let adminAuthValidation = require("../../validation/admin/auth.admin.validation");
let use = require("../../middlewares/useMiddleware");
const checkValidationError = require("../../middlewares/checkValidationError");

  
/** 
* @swagger
*   components:
*       schemas:
*           admin:
*               type: object
*               required:
*                   - email
*                   - password
*               properties:
*                   id:
*                       type: integer
*                   email:
*                       type: string
*                   password:
*                       type: string
*               example:
*                   email: ahmedhaggag@gmail.com
*                   password: ahmed123
*
*/

/** 
 * @swagger
 *  /admin/auth/login:
 *      post: 
 *          tags: [admin auth]
 *          summary: admin login with email and password
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/admin"
 *          responses: 
 *              200: 
 *                  description: success login
 *              500: 
 *                  description: something went wrong
 *              400: 
 *                  description: email or password is incorrect
 *          
*/
router.post("/login", 
    adminAuthValidation.validate("login"),
    checkValidationError,
    use(adminAuthController.login)
);

router.post("/register", 
    use(adminAuthController.register)
);

module.exports = router;