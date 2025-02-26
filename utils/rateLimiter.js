import expressRateLimiter from 'express-rate-limit';

export const apiRateLimiter = expressRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 10,
    keyGenerator: (req) => {
        return req.ip;
    },
    handler: async(req, res, next, options) => {
        return res.status(429).json({
            error: 'Too many requests',
            message: 'Too many requests, please try again after few minutes.',
        });
    },
});