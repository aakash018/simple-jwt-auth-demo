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
const Post_1 = require("../entities/Post");
const router = express_1.default();
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.Post.find();
    res.send(post);
}));
router.get("/my_post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    console.log(req.query);
    const result = yield typeorm_1.getConnection()
        .getRepository(Post_1.Post)
        .createQueryBuilder("p")
        .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
        .select(['u.username', 'p.id', 'p.title', 'p.body', 'u.email'])
        .where("u.username = :username", { username: name })
        .getMany();
    if (result === null) {
        return res.json({ message: "No Data Found" });
    }
    return res.send(result);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const result = yield Post_1.Post.create(input).save();
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=post.js.map