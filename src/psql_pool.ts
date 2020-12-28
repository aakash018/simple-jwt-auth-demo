import {Pool} from "pg";

export const pool = new Pool({
    connectionString: process.env.PSQL_URI,
})
