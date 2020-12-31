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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./api/signup"));
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./entities/Post");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const app = express_1.default();
const PORT = 5000;
app.get("/", (_, res) => {
    res.json({ status: "running", message: "Server is Running" });
});
const orm_INIT = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const PostRepo = orm.em.getRepository(Post_1.Post);
    const postoutput = yield PostRepo.find({ title: /%/ }, {
        limit: 10,
        orderBy: { title: 'DESC' }
    });
    console.table(postoutput);
});
orm_INIT();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/signup", signup_1.default);
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});
//# sourceMappingURL=index.js.map