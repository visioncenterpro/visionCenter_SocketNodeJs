const BOMSchemaParent = require('./BOMSchemas.ts');

class DispatchSchema extends BOMSchemaParent {

    constructor() {
        super();

    }

    getOwnSchema() {
        let ownSchema = this.getSchema().replace('type Query {', `type Query { \n
            getDispatches: [DispatchItemList],`);
        ownSchema = ownSchema.replace('type Query {', `type Query { \n
            getStowages: [StowageItemList],`);
        // ownSchema = ownSchema.replace('type Mutation {', `type Mutation { \n
        //     getStowages: [StowageItemList],`);
                // console.log(ownSchema);
        return ownSchema;
    }

}

module.exports = DispatchSchema;