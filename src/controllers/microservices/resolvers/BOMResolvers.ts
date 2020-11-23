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
                    });

                    return logisticsList;
        
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

                        dispatchObject = JSON.parse(JSON.stringify((queryResult[0])[0]));
                        dispatchObject.dispatch_logistics = [];

                    });


                    await knexConnection.raw('SELECT visioncenter_logistics.id_visioncenter_logistics, visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person FROM visioncenter_dispatches_logistics, visioncenter_logistics WHERE visioncenter_dispatches_logistics.fk_visioncenter_dispatches_dis_log = '+dispatchObject.id_visioncenter_dispatches+' AND visioncenter_logistics.id_visioncenter_logistics = visioncenter_dispatches_logistics.fk_visioncenter_logistics_dis_logistics').then(function(logisticsResult) {

                        logisticsResult[0].forEach(function(logis) {
                            dispatchObject.dispatch_logistics.push(Object.assign({}, JSON.parse(JSON.stringify(logis))));
                        })

                    });

                    return dispatchObject;

                },
                async getMaterialsStructures(root, material) {

                    let materials_structures = [];

                    let knexConnection = await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw('SELECT visioncenter_materials_structure.id_materials_structure, fk_visioncenter_materials_materials_structure, visioncenter_materials_structure.name, visioncenter_materials_structure.description, visioncenter_materials_structure.orientation, visioncenter_materials_structure.amplitude, visioncenter_materials_structure.height, visioncenter_materials_structure.shape, visioncenter_materials_structure.qty_meter, visioncenter_materials_structure.caliber FROM visioncenter_materials_structure WHERE visioncenter_materials_structure.fk_visioncenter_materials_materials_structure = '+material.id_visioncenter_materials+' ORDER BY visioncenter_materials_structure.id_materials_structure').then(function(materials_structures) {

                            if(materials_structures[0].length > 0) {

                                materials_structures = materials_structures[0];

                            }
    
                    });

                    return materials_structures;

                },
                async getMaterials(root) {

                    let materials_list = [];

                    let knexConnection = await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw('SELECT visioncenter_materials.id_visioncenter_materials, visioncenter_materials.name, visioncenter_materials.transparency_percent, visioncenter_materials.water_resistance_percent, visioncenter_materials.acid_resistance_percent, visioncenter_materials.temperature_sealed, visioncenter_materials.ripped_resistance_percent, visioncenter_materials.printing FROM visioncenter_materials ORDER BY visioncenter_materials.name ASC').then(function(materials) {

                        // console.log('ppppp', (queryResult[0])[0]);

                        materials[0].forEach(function(material) {
                            
                            let material_complete = Object.assign({}, JSON.parse(JSON.stringify(material)));
                            material_complete.material_structure = async function() {

                                let material_structure = [];

                                await knexConnection.raw('SELECT visioncenter_materials_structure.id_materials_structure, fk_visioncenter_materials_materials_structure, visioncenter_materials_structure.name, visioncenter_materials_structure.description, visioncenter_materials_structure.orientation, visioncenter_materials_structure.amplitude, visioncenter_materials_structure.height, visioncenter_materials_structure.shape, visioncenter_materials_structure.qty_meter, visioncenter_materials_structure.caliber FROM visioncenter_materials_structure WHERE visioncenter_materials_structure.fk_visioncenter_materials_materials_structure = '+material_complete.id_visioncenter_materials+' ORDER BY visioncenter_materials_structure.id_materials_structure').then(function(materials_structures) {
                                    // console.log('ppppp', (queryResult[0])[0]);
        
                                    if(materials_structures[0].length > 0) {
        
                                        material_structure = materials_structures[0];
        
                                    }
            
                                });

                                return material_structure;
                            }
                            materials_list.push(material_complete);

                        });

                    });

                    return materials_list;

                },
                async getAckComponentBOM(root, {ackComponent})  {

                    let productLine = {id_products_lines: 0, empty: true, BOM: []};
                    let ack_component_BOM = [];

                    let knexConnection = await Knex({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw('SELECT visioncenter_products_lines.id_products_lines, visioncenter_products.id_visioncenter_products, visioncenter_products.fk_products_groups, visioncenter_products.code, visioncenter_products.description, visioncenter_products.CODE, visioncenter_products.code_erp FROM visioncenter_products, visioncenter_products_lines WHERE visioncenter_products.CODE = \''+ackComponent.component_code+'\' AND visioncenter_products_lines.fk_products_products_lines = visioncenter_products.id_visioncenter_products').then(function(productLineRelated) {

                        if(productLineRelated[0].length > 0) {

                            productLine = Object.assign({}, JSON.parse(JSON.stringify((productLineRelated[0])[0])))
                            productLine.empty = false;


                        }

                    });

                    if(!productLine.empty) {

                        await knexConnection.raw('SELECT visioncenter_products.id_visioncenter_products, visioncenter_productlines_bom.fk_product_line_piece_productline_bom, visioncenter_products.fk_products_groups, visioncenter_products.code, visioncenter_products.description, visioncenter_products.code_erp, visioncenter_products.created_at, visioncenter_products.updated_at, visioncenter_productlines_bom.qty FROM visioncenter_productlines_bom, visioncenter_products_lines, visioncenter_products WHERE visioncenter_productlines_bom.fk_product_line_productline_bom = '+productLine.id_products_lines+' AND visioncenter_products_lines.id_products_lines = visioncenter_productlines_bom.fk_product_line_piece_productline_bom AND visioncenter_products.id_visioncenter_products = visioncenter_products_lines.fk_products_products_lines').then(function(LMAT) {

                            if(LMAT[0].length > 0) {

                                // let attributes = async function() {

                                //     let at = [];

                                //     await knexConnection.raw('SELECT visioncenter_products_attribute.* FROM visioncenter_products_characteristics, visioncenter_products_types, visioncenter_products_attribute  WHERE visioncenter_products_characteristics.fk_products_lines_charac = 882 AND visioncenter_products_attribute.fk_characteristics = visioncenter_products_characteristics.id_products_characteristics AND visioncenter_products_types.id_products_types = visioncenter_products_characteristics.fk_products_types_characteristics').then(function(attr) {

                                //         if(attr[0].length > 0) {

                                //             at.push()

                                //         }

                                //     });

                                // }
    
                                ackComponent.BOM = LMAT[0];
    
                            }
    
                        });

                        await ackComponent.BOM.forEach(function(bom) {

                            bom.attributes = async function() {

                                let aaa = [];

                                await knexConnection.raw('SELECT visioncenter_products_attribute.id_products_attribute, visioncenter_products_attribute.fk_characteristics, visioncenter_products_attribute.fk_products_attributes_types, visioncenter_products_attribute.name, visioncenter_products_attribute.description, visioncenter_products_attribute.value, visioncenter_products_attribute.created_at, visioncenter_products_attribute.updated_at FROM visioncenter_products_characteristics, visioncenter_products_types, visioncenter_products_attribute  WHERE visioncenter_products_characteristics.fk_products_lines_charac = '+bom.fk_product_line_piece_productline_bom+' AND visioncenter_products_attribute.fk_characteristics = visioncenter_products_characteristics.id_products_characteristics AND visioncenter_products_types.id_products_types = visioncenter_products_characteristics.fk_products_types_characteristics ORDER BY visioncenter_products_attribute.name ASC').then(function(attr) {

                                    console.log(attr[0]);

                                    if(attr[0].length > 0) {

                                        aaa = attr[0];

                                    }

                                });

                                return aaa;

                            };

                        });

    
                    }

                    // console.log(ackComponent.BOM);

                    return ackComponent.BOM;
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