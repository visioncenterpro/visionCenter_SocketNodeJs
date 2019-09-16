module.exports = (app)=>{
    app.get('/to_call', (req, res) => {
         res.json({resp:'Llamando desde asterisk'});
    });
}