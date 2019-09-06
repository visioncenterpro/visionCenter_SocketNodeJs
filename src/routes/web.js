module.exports = (app)=>{
    app.get('/camera', (req, res)=>{
        res.render( 'camera')
    })
}