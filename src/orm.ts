// import { MikroORM } from "@mikro-orm/core";
// import microORM_config from "./mikro-orm.config"
import {createConnection} from "typeorm"
import { Post } from "./entities/Post"
import { User } from "./entities/Users"
// import { Post } from "./entities/Post";
// import { User } from "./entities/Users";
// export const orm_init = MikroORM.init(microORM_config)

export const typeorm = createConnection({
    type: 'postgres',
    url: process.env.PSQL_URI,
    entities: [Post, User],
    synchronize: true,
})