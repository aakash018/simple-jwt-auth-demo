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
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./api/signup"));
const login_1 = __importDefault(require("./api/login"));
const post_1 = __importDefault(require("./api/post"));
const typeorm_1 = require("typeorm");
const Users_1 = require("./entities/Users");
const Post_1 = require("./entities/Post");
const app = express_1.default();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (_, res) => {
    res.json({ status: "running", message: "Server is Running" });
});
const typeORM = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: 'postgres',
            url: process.env.PSQL_URI,
            logging: true,
            entities: [Users_1.User, Post_1.Post],
            synchronize: true,
        });
        console.log("Connected to DB");
    }
    catch (e) {
        console.error(e);
    }
});
typeORM();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/signup", signup_1.default);
app.use("/api/login", login_1.default);
app.use("/api/post", post_1.default);
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});
//# sourceMappingURL=index.js.map