"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("../config/passport");
const Users_1 = require("../entities/Users");
const express_1 = __importDefault(require("express"));
const router = express_1.default();
passport_2.initializePassport((username) => Users_1.User.findOne({ username: username }), (id) => Users_1.User.findOne(id));
router.post("/", passport_1.default.authenticate("local"), (req, res) => {
    console.log("Aurh");
    res.send(req.user);
});
exports.default = router;
//# sourceMappingURL=login.js.map