class ProjectManagerSchemas {

    constructor() {

    }

    getSchema() {
        return `
            type Query {

                tester:Boolean,
                getSubprojectTimelineEvents(id_subproject: Int): [SubprojectTimelineEvents],
                getGeneralTimelineEvents: [GeneralTimelineEvents] 
                
            }

            type GeneralTimelineEvents {

                id_timeline_events: Int, 
                fk_timeline: Int,
                registry_date: String,
                start_date: String,
                end_date: String,
                dead_line: String,
                name: String,
                description: String,
                responsible: String,
                fact: String,
                subproject_event: [SubprojectUpdateQuery]

            }            

            input GeneralTimelineEventsInput {

                id_timeline_events: Int, 
                fk_timeline: Int,
                registry_date: String,
                start_date: String,
                end_date: String,
                dead_line: String,
                name: String,
                description: String,
                responsible: String,
                fact: String,
                subproject_event: [SubprojectUpdateQueryInput]

            }

            type SubprojectTimelineEvents {

                id_timeline_events: Int, 
                fk_timeline: Int,
                registry_date: String,
                start_date: String,
                end_date: String,
                dead_line: String,
                name: String,
                description: String,
                responsible: String,
                fact: String                

            }

            type SubprojectUpdateQuery {

                id_subprojects_updates: Int
                fk_projects_subprojects_subprojects_updates: Int,
                fk_subproject_updates_approval_user: Int,
                updates_approval_user_facts: String,
                fk_subproject_updates_emit_user: Int,
                fk_subproject_updates_emit_user_facts: String,
                status: String,
                approval_user_decision: String,
                created_at: String,
                finished_at: String
                fk_vision_timeline_event_subproject_updates: Int                
                updateQuery: String

            }

            input SubprojectUpdateQueryInput {
                id_subprojects_updates: Int,
                fk_projects_subprojects_subprojects_updates: Int,
                fk_subproject_updates_approval_user: Int,
                updates_approval_user_facts: String,
                fk_subproject_updates_emit_user: Int,
                fk_subproject_updates_emit_user_facts: String,
                status: String,
                approval_user_decision: String,
                created_at: String,
                finished_at: String,
                fk_vision_timeline_event_subproject_updates: Int                

            }

            type Mutation {

                createSubprojectUpdateQuery(newUpdateQuery: SubprojectUpdateQueryInput): SubprojectUpdateQuery
                resolveUpdateQuery(resolveUpdateQuery: GeneralTimelineEventsInput): GeneralTimelineEvents
            }

            `;
    }
}

module.exports = ProjectManagerSchemas;