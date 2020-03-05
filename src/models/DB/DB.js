const Sequelize = require('sequelize')
const {db} = require('../config')
class Db {
    constructor(sequelize) {
        this.sequelize = new Sequelize(db.dbname, db.username, db.password, {
            host: db.host,
            dialect:db.dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        });
    }
    close() {
        this.sequelize.close()
    }

    async getResuqestBystatus(id_request_sd, statuses_id){
        const query =  `select a.id_request_sd,a.date as date_created,a.license_plate,a.dispatch_date
        ,a.quantity_packages,b.description as vehicle_type,
		  b.max_weight AS document,a.id_status,c.description as description_status 
		  
        FROM dis_request_sd a
        inner join sys_status c ON a.id_status = c.id_status
        INNER JOIN dis_weight_vehicle b ON  a.id_weight_vehicle = b.id_weight_vehicle
        where a.id_request_sd=${id_request_sd} and a.id_status in (${statuses_id})
        ORDER BY a.id_request_sd limit 1`


        
        
        //'SELECT * from ws_message_movil
       // WHERE id_request_sd=5 AND id_status=1'
        let result = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT
        })
        return result
    }

    async getDocumentByRequestId(id_request_sd){
        const query =  `SELECT D.order, D.client FROM dis_remission D 
        WHERE D.id_request_sd = ${id_request_sd}
        GROUP BY D.order , D.client`
        let result = await this.sequelize.query(query, {
            type: this.sequelize.QueryTypes.SELECT
        })

       
        let data = []
        // "20298 - PALACIO OFIC DE CONSTRUCCIONES SA",
        result.map(q=>{
            data.push( `${q.order} - ${q.client}`)
        })

        return data
    }
}

module.exports =   Db

//Ing está ?
