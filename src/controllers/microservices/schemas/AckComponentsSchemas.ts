class AckComponentsSchemas {

    constructor() {

    }

    getSchema() {
        return `

            type Query {

                tester:Boolean,
                getAckComponentAdditionals(ackComponent: AckComponentInput): [AckComponentAdditional],
                getAckComponentPackages(ackComponent: AckComponentInput): [AckComponentPackagesList],
                getAckPackages(idAck: [Int]): [AckComponentPackagesList]

            }

            type AckComponentPackagesList {

                id_visioncenter_packages: ID,
                material_name: String,
                material_structure_name: String,
                NAME: String,
                CODE: String,
                fk_packages_material_visioncenter_packages: ID,
                fk_packages_types_visioncenter_packages: ID,
                fk_packages_resistance_visioncenter_packages: ID,
                fk_packages_pallets_visioncenter_packages: ID,
                AREA: Int,
                deep: Int,
                height: Int,
                vol: Int,
                width: Int,
                package_content: [AckComponentPackagesListItem]

            }

            type AckComponentPackagesListItem {

                id_acknowledgement_packages: ID,
                id_acknowledgement_component: ID,
                component_description: String,
                component_code: String,
                qty: Int,
                BOM: [BOMPackage]
                packages: [AckComponentPackage]
                additionals: [PackageComponentAdditional]

            }

            type BOMPackage {
                code: String,
                code_erp: String,
                created_at: String,
                description: String,
                fk_products_groups: Int,
                id_visioncenter_products: Int,
                qty: Int,
                updated_at: String    
                fk_product_line_piece_productline_bom: ID        
            }

            type AckComponentPackage {

                id_visioncenter_packages: ID,
                material_name: String,
                material_structure_name: String,
                name: String,
                code: String,
                fk_packages_material_visioncenter_packages: ID,
                fk_packages_types_visioncenter_packages: ID,
                fk_packages_resistance_visioncenter_packages: ID,
                fk_packages_pallets_visioncenter_packages: ID,
                area: Int,
                deep: Int,
                height: Int,
                vol: Int,
                width: Int,
                item: [Int]                

            }

            type AckComponent {

                area: Int,
                caliber: Int,
                canto: Int,
                component_code: String,
                component_code_special: String,
                component_description: String,
                component_name: String,
                deep: Int,
                finished_left: Int,
                finished_right: Int,
                fk_ack_ack_styles: ID,
                fk_acknowledgement_comp: ID,
                height: Int,
                hinge_left: Int,
                hinge_right: Int,
                idx_component: Int,
                mdf: String,
                observation: String,
                qty: String,
                rh: String,
                ruteos: String,
                slot_color: String,
                style_name: String,
                width: Int

            }

            type PackageComponentAdditional {
                id_acknowledgement_additionals: ID,
                fk_ack_ack_styles: ID,
                fk_ack_components_ack_additional: ID,
                observation: String,
                component_name: String,
                component_code: String, 
                component_description: String,
                style_name: String,
                height: Int,
                width: Int,
                deep: Int,
                qty: Int
            }

            type AckComponentAdditional  {

                id_visioncenter_products: ID,
                area: Int,
                caliber: Int,
                canto: Int,
                component_code: String,
                component_code_special: String,
                component_description: String,
                component_name: String,
                deep: Int,
                finished_left: Int,
                finished_right: Int,
                fk_ack_ack_styles: ID,
                fk_acknowledgement_comp: ID,
                height: Int,
                hinge_left: Int,
                hinge_right: Int,
                idx_component: Int,
                mdf: String,
                observation: String,
                qty: String,
                rh: String,
                ruteos: String,
                slot_color: String,
                style_name: String,
                width: Int,
                code: String,
                description: String,
                name: String,
                reference: String,
                product_line: [ProductLine]

            }

            input AckComponentAdditionalInput  {

                id_visioncenter_products: ID,
                area: Int,
                caliber: Int,
                canto: Int,
                component_code: String,
                component_code_special: String,
                component_description: String,
                component_name: String,
                deep: Int,
                finished_left: Int,
                finished_right: Int,
                fk_ack_ack_styles: ID,
                fk_acknowledgement_comp: ID,
                height: Int,
                hinge_left: Int,
                hinge_right: Int,
                idx_component: Int,
                mdf: String,
                observation: String,
                qty: String,
                rh: String,
                ruteos: String,
                slot_color: String,
                style_name: String,
                width: Int,
                code: String,
                description: String,
                name: String,
                reference: String,
                product_line: [ProductLineInput]

            }

            input Attributes {

                id_products_attribute: ID,
                fk_characteristics: ID,
                fk_products_attributes_types: ID,
                name: String,
                description: String,
                value: String,
                created_at: String,
                updated_at: String,            
    
            }

            input ProductBOMLMATRouteItem {

                date_delivery: String,
                id_factory_routes: Int,
                prepare_percent: Int,
                qty_delivery: Int,
                qty_route: Int,
                quantity: Int,
    
            }

            input AckComponentInputBOM {

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
    

            input AckComponentInput {

                BOM: [AckComponentInputBOM]
                additionals: [AckComponentAdditionalInput]
                packages: [AckComponentInputPackages]
                area: Int,
                caliber: Int,
                canto: Int,
                component_code: String,
                component_code_special: String,
                component_description: String,
                component_name: String,
                deep: Int,
                finished_left: Int,
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
                width: Int

            }

            input ProductLineInput {
                code: String
                code_erp: String
                description: String
                id_products_lines: ID
                id_visioncenter_products: ID
                name: String
                characteristics: [ProductLineInputCharacteristics]
            }

            type ProductLine {
                code: String
                code_erp: String
                description: String
                id_products_lines: ID
                id_visioncenter_products: ID
                name: String
            }

            input ProductLineInputCharacteristics {
                id_products_characteristics: ID
                id_products_types: ID
                name: String
                status: Int
                attributes: [ProductLineInputAttributes]
            }

            input ProductLineInputAttributes {
                description: String
                id_products_attribute: ID
                name: String
                unit: String
                value: String                
            }


            input AckComponentInputPackagesDimension {
                area: Int
                caliber: Int
                deep: Int
                description: String
                height: Int
                id_products_groups: ID
                net_gross: Float
                net_weight: Float
                qty: Int
                reference: String
                vol: Int
                width: Int
            }

            input AckComponentInputPackagesMaterial {
                acid_resistance_percent: Int
                id_visioncenter_materials: String
                material_structure: [AckComponentInputPackagesStructure]
                name: String
                printing: String
                ripped_resistance_percent: Int
                temperature_sealed: Int
                transparency_percent: Int
                water_resistance_percent: Int
            }

            input AckComponentInputPackagesStructure {
                amplitude: Int
                caliber: Int
                description: String
                fk_visioncenter_materials_materials_structure: ID
                height: Int
                id_materials_structure: String
                name: String
                orientation: String
                qty_meter: Int
                shape: String
            }

            input AckComponentInputPackages {

                dimensions: [AckComponentInputPackagesDimension],
                material: [AckComponentInputPackagesMaterial],
                structure: [AckComponentInputPackagesStructure],
            }

            input AckPackageInput {

                dimension: AckComponentInputPackagesDimension,
                material: AckComponentInputPackagesMaterial,
                structure: AckComponentInputPackagesStructure,
                components: [AckComponentInputLight]

            }

            input AckComponentInputLight {

                fk_acknowledgement_comp: ID,
                idx_component: ID

            }
            
            type Mutation {

                updateAckComponentCharacteristics(ackComponent: AckComponentInput):AckComponent 
                updateAckComponent(ackComponent: AckComponentInput): AckComponent
                createAckPackage(newPackage: AckPackageInput): Int
            }

        
        `;
    }
}

module.exports = AckComponentsSchemas;