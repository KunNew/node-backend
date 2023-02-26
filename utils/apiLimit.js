import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: 'Limit each IP to 100 requests per `window` (here, per 15 minutes)'
})

export default apiLimiter;