class BOMSchemas {

    constructor() {

    }

    getSchema() {

        return `        
       
        type Query {
            getAckComponentBOM(ackComponent: AckComponentBOM): [ackComponentBOMLMATItem],
            greet: Int,
            getget: [Project],
            getLogistics(id_visioncenter_logistics: Int): [Logistics],
            getProducts: [Product],
            getDispatch(idDispatch: Int): DispatchItemList,
            getMaterials: [Materials],
            getMaterialsStructures(material: MaterialsList): [MaterialStructure]

        }

        type MaterialStructure {

            id_materials_structure: ID,
            fk_visioncenter_materials_materials_structure: ID,
            name: String,
            description: String,
            orientation: String,
            amplitude: Float,
            height: Float,
            shape: String,
            qty_meter: Int,
            caliber: Float
            
        }

        type Materials {

            id_visioncenter_materials: ID,
            name: String,
            transparency_percent: Int,
            water_resistance_percent: Int,
            acid_resistance_percent: Int,
            temperature_sealed: Int,
            ripped_resistance_percent: Int,
            printing: String,
            material_structure: [MaterialStructure]
        }

        input MaterialsList {

            id_visioncenter_materials: ID,
            name: String,
            transparency_percent: Int,
            water_resistance_percent: Int,
            acid_resistance_percent: Int,
            temperature_sealed: Int,
            ripped_resistance_percent: Int,
            printing: String,
            material_structure: Int
        }

        type newOperatorMachine {

            name: String,
            surname: String,
            document_id: String,
            license_id: String,

        }
  
        input newOperatorMachineInput {

            name: String,
            surname: String,
            document_id: String,
            license_id: String,

        }

        type newOperatorMachineInputItem {

            name: String,
            surname: String,
            document_id: String,
            license_id: String,

        }

        type Logistics {
            
            id_visioncenter_logistics: ID, 
            fk_logistics_types_visioncenter_logistics: ID,
            company_name:String, 
            company_nit: String,
            contact_person: String,
            mobile_contact_person: String

        }

        input NewLogistics {
            
            id_visioncenter_logistics: ID, 
            fk_logistics_types_visioncenter_logistics: ID,
            logistic_type: DispatchLogisticsType,
            company_name:String, 
            company_nit: String,
            contact_person: String,
            mobile_contact_person: String
            logistics_providers_machines: [DispatchLogisticsMachines]

        }

        type Test {
            id_visioncenter_projects: ID,
            description: String
        }
  
        type Product {
            id: Int,
            id_visioncenter_products: Int
        }
  
        input ProductInput {
            id: Int,
            id_visioncenter_products: Int
        }

        type Project {
            id_visioncenter_projects: ID,
            client: String,
            id_client: Int,
            fk_visioncenter_projects_timeline: Int,
            city: String,
            id_project_construction: String,
            id_stage_construction: String,
            id_stage_project_construction: String,
            date_census: String,
            name_construction: String,
            project_name_construction: String,
            id_construction_legal: String,
            timeline: Timeline
        }

        type Timeline {
            id_visioncenter_timelines: ID,
            registry_date: String,
            start_date: String,
            end_date: String,
            dead_line: String,
            current_workflow: Int,
            name: String,                
        }

        input DispatchStatus {
            status: String
        }

        type DispatchStatusItem {
            status: String
        }

        input DispatchLogisticsType {
            id_logistics_types: ID,
            type: String
        }

        type DispatchLogisticsTypeItem {
            id_logistics_types: ID,
            type: String
        }

        input DispatchEventsDates {
            createdAt: String,
            prepareAt: String,
            packedAt: String,
            loadedAt: String,
            receivedAt: String,
        }

        type DispatchEventsDatesItem {
            createdAt: String,
            prepareAt: String,
            packedAt: String,
            loadedAt: String,
            receivedAt: String,
        }

        input DispatchContact {
            complete_name: String,
            phone_number: String
        }

        type DispatchContactItem {
            complete_name: String,
            phone_number: String
        }

        input DispatchLogisticsMachines {

                reference: String,
                description: String,
                capacity_weight: String,
                capacity_volume: String,
                provider_machine_operator: [newOperatorMachineInput]

        }

        type DispatchLogisticsMachinesItem {

            reference: String,
            description: String,
            capacity_weight: String,
            capacity_volume: String,
            provider_machine_operator: [newOperatorMachineInputItem]

        }

        input DispatchLogistics {

            id_visioncenter_logistics: String,
            logistic_type: DispatchLogisticsType,
            provider_name: String,
            provider_nit: String,
            contact: DispatchContact,

            fk_logistics_types_visioncenter_logistics: String,
            company_name:String, 
            company_nit: String,
            contact_person: String,
            mobile_contact_person: String
            logistics_providers_machines: [DispatchLogisticsMachines]

        }

        type DispatchLogisticsItem {

            id_visioncenter_logistics: String,
            logistic_type: DispatchLogisticsTypeItem,
            provider_name: String,
            provider_nit: String,
            contact: DispatchContactItem,

            fk_logistics_types_visioncenter_logistics: String,
            company_name:String, 
            company_nit: String,
            contact_person: String,
            mobile_contact_person: String
            logistics_providers_machines: [DispatchLogisticsMachinesItem]

        }

        input DispatchEssentialInfo {

            info: String,
            subprojects: [DispatchSubproject]

        }

        type DispatchEssentialInfoItem {

            info: String,
            subprojects: [DispatchSubprojectItem]

        }

        input DispatchSubproject {

            address_construction: String,
            advance_date: String,
            city_construction: String,
            color: String,
            current_workflow: Int,
            date_InnDes: String,
            date_delivery: String,
            date_dispatch: String,
            date_externalKickoff: String,
            date_insitu: String,
            date_installation: String,
            date_manufacture: String,
            date_meassure: String,
            date_planner: String,
            date_planner_first: String,
            date_validation_insitu: String,
            days_deadline: Int,
            days_dispatch: Int,
            days_externalkickoff: Int,
            days_installation: Int,
            days_iyd: Int,
            days_manufacture: Int,
            days_measure: Int,
            days_planner1: Int,
            days_planner2: Int,
            days_real_deadline: Int,
            days_real_dispatch: Int,
            days_real_externalkickoff: Int,
            days_real_installation: Int,
            days_real_iyd: Int,
            days_real_manufacture: Int,
            days_real_measure: Int,
            days_real_planner1: Int,
            days_real_planner2: Int,
            days_real_validationinsitu: Int,
            days_validationinsitu: Int,
            dead_line: String,
            description: String,
            end_date: String,
            fk_projects: Int,
            fk_status: Int,
            fk_timelines: Int,
            id_projects_subprojects: Int,
            id_visioncenter_timelines: Int,
            kickoff: Int,
            kickoff_accomplished_date: String,
            kickoff_conditions_to_start: String,
            kickoff_deadLineDate: String,
            kickoff_designDate: String,
            kickoff_dispatch_date: String,
            kickoff_fabrication_date: String,
            kickoff_productionDate: String,
            kickoff_productionDateFirst: String,
            latitude: Float,
            longitude: Float,
            name: String,
            observations: String,
            order_notes: String,
            priority: Int,
            production_deliveries_ready: [ProductDispatchReady],
            project_name_construction: String,
            registry_date: String,
            signed_date: String,
            sitcom_id: String,
            start_date: String,
            techsheet_date: String            
        }

        type DispatchSubprojectItem {

            address_construction: String,
            advance_date: String,
            city_construction: String,
            color: String,
            current_workflow: Int,
            date_InnDes: String,
            date_delivery: String,
            date_dispatch: String,
            date_externalKickoff: String,
            date_insitu: String,
            date_installation: String,
            date_manufacture: String,
            date_meassure: String,
            date_planner: String,
            date_planner_first: String,
            date_validation_insitu: String,
            days_deadline: Int,
            days_dispatch: Int,
            days_externalkickoff: Int,
            days_installation: Int,
            days_iyd: Int,
            days_manufacture: Int,
            days_measure: Int,
            days_planner1: Int,
            days_planner2: Int,
            days_real_deadline: Int,
            days_real_dispatch: Int,
            days_real_externalkickoff: Int,
            days_real_installation: Int,
            days_real_iyd: Int,
            days_real_manufacture: Int,
            days_real_measure: Int,
            days_real_planner1: Int,
            days_real_planner2: Int,
            days_real_validationinsitu: Int,
            days_validationinsitu: Int,
            dead_line: String,
            description: String,
            end_date: String,
            fk_projects: Int,
            fk_status: Int,
            fk_timelines: Int,
            id_projects_subprojects: Int,
            id_visioncenter_timelines: Int,
            kickoff: Int,
            kickoff_accomplished_date: String,
            kickoff_conditions_to_start: String,
            kickoff_deadLineDate: String,
            kickoff_designDate: String,
            kickoff_dispatch_date: String,
            kickoff_fabrication_date: String,
            kickoff_productionDate: String,
            kickoff_productionDateFirst: String,
            latitude: Float,
            longitude: Float,
            name: String,
            observations: String,
            order_notes: String,
            priority: Int,
            production_deliveries_ready: [ProductDispatchReadyItem],
            project_name_construction: String,
            registry_date: String,
            signed_date: String,
            sitcom_id: String,
            start_date: String,
            techsheet_date: String            
        }

        input ProductBOMLMATRoute {

            date_delivery: String,
            id_factory_routes: Int,
            prepare_percent: Int,
            qty_delivery: Int,
            qty_route: Int,
            quantity: Int,

        }

        type ProductBOMLMATRouteItem {

            date_delivery: String,
            id_factory_routes: Int,
            prepare_percent: Int,
            qty_delivery: Int,
            qty_route: Int,
            quantity: Int,

        }

        input ProductBOMLMAT {

            code: String,
            code_erp: String,
            created_at: String,
            description: String,
            fk_products_groups: Int,
            id_visioncenter_products: Int,
            qty: Int,
            route: ProductBOMLMATRoute,
            updated_at: String            

        }

        type ProductBOMLMATItem {

            code: String,
            code_erp: String,
            created_at: String,
            description: String,
            fk_products_groups: Int,
            id_visioncenter_products: Int,
            qty: Int,
            route: ProductBOMLMATRouteItem,
            updated_at: String            

        }

        type Attributes {

            id_products_attribute: ID,
            fk_characteristics: ID,
            fk_products_attributes_types: ID,
            name: String,
            description: String,
            value: String,
            created_at: String,
            updated_at: String,            

        }

        type ackComponentBOMLMATItem {

            code: String,
            code_erp: String,
            created_at: String,
            description: String,
            fk_products_groups: Int,
            id_visioncenter_products: Int,
            qty: Int,
            route: ProductBOMLMATRouteItem,
            updated_at: String,            
            attributes: [Attributes]

        }

        input AckComponentBOM {
            area: Float,
            caliber: Float,
            canto: Int,
            component_code: String,
            component_code_special: String,
            component_description: String,
            component_name: String,
            deep: Int,
            finished_right: Int,
            fk_ack_ack_styles: Int,
            fk_acknowledgement_comp: Int,
            height: Int,
            hinge_left: Int,
            hinge_right: Int,
            idx_component: Int,
            mdf: String,
            observation: String,
            qty: Int,
            rh: String,
            ruteos: String,
            slot_color: String,
            style_name: String,
            width: Int,
            finished_left: Int            

        }

        type AckComponentBOMItem {
            area: Float,
            caliber: Float,
            canto: Int,
            component_code: String,
            component_code_special: String,
            component_description: String,
            component_name: String,
            deep: Int,
            finished_right: Int,
            fk_ack_ack_styles: Int,
            fk_acknowledgement_comp: Int,
            height: Int,
            hinge_left: Int,
            hinge_right: Int,
            idx_component: Int,
            mdf: String,
            observation: String,
            qty: Int,
            rh: String,
            ruteos: String,
            slot_color: String,
            style_name: String,
            width: Int,
            finished_left: Int,

        }

        input ProductBOM {
            AREA: Float,
            BOM2: [ProductBOMLMAT],
            caliber: Float,
            canto: Int,
            component_code: String,
            component_code_special: String,
            component_description: String,
            component_name: String,
            deep: Int,
            finished_right: Int,
            fk_ack_ack_styles: Int,
            fk_acknowledgement_comp: Int,
            height: Int,
            hinge_left: Int,
            hinge_right: Int,
            id_acknowledgement_components: Int,
            observation: String,
            prod_delivery: Int,
            qty: Int,
            style_name: String,
            width: Int            
        }

        type ProductBOMItem {
            AREA: Float,
            BOM2: [ProductBOMLMATItem],
            caliber: Float,
            canto: Int,
            component_code: String,
            component_code_special: String,
            component_description: String,
            component_name: String,
            deep: Int,
            finished_right: Int,
            fk_ack_ack_styles: Int,
            fk_acknowledgement_comp: Int,
            height: Int,
            hinge_left: Int,
            hinge_right: Int,
            id_acknowledgement_components: Int,
            observation: String,
            prod_delivery: Int,
            qty: Int,
            style_name: String,
            width: Int            
        }

        input ProductDispatchReady {

            BOM: [ProductBOM],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String

        }

        type ProductDispatchReadyItem {

            BOM: [ProductBOMItem],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String

        }

        input DispatchRemission {

            id_visioncenter_projects: Int,
            project_name: String,
            id_projects_subprojects: Int,
            subproject_position: Int,
            BOM: [ProductBOM],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String
        }

        type DispatchRemissionItem {
            
            id_visioncenter_projects: Int,
            project_name: String,
            id_projects_subprojects: Int,
            subproject_position: Int,
            BOM: [ProductBOMItem],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String,
            kickoff_dispatch_date: String,
            kickoff_deadLineDate: String,
            
        }

        input NoveltiesTypes {
            id: ID,
            type_name: String,
            fk_novelty_type: Int
        }

        type NoveltiesTypesItem {
            id: ID,
            type_name: String,
            fk_novelty_type: Int
        }

        input NoveltyProductRelated {
            BOM: [ProductBOM],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String

        }

        type NoveltyProductRelatedItem {
            BOM: [ProductBOMItem],
            complete_product_production_delivery: Int,
            id_subprojects_products: Int,
            name: String,
            quantity: Int,
            type: String,
            type_client: String,
            project_name_construction: String

        }

        input DispatchNovelty {
            created_at: String,
            description: String,
            fk_dispatch_remision: ID,
            novelty_type: NoveltiesTypes,
            product: NoveltyProductRelated            

        }

        type DispatchNoveltyItem {
            created_at: String,
            description: String,
            fk_dispatch_remision: ID,
            novelty_type: NoveltiesTypesItem,
            product: NoveltyProductRelatedItem            

        }

        input Dispatch {

            id_visioncenter_dispatches: ID,
            fk_visioncenter_users: ID,
            contact: DispatchContact,
            dispatch_status: DispatchStatus,
            dispatch_weight_net: Float,
            dispatch_weight_gross: Float,
            dispatch_products_qty: Float,
            dispatch_packs_qty: Float,
            dispatch_events_dates: DispatchEventsDates,
            dispatch_logistics: [DispatchLogistics],
            dispatch_essential_info: DispatchEssentialInfo,
            dispatch_remission: [DispatchRemission],
            dispatch_novelties: [DispatchNovelty]

        }

        type DispatchItemList {

            id_visioncenter_dispatches: ID,
            fk_visioncenter_users: ID,
            contact: DispatchContactItem,
            dispatch_status: DispatchStatusItem,
            dispatch_weight_net: Float,
            dispatch_weight_gross: Float,
            dispatch_products_qty: Float,
            dispatch_packs_qty: Float,
            dispatch_events_dates: DispatchEventsDatesItem,
            dispatch_logistics: [DispatchLogisticsItem],
            dispatch_essential_info: DispatchEssentialInfoItem,
            dispatch_remission: [DispatchRemissionItem],
            dispatch_novelties: [DispatchNoveltyItem]

        }

        type StowageItemList {
            id_visioncenter_stowages: ID,
            fk_visioncenter_materials_visi_stowages: ID, 
            name: String,
            width: Int,
            height: Int
            deep: Int, 
            net_weight: Float, 
            net_gross: Float,
            reference: String            
        }

        type Delivery {
            id_visioncenter_delivery: ID
        }

        type Mutation {
            createProduct(input: ProductInput): [Project],
            createNewLogistics(input: NewLogistics): [Logistics],
            createDispatch(input: Dispatch): [Delivery],
        }
    `;

    }
  
  }

  module.exports = BOMSchemas;

