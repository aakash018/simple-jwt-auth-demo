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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "postgres",
    password: "Thisisme@123",
    host: "localhost",
    port: 5432,
    database: "test"
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected");
        const data = yield client.query("SELECT * FROM strict_student WHERE name = $1", ["Joe"]);
        console.table(data.fields);
        client.end();
    }
    catch (_a) {
        console.error("Error Connectiong to DB");
    }
});
main();
//# sourceMappingURL=index.js.map