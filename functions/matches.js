require('dotenv').config()

const fetch = require('node-fetch')
const Redis = require('ioredis')

const redis = new Redis({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOSTNAME,
	password: process.env.REDIS_PASSWORD,
})

const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

exports.handler = async (event, context) => {
	try {
		const cachedResult = await redis.get('matches')

		if (cachedResult) {
			console.log('CACHE GROUPS')

			return {
				statusCode: 200,
				body: JSON.stringify(JSON.parse(cachedResult)),
			}
		}

		const response = await fetch(`${apiUrl}/competitions/WC/matches`, {
			method: 'GET',
			headers: {
				'X-Auth-Token': apiKey,
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		redis.set('matches', JSON.stringify(data), 'EX', 59)

		console.log('FRESH GROUPS')

		return { statusCode: 200, body: JSON.stringify(data) }
	} catch (error) {
		console.log(error)

		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed fetching data' }),
		}
	}
}
