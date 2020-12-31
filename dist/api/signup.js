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
const psql_pool_1 = require("../psql_pool");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default();
router.post("/", (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const hasedPass = yield bcrypt_1.default.hash(password, 12);
    yield psql_pool_1.pool.query("INSERT INTO users (username, info, email) VALUES ($1, $2, $3)", [username, hasedPass, email]);
    const data = yield psql_pool_1.pool.query("SELECT * FROM users");
    console.table(data.rows);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map