const KnexStats = require("knex");

class StatisticsResolvers {

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
                },
                async getProjectsList(root, {optionIndex}) {

                    let projectsList = [];

                    let knexConnection = await KnexStats({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } });


                    await knexConnection.raw("SELECT visioncenter_projects.id_visioncenter_projects, visioncenter_projects.project_name_construction FROM visioncenter_projects WHERE visioncenter_projects.id_visioncenter_projects > 33201").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsList = (queryResult[0]);

                        }                     

                    });   

                    await new Promise((resolve, reject) => {

                        let flag = 0;
                        
                        projectsList.forEach((pro) => {

                            pro.subprojectsQty = 0;

                            knexConnection.raw("SELECT COUNT(*) AS subprojectsQty FROM visioncenter_projects_subprojects WHERE visioncenter_projects_subprojects.fk_projects = "+pro.id_visioncenter_projects).then(async (query2Result) => {
            
                                if((query2Result[0]).length > 0) {

                                    // console.log('primero', (query2Result[0])[0].subprojectsQty);
                                    pro.subprojectsQty = (query2Result[0])[0].subprojectsQty;
                                }                     
                                flag++;
                                console.log(flag, projectsList.length);
                                if(flag === projectsList.length) {
                                    resolve(true);
                                }
            
                            });   

                        });

                    });

                    await new Promise((resolve, reject) => {

                        let flag = 0;
                        
                        projectsList.forEach((pro) => {

                            pro.subprojectsProductsQty = 0;

                            knexConnection.raw("SELECT SUM(visioncenter_subprojects_products.quantity) AS subprojectsProductsQty FROM visioncenter_projects_subprojects, visioncenter_subprojects_products WHERE visioncenter_projects_subprojects.fk_projects = "+pro.id_visioncenter_projects+" AND visioncenter_subprojects_products.fk_subprojects_subprojectsproducts = visioncenter_projects_subprojects.id_projects_subprojects").then(async (query2Result) => {
            
                                if((query2Result[0]).length > 0) {

                                    // console.log('primero', (query2Result[0])[0].subprojectsQty);
                                    pro.subprojectsProductsQty = (query2Result[0])[0].subprojectsProductsQty;
                                }                     
                                flag++;
                                console.log(flag, projectsList.length);
                                if(flag === projectsList.length) {
                                    resolve(true);
                                }
            
                            });   

                        });

                    });

                    console.log('fin');

                    return projectsList;


                },
                async getProjectsNominalStatistics(root, {optionIndex}) {
                    
                    let projectsNominalStatistics = {

                        statisticsDate: '2021-01-02',
                        totalProjectsQuantity: 0,
                        totalSubProjectsQuantity: 0,
                        totalSubProjectsProductsQuantity: 0,
                        totalSubProjectsProductsWithAckQuantity: 0,
                        totalSubProjectsProductsWithoutAckQuantity: 0,
                    };

                    let knexConnection = await KnexStats({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } });


                    await knexConnection.raw("SELECT COUNT(visioncenter_projects.id_visioncenter_projects) AS totalProjects FROM visioncenter_projects").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsNominalStatistics.totalProjectsQuantity = (queryResult[0])[0].totalProjects;

                        }                     

                    });   
                    
                    await knexConnection.raw("SELECT COUNT(visioncenter_projects_subprojects.id_projects_subprojects) AS totalSubProjects FROM visioncenter_projects_subprojects").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsNominalStatistics.totalSubProjectsQuantity = (queryResult[0])[0].totalSubProjects;

                        }                     

                    });   

                    await knexConnection.raw("SELECT COUNT(visioncenter_subprojects_products.id_subprojects_products) AS totalSubProjectsProducts FROM visioncenter_subprojects_products").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsNominalStatistics.totalSubProjectsProductsQuantity = (queryResult[0])[0].totalSubProjectsProducts;

                        }                     

                    });   

                    await knexConnection.raw("SELECT COUNT(visioncenter_subprojects_products.id_subprojects_products) AS productsWithAck FROM visioncenter_subprojects_products, visioncenter_acknowledgements WHERE visioncenter_acknowledgements.fk_subprojects_products_ack = visioncenter_subprojects_products.id_subprojects_products").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsNominalStatistics.totalSubProjectsProductsWithAckQuantity = (queryResult[0])[0].productsWithAck;

                        }                     

                    });   

                    await knexConnection.raw("SELECT COUNT(visioncenter_subprojects_products.id_subprojects_products) AS productsWithoutAck FROM visioncenter_subprojects_products, visioncenter_acknowledgements WHERE visioncenter_acknowledgements.fk_subprojects_products_ack != visioncenter_subprojects_products.id_subprojects_products").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            projectsNominalStatistics.totalSubProjectsProductsWithoutAckQuantity = (queryResult[0])[0].productsWithoutAck;

                        }                     

                    });   

                    return projectsNominalStatistics;

                }
                
            }

        }

    }

}

module.exports = StatisticsResolvers;