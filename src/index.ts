import {Client} from "pg"

const client = new Client({
    user: "postgres",
    password: "Thisisme@123",
    host: "localhost",
    port: 5432,
    database: "test"
})
const main = async () => {
    try{
    await client.connect()
    console.log("Connected")
    const data = await client.query("SELECT * FROM strict_student WHERE name = $1", ["Joe"])
    console.table(data.fields)
    client.end()
    } catch {
        console.error("Error Connectiong to DB")
    }
}

main();
