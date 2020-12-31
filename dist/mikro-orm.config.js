"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const Users_1 = require("./entities/Users");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.ts|.js$/,
    },
    entities: [Post_1.Post, Users_1.User],
    dbName: 'blood_bank',
    user: 'postgres',
    password: 'Thisisme@123',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production'
};
//# sourceMappingURL=mikro-orm.config.js.map