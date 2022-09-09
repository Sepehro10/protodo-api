module.exports =  (req, res) => {
    res.status(404).json({ '🔍': 'Not Found!', msg: '404', endpoint: req.originalUrl, success: false })
}
