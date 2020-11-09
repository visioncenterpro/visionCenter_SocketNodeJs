const Knex = require("knex");

class BOMResolvers {

    constructor() {

   
         
    }
    
    getResolver() {

        return {

            Query:  {

                async getLogistics(root, {id_visioncenter_logistics}) {

                    let logisticsList = [];
                    await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } }).raw('SELECT visioncenter_logistics.id_visioncenter_logistics, visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person FROM visioncenter_logistics ORDER BY visioncenter_logistics.company_name ASC').then((queryResult) => {
                          logisticsList = JSON.parse(JSON.stringify((queryResult[0])));
                        //   console.log('plaz', JSON.parse(JSON.stringify((queryResult[0]))));
                    });

                    return logisticsList;

                    // return Knex({ client: "mysql", connection: {
                    //     host : '127.0.0.1',
                    //     user : 'root',
                    //     password : '',
                    //     database : 'visioncenter'
                    // } }).select().from('visioncenter_projects').limit(10);
        
                },
                async getDispatch(root, idDispatch) {

                    let dispatchObject = {
                        id_visioncenter_dispatches: 0,
                        dispatch_logistics: []

                    };

                    let knexConnection = await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });
                    await knexConnection.raw('SELECT visioncenter_delivery.id_visioncenter_delivery, visioncenter_delivery.fk_delivery_subprojects, visioncenter_delivery.created_at, visioncenter_dispatches.id_visioncenter_dispatches, visioncenter_dispatches.fk_visioncenter_users, visioncenter_dispatches.fk_visioncenter_delivery_visioncenter_dispatches, visioncenter_dispatches.created_at FROM visioncenter_delivery, visioncenter_dispatches WHERE visioncenter_dispatches.id_visioncenter_dispatches = 11 AND visioncenter_dispatches.fk_visioncenter_delivery_visioncenter_dispatches = visioncenter_delivery.id_visioncenter_delivery').then(function(queryResult) {

                        // console.log('ppppp', (queryResult[0])[0]);
                        dispatchObject = JSON.parse(JSON.stringify((queryResult[0])[0]));
                        dispatchObject.dispatch_logistics = [];
                    });


                    await knexConnection.raw('SELECT visioncenter_logistics.id_visioncenter_logistics, visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person FROM visioncenter_dispatches_logistics, visioncenter_logistics WHERE visioncenter_dispatches_logistics.fk_visioncenter_dispatches_dis_log = '+dispatchObject.id_visioncenter_dispatches+' AND visioncenter_logistics.id_visioncenter_logistics = visioncenter_dispatches_logistics.fk_visioncenter_logistics_dis_logistics').then(function(logisticsResult) {

                            // console.log(JSON.parse(JSON.stringify((logisticsResult[0])[indexLogistic])));
                            // JSON.parse(JSON.stringify((logisticsResult[0]))).forEach(function(logisticRelated) {
                                // console.log('pi', JSON.parse(JSON.stringify((logisticsResult[0])[0])));
                                dispatchObject.dispatch_logistics.push(Object.assign({}, JSON.parse(JSON.stringify((logisticsResult[0])[0]))));

                            // });
                            
                    });


                        console.log('pi', dispatchObject);



                    return dispatchObject;

                },
                getBOM(root, args)  {
        
                    return 'hola de nuevo '+args.name;
                },
                greet() {
                    return 0
                },
                getProducts() {
                    return [{
                        id: 20,
                        id_visioncenter_products: 12
                    },
                    {
                        id:21,
                        id_visioncenter_products: 13
                    }]
                }
            },
        
            Mutation: {

                createProduct(root , {input}) {

                    Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } }).raw('SELECT * from visioncenter_projects limit 1').then((queryResult) => {
                          console.log('plaz', JSON.parse(JSON.stringify((queryResult[0])[0])));
                      });

                    return [{
                        id_visioncenter_projects: 90
                    }]
                    
                },
                async createNewLogistics(root, {input}) {

                    await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } }).raw("INSERT INTO visioncenter_logistics(visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person) VALUES("+input.logistic_type.id_logistics_types+", '"+input.company_name+"', '"+input.company_nit+"', '"+input.contact_person+"', '"+input.mobile_contact_person+"')").then((queryResult) => {
                          console.log('OK', queryResult[0]);
                      });

                        let logisticsList = [];
                        await Knex({ client: "mysql2", connection: {
                            host : '127.0.0.1',
                            user : 'root',
                            password : 'betabeta',
                            database : 'visioncenter'
                        } }).raw('SELECT visioncenter_logistics.id_visioncenter_logistics, visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person FROM visioncenter_logistics ORDER BY visioncenter_logistics.company_name ASC').then((queryResult) => {
                            logisticsList = JSON.parse(JSON.stringify((queryResult[0])));
                            //   console.log('plaz', JSON.parse(JSON.stringify((queryResult[0]))));
                        });

                    return logisticsList
                },
                async createDispatch(root, {input}) {

                    let idNewDelivery, idOwner, idNewDispatch;

                    let knexConnection = await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw("INSERT INTO visioncenter_delivery(visioncenter_delivery.fk_delivery_subprojects, created_at) VALUES(NULL, NOW())").then((queryResult) => {
                    });

                    await knexConnection.raw('SELECT MAX(visioncenter_delivery.id_visioncenter_delivery) AS idNewDelilvery FROM visioncenter_delivery').then((queryResult) => {
                        idNewDelivery = (queryResult[0])[0].idNewDelilvery;
                        idOwner = input.fk_visioncenter_users;
                    });

                    await knexConnection.raw('INSERT INTO visioncenter_dispatches(visioncenter_dispatches.fk_visioncenter_users, visioncenter_dispatches.created_at, fk_visioncenter_delivery_visioncenter_dispatches) VALUES('+idOwner+', NOW(), '+idNewDelivery+')').then((queryResult) => {
                    });

                    await knexConnection.raw('SELECT MAX(visioncenter_dispatches.id_visioncenter_dispatches) AS idNewDispatch FROM visioncenter_dispatches').then((queryResult) => {
                        idNewDispatch = (queryResult[0])[0].idNewDispatch;
                    });

                    await input.dispatch_remission.forEach((remission) => {

                        knexConnection.raw('INSERT INTO visioncenter_dispatches_remission(visioncenter_dispatches_remission.fk_visioncenter_dispatches_vi_dispat_remission, visioncenter_dispatches_remission.quantity, visioncenter_dispatches_remission.type, visioncenter_dispatches_remission.type_client, visioncenter_dispatches_remission.project_name_construction, visioncenter_dispatches_remission.name, visioncenter_dispatches_remission.id_subprojects_products, visioncenter_dispatches_remission.complete_product_production_delivery) VALUES('+idNewDispatch+', '+remission.quantity+', \''+remission.type+'\', \''+remission.type_client+'\', \''+remission.project_name_construction+'\', \''+remission.name+'\', '+remission.id_subprojects_products+', '+remission.complete_product_production_delivery+')').then((queryResult) => {
                            
                        });
    
                    });

                    await input.dispatch_logistics.forEach((logis) => {

                        knexConnection.raw('INSERT INTO visioncenter_dispatches_logistics(visioncenter_dispatches_logistics.fk_visioncenter_dispatches_dis_log, visioncenter_dispatches_logistics.fk_visioncenter_logistics_dis_logistics, visioncenter_dispatches_logistics.created_at) VALUES('+idNewDispatch+', '+logis.id_visioncenter_logistics+', NOW())').then((queryResult) => {
                            
                            logis.logistics_providers_machines.forEach((machine) => {
                                knexConnection.raw('INSERT INTO visioncenter_logistics_machines(visioncenter_logistics_machines.fk_visioncenter_logistics_logistics_machines, visioncenter_logistics_machines.reference, visioncenter_logistics_machines.capacity_weight, visioncenter_logistics_machines.capacity_volume, visioncenter_logistics_machines.description) VALUES('+logis.id_visioncenter_logistics+', \''+machine.reference+'\', '+machine.capacity_weight+', '+machine.capacity_volume+', '+machine.description+')').then((s) => {

                                });
                            })
                        });
    
                    });

                    // await input.dispatch_novelties.forEach((novelty) => {

                    //     knexConnection.raw('INSERT INTO visioncenter_dispatches_novelties(visioncenter_dispatches_novelties.fk_dispatch_remision_dispatches_novelties, visioncenter_dispatches_novelties.created_at, visioncenter_dispatches_novelties.description, visioncenter_dispatches_novelties.novelty_type) VALUES('+novelty.fk_dispatch_remision+', NOW(), \''+novelty.description+'\', '+novelty.novelty_type.id+')').then((queryResult) => {
                            
                    //     });
    
                    // });
                    


                    return { id_visioncenter_delivery: idNewDelivery};
                },


            }
     
        }

    }
   
}

module.exports = BOMResolvers;