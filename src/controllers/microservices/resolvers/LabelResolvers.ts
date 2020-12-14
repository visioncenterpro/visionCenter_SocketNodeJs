const KnexLabel = require("knex");

class LabelResolvers {

    constructor() {

    }

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
                },
                async generateXLabel(root, {xLabelSource}) {

                    switch(xLabelSource.type_code) {

                        case 'ACK_COMPONENT':
                            break;
                    }

                    return xLabelSource;

                }

            },
            // Mutation: {


            // }

        };


    }

}

module.exports = LabelResolvers;