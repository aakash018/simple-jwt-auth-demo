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
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LocalStrategy = passport_local_1.default.Strategy;
const initializePassport = (getUserByUsername, getUserById) => {
    const auth = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield getUserByUsername(username);
        if (user == null) {
            console.log("Null");
            return done(null, false, { message: "No User" });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return done(null, false, { message: "Wrong Password" });
        }
        done(null, user);
    });
    passport_1.default.use(new LocalStrategy((auth)));
    passport_1.default.serializeUser((user, done) => done(null, user.id));
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () { return done(null, yield getUserById(id)); }));
};
exports.initializePassport = initializePassport;
//# sourceMappingURL=passport.js.map