//   type DispatchResponse {

//     id_visioncenter_dispatches: ID,
//     dispatch_status: {

//     },
//     dispatch_weight_net: Float,
//     dispatch_weight_gross: Float,
//     dispatch_products_qty: Float,
//     dispatch_packs_qty: Float,
//     dispatch_events_dates: {
//         createdAt: String,
//         prepareAt: String,
//         packedAt: String,
//         loadedAt: String,
//         receivedAt: String,
//     },
//     dispatch_essential_info: {
//         subprojects: [
//             {
//                 fk_visioncenter_project: ID,
//                 contacts: ,
//                 remision_product: [{

//                     destinations: [{
//                         fk_visioncenter_cities: ID,
//                         dispatch_destination: String,
//                         dispatch_destination_address: String,
//                         dispatch_product_quantity: Float
//                     }],
//                     dispatch_dimensions_weights: [{
//                         dispatch_weight_net: Float,
//                         dispatch_weight_gross: Float,
//                         dispatch_products_qty: Int,
//                         dispatch_packs_qty: Int,
//                     }],

//                 }]
//             }
//         ],
//     },
//     dispatch_logistics: [{

//         id_dispatch_logistics: ID,
//         logistic_type: {

//         },
//         provider_name: String,
//         provider_nit: String,
//         contact: {

//             complete_name: String,
//             phone_number: String

//         },
//         logistics_providers_machines: [{

//             provider_machines : {

//                 reference: String,
//                 description: String,
//                 capacity_weight: Float,
//                 capacity_volumen: Float,
//                 provider_machine_operator: {

//                 }
//             }

//         }]


//     }],
//     dispatch_remission: [{

//         remision_subprojects_products: [{
            
//         }]


//     }],
//     dispatch_complient: [{

//     }],
//     dispatch_accomplished: {
//         dispatch_accomplished_status: {

//         },

//     }
// }
