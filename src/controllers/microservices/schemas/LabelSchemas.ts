class LabelSchemas {

    constructor() {

    }

    getSchema() {
        return `

            type Query {

                tester:Boolean,
                generateXLabel(xLabelSource: XLabelInput): XLabel

            }

            type XLabel {
                type_code: String,
                xLabelModel: XLabelModel
            }

            type XLabelModel {

                xLabelModelProject: XLabelModelProject,
                xLabelModelSubProject: [XLabelModelSubProject],
                xLabelModelSubProjectProduct: [XLabelModelSubProjectProduct],
                xLabelModelAckComponent: [XLabelModelAckComponent]
            }

            type XLabelModelProject {
                name: String
                

            }
            
            type XLabelModelSubProject {
                name: String
                

            }

            type XLabelModelSubProjectProduct {
                name: String
                

            }

            type XLabelModelAckComponent {
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

            input XLabelInput {
                type_code: String,
                xLabelModel: XLabelModelInput
            }
            
            input XLabelModelInput {

                xLabelModelProject: XLabelModelProjectInput,
                xLabelModelSubProject: [XLabelModelSubProjectInput],
                xLabelModelSubProjectProduct: [XLabelModelSubProjectProductInput],
                xLabelModelAckComponent: [XLabelModelAckComponentInput]
            }

            input XLabelModelProjectInput {
                name: String
                

            }
            
            input XLabelModelSubProjectInput {
                name: String
                

            }

            input XLabelModelSubProjectProductInput {
                name: String
                

            }

            input XLabelModelAckComponentInput {
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
        
        `;
    }
}

module.exports = LabelSchemas;