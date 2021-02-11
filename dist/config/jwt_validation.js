"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        res.send("Not Auth");
    }
    else {
        const token = header.split(" ")[1];
        jsonwebtoken_1.default.verify(token, "key", (err, decoded) => {
            if (err) {
                res.send("Not Auth");
                return console.log("Validate Err " + err);
            }
            else {
                console.log(decoded);
                next();
            }
        });
    }
};
exports.validate = validate;
//# sourceMappingURL=jwt_validation.js.map