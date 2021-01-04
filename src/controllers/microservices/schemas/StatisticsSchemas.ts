class StatisticsSchemas {

    constructor() {

    }

    getSchema() {
        return `
            type Query {

                tester:Boolean,
                getProjectsNominalStatistics(optionIndex: Int): ProjectsNominalStatistics

            }

            type ProjectsNominalStatistics {
                
                statisticsDate: String,
                totalProjectsQuantity: Int,
                totalSubProjectsQuantity: Int,
                totalSubProjectsProductsQuantity: Int,
                totalSubProjectsProductsWithAckQuantity: Int,
                totalSubProjectsProductsWithoutAckQuantity: Int,
            }
            `;
    }
}

module.exports = StatisticsSchemas;