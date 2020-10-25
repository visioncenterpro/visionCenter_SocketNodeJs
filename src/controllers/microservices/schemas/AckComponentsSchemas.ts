class AckComponentsSchemas {

    constructor() {

    }

    getSchema() {
        return `

            type Query {

                tester:Boolean


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
                qty: Int,
                rh: String,
                ruteos: String,
                slot_color: String,
                style_name: String,
                width: Int

            }

            input AckComponentInput {

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

            type Mutation {

                updateAckComponentCharacteristics(ackComponent: AckComponentInput):AckComponent 

            }

        
        `;
    }
}

module.exports = AckComponentsSchemas;