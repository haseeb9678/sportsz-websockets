import rateLimit from "express-rate-limit"

export const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 100,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many request. Plz try again later"
    }
})