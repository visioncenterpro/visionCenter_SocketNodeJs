class StatisticsSchemas {

    constructor() {

    }

    getSchema() {
        return `
            type Query {

                tester:Boolean,
                getProjectsNominalStatistics(optionIndex: Int): ProjectsNominalStatistics,
                getProjectsList(optionIndex: Int) : [ProjectsList]

            }

            type ProjectsNominalStatistics {
                
                statisticsDate: String,
                totalProjectsQuantity: Int,
                totalSubProjectsQuantity: Int,
                totalSubProjectsProductsQuantity: Int,
                totalSubProjectsProductsWithAckQuantity: Int,
                totalSubProjectsProductsWithoutAckQuantity: Int,
            }

            type ProjectsList {
                id_visioncenter_projects: Int,
                project_name_construction: String,
                subprojectsQty: Int,
                subprojectsProductsQty: Int
            }


            `;
    }
}

module.exports = StatisticsSchemas;