const KnexProManager = require("knex");

class ProjectManagerResolvers {

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
                },
                async getSubprojectTimelineEvents(root, {id_subproject}) {

                    let subprojectTimelineEvents = [];

                    let knexConnection = await KnexProManager({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });


                    await knexConnection.raw("SELECT visioncenter_timelines_event.id_timeline_events, visioncenter_timelines_event.fk_timeline, visioncenter_timelines_event.registry_date, visioncenter_timelines_event.start_date, visioncenter_timelines_event.end_date, visioncenter_timelines_event.dead_line, visioncenter_timelines_event.name, visioncenter_timelines_event.description, visioncenter_timelines_event.responsible, visioncenter_timelines_event.fact FROM visioncenter_timelines_event, visioncenter_projects_subprojects WHERE visioncenter_projects_subprojects.id_projects_subprojects = "+id_subproject+" AND visioncenter_timelines_event.fk_timeline = visioncenter_projects_subprojects.fk_timelines ORDER BY visioncenter_timelines_event.id_timeline_events DESC").then(async (queryResult) => {
                
                        if((queryResult[0]).length > 0) {

                            subprojectTimelineEvents = (queryResult[0]);

                        }                     

                    });   

                    return subprojectTimelineEvents;
                }

            },
            Mutation: {

                
                async createSubprojectUpdateQuery(root, {newUpdateQuery}) {

                    let knexConnection = await KnexProManager({ client: "mysql2", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : 'betabeta',
                        database : 'visioncenter'
                      } });

                    knexConnection.raw("INSERT INTO visioncenter_subprojects_events(fk_projects_subprojects_subprojects_updates, fk_subproject_updates_approval_user, updates_approval_user_facts, fk_subproject_updates_emit_user, fk_subproject_updates_emit_user_facts, status, approval_user_decision, created_at, finished_at, fk_vision_timeline_event_subproject_updates) VALUES("+newUpdateQuery.fk_projects_subprojects_subprojects_updates+", "+newUpdateQuery.fk_subproject_updates_approval_user+", '"+newUpdateQuery.updates_approval_user_facts+"', "+newUpdateQuery.fk_subproject_updates_emit_user+", '"+newUpdateQuery.fk_subproject_updates_emit_user_facts+"', '"+newUpdateQuery.status+"', '"+newUpdateQuery.approval_user_decision+"', '"+newUpdateQuery.created_at+"', NULL, '"+newUpdateQuery.fk_vision_timeline_event_subproject_updates+"')").then((queryResult) => {

                    });

                    return newUpdateQuery;


                },
            }

        }

    }

}

module.exports = ProjectManagerResolvers;

