const KnexAck = require("knex");

class AckComponentsResolvers {

    constructor() {

    }

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
                },
                async getAckComponentAdditionals(root, {ackComponent}) {

                    let ackComponentAdditionals = [];

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw("SELECT area, caliber, canto, component_code, component_code_special, component_description, component_name, deep, finished_left, finished_right, fk_ack_ack_styles, fk_ack_components_ack_additional, height, heightF, hinge_left, hinge_right, id_acknowledgement_additionals, mdf, observation, qty, rh, ruteos, slot_color, style_name, volume, weight_gross, weight_net, width, widthF FROM visioncenter_acknowledgement_additionals WHERE visioncenter_acknowledgement_additionals.fk_ack_components_ack_additional = "+JSON.parse(JSON.stringify(ackComponent)).idx_component).then((queryResult) => {

                        ackComponentAdditionals = queryResult[0];

                    });

                    return ackComponentAdditionals;
                    
                },
                async getAckComponentPackages(root, {ackComponent}) {

                    let ackComponentPackage = [];
                    let ackComponentPackages = [];

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw("SELECT DISTINCT visioncenter_productlines_packages.fk_visioncenter_packages_product_lines AS idComponentPackages FROM visioncenter_productlines_packages WHERE visioncenter_productlines_packages.fk_ack_components_productline_packages = "+JSON.parse(JSON.stringify(ackComponent)).idx_component).then(async (queryResult) => {
                        
                        if((queryResult[0]).length > 0) {

                            ackComponentPackage = (queryResult[0]);

                        }                     

                    });

                    await new Promise((resolve, reject) => {

                        ackComponentPackage.forEach(async (response) => {

                            await knexConnection.raw("SELECT visioncenter_packages.id_visioncenter_packages, visioncenter_materials.name AS material_name, visioncenter_materials_structure.description AS material_structure_name, visioncenter_packages.NAME, visioncenter_packages.CODE, visioncenter_packages.fk_packages_material_visioncenter_packages, visioncenter_packages.fk_packages_types_visioncenter_packages, visioncenter_packages.fk_packages_resistance_visioncenter_packages, visioncenter_packages.fk_packages_pallets_visioncenter_packages, visioncenter_packages.AREA, visioncenter_packages.deep, visioncenter_packages.height, visioncenter_packages.vol, visioncenter_packages.width FROM visioncenter_packages, visioncenter_packages_materials, visioncenter_materials, visioncenter_materials_structure WHERE visioncenter_packages.id_visioncenter_packages = "+JSON.parse(JSON.stringify(response)).idComponentPackages+" AND visioncenter_packages_materials.id_packages_materials = visioncenter_packages.fk_packages_material_visioncenter_packages AND visioncenter_materials.id_visioncenter_materials = visioncenter_packages_materials.fk_visioncenter_materials_packages_materials AND visioncenter_materials_structure.id_materials_structure = visioncenter_packages_materials.fk_materials_structure_packes_materials").then(async (queryResult2) => {
    
                                (queryResult2[0]).forEach((pa) => {

                                    ackComponentPackages.push(pa);

                                    if(ackComponentPackages.length === ackComponentPackage.length) {
                                        resolve(true);
                                    }

                                });
    
                            }); 
    
                        });
    
                    });

                    return ackComponentPackages;
                },
                async getAckPackages(root, {idAck}) {
                    
                    let ackComponentPackage = [];
                    let ackComponentPackages = [];
                    let productLine = {};

                    console.log(idAck[1]);

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });


                    await knexConnection.raw("SELECT distinct visioncenter_acknowledgement_packages.fk_visioncenter_packages_visioncenter_ack_packages as idComponentPackages FROM visioncenter_acknowledgement_packages WHERE visioncenter_acknowledgement_packages.fk_visioncenter_acknowledgement_visioncenter_packages = "+idAck[0]).then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            ackComponentPackage = (queryResult[0]);

                        }                     

                    });

                    await new Promise((resolve, reject) => {

                        ackComponentPackage.forEach(async (response) => {

                            let components = [];

                            await knexConnection.raw("SELECT visioncenter_acknowledgement_packages.fk_acknowledgement_components_vision_ack_packages AS id_acknowledgement_component, visioncenter_acknowledgement_components.component_code, visioncenter_acknowledgement_components.component_description, visioncenter_acknowledgement_components.qty, '' AS BOM  FROM visioncenter_acknowledgement_packages, visioncenter_acknowledgement_components WHERE visioncenter_acknowledgement_packages.fk_visioncenter_packages_visioncenter_ack_packages = "+JSON.parse(JSON.stringify(response)).idComponentPackages+" AND visioncenter_acknowledgement_components.id_acknowledgement_components = visioncenter_acknowledgement_packages.fk_acknowledgement_components_vision_ack_packages").then(async (queryResult2) => {
    
                                components = queryResult2[0];
    
                            }); 

                            await knexConnection.raw("SELECT visioncenter_packages.id_visioncenter_packages, visioncenter_materials.name AS material_name, visioncenter_materials_structure.description AS material_structure_name, visioncenter_packages.NAME, visioncenter_packages.CODE, visioncenter_packages.fk_packages_material_visioncenter_packages, visioncenter_packages.fk_packages_types_visioncenter_packages, visioncenter_packages.fk_packages_resistance_visioncenter_packages, visioncenter_packages.fk_packages_pallets_visioncenter_packages, visioncenter_packages.AREA, visioncenter_packages.deep, visioncenter_packages.height, visioncenter_packages.vol, visioncenter_packages.width FROM visioncenter_packages, visioncenter_packages_materials, visioncenter_materials, visioncenter_materials_structure WHERE visioncenter_packages.id_visioncenter_packages = "+JSON.parse(JSON.stringify(response)).idComponentPackages+" AND visioncenter_packages_materials.id_packages_materials = visioncenter_packages.fk_packages_material_visioncenter_packages AND visioncenter_materials.id_visioncenter_materials = visioncenter_packages_materials.fk_visioncenter_materials_packages_materials AND visioncenter_materials_structure.id_materials_structure = visioncenter_packages_materials.fk_materials_structure_packes_materials").then(async (queryResult2) => {
    
                                (queryResult2[0]).forEach((pa) => {

                                    pa.package_content = components;
                                    ackComponentPackages.push(pa);

                                    if(ackComponentPackages.length === ackComponentPackage.length) {
                                        resolve(true);
                                    }

                                });
    
                            }); 
    
                        });
    
                    });

                    let flag = 0;
                    let flag2 = 0;
                    let piecesTotal = 0;

                    await new Promise((resolve, reject) => {

                        ackComponentPackages.forEach(async(pack) => {

                            flag2++;

                            pack.package_content.forEach(async(comp) => {

                                comp.BOM = [];
                                comp.packages = [];
                                comp.additionals = [];
                                
                                await knexConnection.raw('SELECT visioncenter_products_lines.id_products_lines, visioncenter_products.id_visioncenter_products, visioncenter_products.fk_products_groups, visioncenter_products.code, visioncenter_products.description, visioncenter_products.CODE, visioncenter_products.code_erp FROM visioncenter_products, visioncenter_products_lines WHERE visioncenter_products.CODE = \''+comp.component_code+'\' AND visioncenter_products_lines.fk_products_products_lines = visioncenter_products.id_visioncenter_products').then(async(productLineRelated) => {
                                    
                                    productLineRelated[0].forEach(async(productLine) => {

                                        await knexConnection.raw('SELECT visioncenter_products.id_visioncenter_products, visioncenter_productlines_bom.fk_product_line_piece_productline_bom, visioncenter_products.fk_products_groups, visioncenter_products.code, visioncenter_products.description, visioncenter_products.code_erp, visioncenter_products.created_at, visioncenter_products.updated_at, visioncenter_productlines_bom.qty FROM visioncenter_productlines_bom, visioncenter_products_lines, visioncenter_products WHERE visioncenter_productlines_bom.fk_product_line_productline_bom = '+productLine.id_products_lines+' AND visioncenter_products_lines.id_products_lines = visioncenter_productlines_bom.fk_product_line_piece_productline_bom AND visioncenter_products.id_visioncenter_products = visioncenter_products_lines.fk_products_products_lines').then(async(LMAT) => {

                                            comp.BOM = LMAT[0];
                                            piecesTotal += comp.BOM.length;
                                            flag++;

                                            if(pack.package_content.length === flag && ackComponentPackages.length === flag2) {
                                                resolve(true);
                                            }
    
                                        });
    
                                    });
            
                                });
    
                            });

                        });

                    });

                    flag = 0;
                    flag2 = 0;
                    let flag3 = 0;
                    let flag4 = 0;

                    await new Promise((resolve, reject) => {

                        ackComponentPackages.forEach(async(pack) => {

                            flag2++;

                            pack.package_content.forEach(async(comp) => {

                                flag++;

                                await knexConnection.raw("SELECT visioncenter_acknowledgement_additionals.id_acknowledgement_additionals, visioncenter_acknowledgement_additionals.qty, visioncenter_acknowledgement_additionals.fk_ack_ack_styles, visioncenter_acknowledgement_additionals.fk_ack_components_ack_additional, visioncenter_acknowledgement_additionals.observation, visioncenter_acknowledgement_additionals.component_name, visioncenter_acknowledgement_additionals.component_code, visioncenter_acknowledgement_additionals.component_description, visioncenter_acknowledgement_additionals.style_name, visioncenter_acknowledgement_additionals.height, visioncenter_acknowledgement_additionals.width, visioncenter_acknowledgement_additionals.deep FROM visioncenter_acknowledgement_additionals WHERE visioncenter_acknowledgement_additionals.fk_ack_components_ack_additional = "+comp.id_acknowledgement_component).then(async(queryResult) => {

                                    comp.additionals = queryResult[0];
            
                                });

                                let item = [];

                                comp.BOM.forEach(async(piece) => {

                                    await knexConnection.raw('SELECT visioncenter_packages.id_visioncenter_packages, visioncenter_packages.name, visioncenter_packages.code, visioncenter_packages.fk_packages_material_visioncenter_packages, visioncenter_packages.fk_packages_types_visioncenter_packages, visioncenter_packages.fk_packages_resistance_visioncenter_packages, visioncenter_packages.fk_packages_pallets_visioncenter_packages, visioncenter_packages.area, visioncenter_packages.deep, visioncenter_packages.height, visioncenter_packages.vol, visioncenter_packages.width, \'\' as item FROM visioncenter_productlines_packages, visioncenter_packages WHERE visioncenter_productlines_packages.fk_product_lines_productlines_packages = '+piece.fk_product_line_piece_productline_bom+' AND visioncenter_productlines_packages.fk_ack_components_productline_packages = '+comp.id_acknowledgement_component+' AND visioncenter_packages.id_visioncenter_packages = visioncenter_productlines_packages.fk_visioncenter_packages_product_lines').then(async(PACK) => {

                                        let packageExist = '';
                                        let counter = 0;
                                        item.push(piece.fk_product_line_piece_productline_bom);

                                        comp.packages = PACK[0];
                                        comp.packages.forEach(async(pk) => {

                                            pk.item = item;
                
                                        });

                                        flag3++;
                                        if(piecesTotal === flag3 && pack.package_content.length === flag && ackComponentPackages.length === flag2) {
                                            resolve(true);
                                        }
            
                                    });



                                });

                            });

                        });

                    });

                    return ackComponentPackages;
                },
                async searchAckByOrderNum(root, {orderNum}) {
                    
                    let searchResult = []

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw("SELECT visioncenter_projects.id_visioncenter_projects, visioncenter_acknowledgements.id_visioncenter_acknowledgements, visioncenter_acknowledgements.fk_subprojects_products_ack, visioncenter_acknowledgements.reference, id_project_construction FROM visioncenter_acknowledgements, visioncenter_projects WHERE visioncenter_acknowledgements.reference LIKE '%"+orderNum+"%' AND visioncenter_acknowledgements.fk_visioncenter_projects_ack = visioncenter_projects.id_visioncenter_projects AND visioncenter_projects.id_visioncenter_projects = visioncenter_acknowledgements.fk_visioncenter_projects_ack").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            searchResult = (queryResult[0]);

                        }                     

                    });

                    return searchResult;

                }
            },
            Mutation: {

                updateAckComponentCharacteristics(root, {ackComponent}) {

                    KnexAck({ client: "mysql", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } }).raw('SELECT * from visioncenter_projects limit 1').then((queryResult) => {
                          console.log('plaz', JSON.parse(JSON.stringify((queryResult[0])[0])));
                      });

                    return ackComponent;

                },
                async updateAckComponent(root, {ackComponent}) {

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                      if(ackComponent.additionals.length > 0) {
                          
                        if(!JSON.parse(JSON.stringify((ackComponent.additionals[0]))).hasOwnProperty('fk_ack_components_ack_additional')) {

                            ackComponent.additionals.forEach(async (addit) => {

                                let product_line = addit.product_line[0];
                                let attri = addit.product_line[0].characteristics[0].attributes;
                                knexConnection.raw("INSERT INTO visioncenter_acknowledgement_additionals(fk_ack_ack_styles, fk_ack_components_ack_additional, observation, qty, component_name, component_code, component_description, style_name, height, width, deep, area, caliber, hinge_left, hinge_right, finished_left, finished_right, canto, slot_color, component_code_special, rh, mdf, ruteos, heightF, widthF, weight_net, weight_gross, volume) VALUES("+ackComponent.fk_ack_ack_styles+", "+ackComponent.idx_component+", '"+addit.reference+"', "+addit.qty+", '"+addit.name+"', '"+addit.code+"', '"+addit.description+"', '"+ackComponent.style_name+"', "+attri[1].value+", "+attri[2].value+", 0, "+attri[3].value+", "+attri[0].value+", 0, 0, 0, 0, 0.0, '', '', '', '', '', 0, 0, 0, 0, 0)").then((queryResult) => {

                                });
        
                            });

                        }else {

                        }

                    }

                    if(ackComponent.packages.length > 0) {

                        // console.log(ackComponent.packages);

                        let idNewPack = 0, idNewPackType = 0, idNewPackPallet = 0, idNewPackResistance = 0, idNewPackMaterial = 0;

                        ackComponent.packages.forEach(async (packages) => {

                            await knexConnection.raw("INSERT INTO visioncenter_packages_types(visioncenter_packages_types.created_at, visioncenter_packages_types.name, visioncenter_packages_types.description) VALUES(NOW(), 'SECUNDARIO', 'Empaque Secundario')").then((queryResult) => {

                            });

                            await knexConnection.raw("SELECT MAX(visioncenter_packages_types.id_packages_types) AS idNewPackType FROM visioncenter_packages_types").then((queryResult) => {

                                idNewPackType = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackType;
                            });

                            await knexConnection.raw("INSERT INTO visioncenter_packages_pallets(visioncenter_packages_pallets.length, visioncenter_packages_pallets.width, visioncenter_packages_pallets.height, visioncenter_packages_pallets.max_height, visioncenter_packages_pallets.max_quantity) VALUES(0,0,0,0,0)").then((queryResult) => {

                            });

                            await knexConnection.raw("SELECT MAX(visioncenter_packages_pallets.id_packages_pallets) AS idNewPackPallet FROM visioncenter_packages_pallets").then((queryResult) => {

                                idNewPackPallet = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackPallet;
                            });

                            await knexConnection.raw("INSERT INTO visioncenter_packages_resistance(visioncenter_packages_resistance.name, visioncenter_packages_resistance.description, visioncenter_packages_resistance.`character`, visioncenter_packages_resistance.psi_cm2, visioncenter_packages_resistance.resistance) VALUES('PORTANTE', 'PORTANTE', 'PORTANTE', 20, 90)").then((queryResult) => {

                            });

                            await knexConnection.raw("SELECT MAX(visioncenter_packages_resistance.id_packages_resistance) AS idNewPackResistance FROM visioncenter_packages_resistance").then((queryResult) => {

                                idNewPackResistance = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackResistance;
                            });

                            await knexConnection.raw("INSERT INTO visioncenter_packages_materials(visioncenter_packages_materials.name, visioncenter_packages_materials.fk_materials_structure_packes_materials, visioncenter_packages_materials.fk_visioncenter_materials_packages_materials) VALUES('COD1', "+packages.structure[0].id_materials_structure+", "+packages.material[0].id_visioncenter_materials+")").then((queryResult) => {

                            });

                            await knexConnection.raw("SELECT MAX(visioncenter_packages_materials.id_packages_materials) AS idNewPackMaterial FROM visioncenter_packages_materials").then((queryResult) => {

                                idNewPackMaterial = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackMaterial;

                            });

                            await knexConnection.raw("INSERT INTO visioncenter_packages(fk_packages_material_visioncenter_packages, fk_packages_pallets_visioncenter_packages, fk_packages_resistance_visioncenter_packages, fk_packages_types_visioncenter_packages, name, area, deep, description, height, net_gross, net_weight, reference, vol, width) VALUES("+idNewPackMaterial+", "+idNewPackPallet+", "+idNewPackResistance+", "+idNewPackType+", 'COD1', "+packages.dimensions[0].area+", "+packages.dimensions[0].deep+", '"+packages.dimensions[0].description+"', "+packages.dimensions[0].height+", "+packages.dimensions[0].net_gross+", "+packages.dimensions[0].net_weight+", '"+packages.dimensions[0].reference+"', "+packages.dimensions[0].vol+", "+packages.dimensions[0].width+")").then((queryResult) => {

                            });

                            await knexConnection.raw("SELECT MAX(visioncenter_packages.id_visioncenter_packages) AS idNewPack FROM visioncenter_packages").then((queryResult) => {

                                idNewPack = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPack;

                            });

                            ackComponent.BOM.forEach(async(bom) => {

                                await knexConnection.raw("SELECT visioncenter_products_lines.id_products_lines AS idProductLine FROM visioncenter_products, visioncenter_products_lines WHERE visioncenter_products.id_visioncenter_products = "+bom.id_visioncenter_products+" AND visioncenter_products_lines.fk_products_products_lines = visioncenter_products.id_visioncenter_products").then(async(queryResult) => {

                                    await knexConnection.raw("INSERT INTO visioncenter_productlines_packages(visioncenter_productlines_packages.fk_visioncenter_packages_product_lines, visioncenter_productlines_packages.fk_product_lines_productlines_packages, fk_ack_components_productline_packages, fk_ack_additional_productline_components) VALUES("+idNewPack+", "+JSON.parse(JSON.stringify((queryResult[0])[0])).idProductLine+", "+JSON.parse(JSON.stringify(ackComponent)).idx_component+", 0)").then((queryResultEm) => {

                                    });
                                
                                });

                            });
                            
                        });

                    }else {

                    }
                    
                },
                async createComponentUpdateQuery(root, {newUpdateQuery}) {

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    knexConnection.raw("INSERT INTO visioncenter_acknowledgement_updates(visioncenter_acknowledgement_updates.fk_ack_components_ack_components_updates, visioncenter_acknowledgement_updates.fk_acnowledgement_updates_approval_user, visioncenter_acknowledgement_updates.fk_acnowledgement_updates_approval_user_facts, visioncenter_acknowledgement_updates.fk_acnowledgement_updates_emit_user, visioncenter_acknowledgement_updates.fk_acnowledgement_updates_emit_user_facts, visioncenter_acknowledgement_updates.`status`, visioncenter_acknowledgement_updates.approval_user_decision, visioncenter_acknowledgement_updates.created_at) VALUES("+newUpdateQuery.fk_ack_component+", "+newUpdateQuery.approval_user_id+", '"+newUpdateQuery.approval_user_facts+"', "+newUpdateQuery.emit_user_id+" , '"+newUpdateQuery.emit_user_facts+"', 'PEND', '"+newUpdateQuery.approval_user_decision+"', NOW())").then((queryResult) => {

                    });

                    return newUpdateQuery;


                },
                async createAckPackage(root, {newPackage}) {

                    let idNewPack = 0, idNewPackType = 0, idNewPackPallet = 0, idNewPackResistance = 0, idNewPackMaterial = 0;

                    let knexConnection = await KnexAck({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    await knexConnection.raw("INSERT INTO visioncenter_packages_types(visioncenter_packages_types.created_at, visioncenter_packages_types.name, visioncenter_packages_types.description) VALUES(NOW(), 'SECUNDARIO', 'Empaque Secundario')").then((queryResult) => {

                    });

                    await knexConnection.raw("SELECT MAX(visioncenter_packages_types.id_packages_types) AS idNewPackType FROM visioncenter_packages_types").then((queryResult) => {

                        idNewPackType = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackType;
                    });

                    await knexConnection.raw("INSERT INTO visioncenter_packages_pallets(visioncenter_packages_pallets.length, visioncenter_packages_pallets.width, visioncenter_packages_pallets.height, visioncenter_packages_pallets.max_height, visioncenter_packages_pallets.max_quantity) VALUES(0,0,0,0,0)").then((queryResult) => {

                    });

                    await knexConnection.raw("SELECT MAX(visioncenter_packages_pallets.id_packages_pallets) AS idNewPackPallet FROM visioncenter_packages_pallets").then((queryResult) => {

                        idNewPackPallet = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackPallet;
                    });

                    await knexConnection.raw("INSERT INTO visioncenter_packages_resistance(visioncenter_packages_resistance.name, visioncenter_packages_resistance.description, visioncenter_packages_resistance.`character`, visioncenter_packages_resistance.psi_cm2, visioncenter_packages_resistance.resistance) VALUES('PORTANTE', 'PORTANTE', 'PORTANTE', 20, 90)").then((queryResult) => {

                    });

                    await knexConnection.raw("SELECT MAX(visioncenter_packages_resistance.id_packages_resistance) AS idNewPackResistance FROM visioncenter_packages_resistance").then((queryResult) => {

                        idNewPackResistance = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackResistance;
                    });

                    await knexConnection.raw("INSERT INTO visioncenter_packages_materials(visioncenter_packages_materials.name, visioncenter_packages_materials.fk_materials_structure_packes_materials, visioncenter_packages_materials.fk_visioncenter_materials_packages_materials) VALUES('COD1', "+newPackage.structure.id_materials_structure+", "+newPackage.material.id_visioncenter_materials+")").then((queryResult) => {

                    });

                    await knexConnection.raw("SELECT MAX(visioncenter_packages_materials.id_packages_materials) AS idNewPackMaterial FROM visioncenter_packages_materials").then((queryResult) => {

                        idNewPackMaterial = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPackMaterial;

                    });

                    await knexConnection.raw("INSERT INTO visioncenter_packages(fk_packages_material_visioncenter_packages, fk_packages_pallets_visioncenter_packages, fk_packages_resistance_visioncenter_packages, fk_packages_types_visioncenter_packages, name, area, deep, description, height, net_gross, net_weight, reference, vol, width) VALUES("+idNewPackMaterial+", "+idNewPackPallet+", "+idNewPackResistance+", "+idNewPackType+", 'COD1', "+newPackage.dimension.area+", "+newPackage.dimension.deep+", '"+newPackage.dimension.description+"', "+newPackage.dimension.height+", "+newPackage.dimension.net_gross+", "+newPackage.dimension.net_weight+", '"+newPackage.dimension.reference+"', "+newPackage.dimension.vol+", "+newPackage.dimension.width+")").then((queryResult) => {

                    });


                    await knexConnection.raw("SELECT MAX(visioncenter_packages.id_visioncenter_packages) AS idNewPack FROM visioncenter_packages").then((queryResult) => {

                        idNewPack = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPack;

                    });

                    newPackage.components.forEach(async(component) => {

                        await knexConnection.raw("INSERT INTO visioncenter_acknowledgement_packages(visioncenter_acknowledgement_packages.fk_visioncenter_acknowledgement_visioncenter_packages, visioncenter_acknowledgement_packages.fk_visioncenter_packages_visioncenter_ack_packages, visioncenter_acknowledgement_packages.fk_acknowledgement_components_vision_ack_packages, visioncenter_acknowledgement_packages.fk_acknowledgement_additionals_vision_ack_packages) VALUES("+component.fk_acknowledgement_comp+", "+idNewPack+", "+component.idx_component+", 0)").then((queryResult) => {

                            // idNewPack = JSON.parse(JSON.stringify((queryResult[0])[0])).idNewPack;
                            console.log('creado');
                        });

                    })

                    return 1;

                }

            }

        };


    }

}

module.exports = AckComponentsResolvers;