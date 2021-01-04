const KnexStats = require("knex");

class StatisticsResolvers {

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
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
                        password : 'betabeta',
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