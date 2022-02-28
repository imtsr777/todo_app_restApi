import pg from 'pg'

const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})
// console.log({user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT
// })

export default (req, res, next) => {
    req.fetch = async function (query, ...params) {
		const client = await pool.connect()
		try {
            
			const { rows } = await client.query(query, params.length ? params : null)
            
			return rows
		} 
		catch(error){
			return res.status(400).json({message:error})
		}
		finally {
			client.release()
		}
	}

	return next()
}