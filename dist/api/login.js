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
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("../config/passport");
const Users_1 = require("../entities/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const router = express_1.default();
passport_2.initializePassport((username) => Users_1.User.findOne({ username: username }), (id) => Users_1.User.findOne(id));
router.post("/", passport_1.default.authenticate("local"), (req, res) => {
    res.send(req.user);
});
const expiringTime = 60;
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
router.post("/jwt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const response = yield Users_1.User.findOne({ username: username });
    if (response) {
        const user = {
            username: response.username,
            password: response.password,
            email: response.email,
            id: response.id
        };
        if (yield bcrypt_1.default.compare(password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ uid: user.id }, 'key', { expiresIn: expiringTime });
            res.cookie('refresh-token', (jsonwebtoken_1.default.sign({ username: user.username }, 'refKey')), {
                httpOnly: true,
                maxAge: 100 * 60 * 60 * 12 * 24 * 10
            });
            res.json({ token: token, expiringTime: expiringTime });
        }
        else {
            res.send("Wrong Password!");
        }
    }
    else {
        res.send("Error");
    }
}));
router.get("/refresh-token", (req, res) => {
    const token = req.headers.cookie;
    if ((token === null || token === void 0 ? void 0 : token.split("=")[0]) === "refresh-token") {
        jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.split("=")[1], "refKey", (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return console.error(err);
            }
            const { username } = decode;
            const response = yield Users_1.User.findOne({ username: username });
            if (response) {
                const new_token = jsonwebtoken_1.default.sign({ uid: response.id }, 'key', { expiresIn: expiringTime });
                res.json({
                    token: new_token,
                    expiringTime: expiringTime,
                    username: response.username,
                    email: response.email,
                    id: response.id
                });
            }
        }));
    }
    else {
        res.status(403).json({ message: "Not Auth" });
        console.log("No Token Found");
    }
});
router.get("/data", validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const response = yield Users_1.User.findOne({ username: username });
    if (response) {
        const user = {
            username: response.username,
            password: response.password,
            email: response.email,
            id: response.id
        };
        res.send(user);
    }
}));
router.get("/test-data", validate, (_, res) => {
    console.log("Hello");
    res.send("You got data");
});
exports.default = router;
//# sourceMappingURL=login.js.map