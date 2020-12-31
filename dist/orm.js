"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeorm = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const Users_1 = require("./entities/Users");
exports.typeorm = typeorm_1.createConnection({
    type: 'postgres',
    url: process.env.PSQL_URI,
    entities: [Post_1.Post, Users_1.User],
    synchronize: true,
});
//# sourceMappingURL=orm.js.map