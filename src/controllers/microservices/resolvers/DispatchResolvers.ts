const KnexDispatch = require("knex");
const BOMResolversParent = require('./BOMResolvers.ts');

class DispatchResolvers extends BOMResolversParent {

    constructor() {
        super();

    }

    getOwnResolver() {

        let ownResolver = this.getResolver();

        ownResolver.Query.getDispatches = async(root) => {

            let dispatchObject = {
                id_visioncenter_dispatches: 0,
                dispatch_logistics: [],
            };
            let dispatchObjects = [];

            let knexConnection = await KnexDispatch({ client: "mysql2", connection: {
                host : '127.0.0.1',
                user : 'root',
                password : '',
                database : 'visioncenter'
              } });

            await knexConnection.raw('SELECT visioncenter_delivery.id_visioncenter_delivery, visioncenter_delivery.fk_delivery_subprojects, visioncenter_delivery.created_at, visioncenter_dispatches.id_visioncenter_dispatches, visioncenter_dispatches.fk_visioncenter_users, visioncenter_dispatches.fk_visioncenter_delivery_visioncenter_dispatches, visioncenter_dispatches.created_at FROM visioncenter_delivery, visioncenter_dispatches WHERE visioncenter_dispatches.fk_visioncenter_delivery_visioncenter_dispatches = visioncenter_delivery.id_visioncenter_delivery').then(async function(queryResult) {

                dispatchObjects = queryResult[0]

            });

            await new Promise((resolve, reject) => {

                let flag = 0;

                dispatchObjects.forEach(async(dispatch) => {

                    flag++;

                    dispatch.dispatch_status = {
                        status: "",
                    }

                    await knexConnection.raw('SELECT visioncenter_logistics.id_visioncenter_logistics, visioncenter_logistics.fk_logistics_types_visioncenter_logistics, visioncenter_logistics.company_name, visioncenter_logistics.company_nit, visioncenter_logistics.contact_person, visioncenter_logistics.mobile_contact_person FROM visioncenter_dispatches_logistics, visioncenter_logistics WHERE visioncenter_dispatches_logistics.fk_visioncenter_dispatches_dis_log = '+dispatch.id_visioncenter_dispatches+' AND visioncenter_logistics.id_visioncenter_logistics = visioncenter_dispatches_logistics.fk_visioncenter_logistics_dis_logistics').then(async function(logisticsResult) {
    
                        dispatch.dispatch_logistics = logisticsResult[0];
        
                    });

                    if(dispatchObjects.length === flag) {
                        resolve(true);
                    }
        
                });


            });

            await new Promise((resolve, reject) => {

                let flag = 0;

                dispatchObjects.forEach(async(dispatch) => {


                    dispatch.dispatch_status = {
                        status: "",
                    }

                    //OJO, VALIDAR SI SUBPROJECT_PRODUCT ESTA EN VARIAS ENTREGAS
                    //'SELECT visioncenter_dispatches_remission.id_dispatches_remission, visioncenter_dispatches_remission.fk_visioncenter_dispatches_vi_dispat_remission, visioncenter_dispatches_remission.quantity, visioncenter_dispatches_remission.`type`, visioncenter_dispatches_remission.type_client, visioncenter_dispatches_remission.project_name_construction, visioncenter_dispatches_remission.name, visioncenter_dispatches_remission.id_subprojects_products, visioncenter_dispatches_remission.complete_product_production_delivery FROM visioncenter_dispatches_remission WHERE visioncenter_dispatches_remission.fk_visioncenter_dispatches_vi_dispat_remission = '+dispatch.id_visioncenter_dispatches

                    await knexConnection.raw("SELECT REPLACE(visioncenter_timelines.kickoff_dispatch_date, '', '') as kickoff_dispatch_date, REPLACE(visioncenter_timelines.kickoff_deadLineDate, '', '') as kickoff_deadLineDate, visioncenter_dispatches_remission.id_dispatches_remission, visioncenter_dispatches_remission.fk_visioncenter_dispatches_vi_dispat_remission, visioncenter_dispatches_remission.quantity, visioncenter_dispatches_remission.`type`, visioncenter_dispatches_remission.type_client, visioncenter_dispatches_remission.project_name_construction, visioncenter_dispatches_remission.name, visioncenter_dispatches_remission.id_subprojects_products, visioncenter_dispatches_remission.complete_product_production_delivery FROM visioncenter_dispatches_remission, visioncenter_subprojects_products, visioncenter_projects_subprojects, visioncenter_timelines WHERE visioncenter_dispatches_remission.fk_visioncenter_dispatches_vi_dispat_remission = "+dispatch.id_visioncenter_dispatches+" AND visioncenter_subprojects_products.id_subprojects_products = visioncenter_dispatches_remission.id_subprojects_products AND visioncenter_projects_subprojects.id_projects_subprojects = visioncenter_subprojects_products.fk_subprojects_subprojectsproducts AND visioncenter_timelines.id_visioncenter_timelines = visioncenter_projects_subprojects.fk_timelines").then(async (remissionsResult) => {

                        console.log(remissionsResult[0]);
                        dispatch.dispatch_remission = remissionsResult[0];
                        flag++;
            
                    });
                    if(dispatchObjects.length === flag) {
                        resolve(true);
                    }
    
        
                });


            });
            // console.log(dispatchObjects);
            console.log('primero');
            return dispatchObjects;

        };

        ownResolver.Query.getStowages = async(root) => {

            let stowagesList = [];

            let knexConnection = await KnexDispatch({ client: "mysql2", connection: {
                host : '127.0.0.1',
                user : 'root',
                password : '',
                database : 'visioncenter'
              } });

            await knexConnection.raw('SELECT visioncenter_stowages.id_visioncenter_stowages, visioncenter_stowages.fk_visioncenter_materials_visi_stowages, visioncenter_stowages.name, visioncenter_stowages.width, visioncenter_stowages.height, visioncenter_stowages.deep, visioncenter_stowages.net_weight, visioncenter_stowages.net_gross, CONCAT(name, \' \', height,\'x\',deep,\'x\',width) AS reference FROM visioncenter_stowages ORDER BY visioncenter_stowages.name ASC').then((queryResult) => {

                stowagesList = queryResult[0];

            });

            return stowagesList;

        };

        return ownResolver;
    }

}

module.exports = DispatchResolvers;