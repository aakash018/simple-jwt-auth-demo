import { Post } from "./entities/Post";
import { User } from "./entities/Users"
import  { MikroORM }  from "@mikro-orm/core"
import path from 'path';
export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.ts|.js$/, // regex pattern for the migration files
    },
    entities: [Post, User],
    dbName: 'blood_bank',
    user: 'postgres',
    password: 'Thisisme@123',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production'
} as Parameters<typeof MikroORM.init>[0];
