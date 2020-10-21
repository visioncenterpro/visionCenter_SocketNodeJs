class BOMSchemas {

    constructor() {

    }

    getSchema() {

        return `        
       
        type Query {
            getBOM(name: String): String,
            greet: Int,
            getProducts: [Product],
            getProjects: [Project],
            getget: [Project]
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

        type Mutation {
            createProduct(input: ProductInput): [Project]
        }
  
   
    `;

    }
  
  }

  module.exports = BOMSchemas;