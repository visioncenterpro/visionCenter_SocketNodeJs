class AckComponentsResolvers {

    constructor() {

    }

    getResolver() {

        return {

            Query: {

                tester() {
                    return true;
                }

            },
            Mutation: {

                updateAckComponentCharacteristics(root, {ackComponent}) {

                    console.log('cammmm', ackComponent);
                    Knex({ client: "mysql", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } }).raw('SELECT * from visioncenter_projects limit 1').then((queryResult) => {
                          console.log('plaz', JSON.parse(JSON.stringify((queryResult[0])[0])));
                      });

                    return ackComponent;

                }

            }

        };


    }

}

module.exports = AckComponentsResolvers;