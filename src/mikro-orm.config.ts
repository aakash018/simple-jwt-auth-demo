import { Post } from "./entities/Post";
import  {MikroORM}  from "@mikro-orm/core"
import path from 'path';
export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: 'blood_bank',
    user: 'postgres',
    password: 'Thisisme@123',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production'
} as Parameters<typeof MikroORM.init>[0];
