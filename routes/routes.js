const UserController = require("../controllers/UserController");

module.exports = {

    "/say" : {clz: UserController, method: "say", type: "GET"} // 待添加前置处理，拦截，预处理，后置处理器等

}