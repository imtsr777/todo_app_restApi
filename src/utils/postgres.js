import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database:process.env.PG_DATABASE,
})

async function fetch(query, ...params) {
    const client = await pool.connect()
    try {
        const { rows: [row] } = await client.query(query, params.length ? params : null)
        return row
    } catch (error) {
        console.log(error)
    }
}

async function fetchAll(query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } catch (error) {
        console.log(error)
    }
}

export default {
    fetchAll,
    fetch
}