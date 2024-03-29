"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../entities/Users");
const uuid_1 = require("uuid");
const router = express_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const hasedPass = yield bcrypt_1.default.hash(password, 12);
    try {
        const result = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Users_1.User)
            .values({
            id: uuid_1.v4(),
            username: username,
            password: hasedPass,
            email: email,
        })
            .execute();
        res.send(result.raw);
    }
    catch (e) {
        if (e.code === '23505') {
            res.json({
                status: "error",
                message: "User already Exists..."
            });
        }
        else {
            console.error(e);
        }
    }
}));
exports.default = router;
//# sourceMappingURL=signup.js.map