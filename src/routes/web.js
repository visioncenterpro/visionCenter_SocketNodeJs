const Conn = require('../models/DB/DB')

let Db = new Conn();
module.exports = (app, io)=>{
    app.get('/to_call', (req, res) => {
         res.json({resp:'Llamando desde asterisk'});
    });

    app.post('/test', async (req, res) => {
        console.log(req.body);
        
        let request = await Db.getResuqestBystatus(req.body.id_request_sd, req.body.statuses_id);
        let document = await Db.getDocumentByRequestId(req.body.id_request_sd);

        
        let resp = {
            id_request_sd:req.body.id_request_sd,
            message: "La solicitud no existe."
        }
        if(request.length >0){
            request[0].document = document
            resp =request[0]
        }

       
        res.json({
            trasactions:{
                status_token: "OK"
            },
            data:[
                resp
            ]
            
        });
    });
    
}