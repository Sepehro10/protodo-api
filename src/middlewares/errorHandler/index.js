module.exports = (err, _req, res, _next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode).json({
        success: false,
        msg: err.message,
        code: err.code,
        meta: err.meta,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack?.split('\n')
    })
}
