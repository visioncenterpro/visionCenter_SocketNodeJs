const Axios = require("axios");
const Knex = require("knex");

class BOMResolvers {

    getResolver() {

        return {

            Query:  {

                async getProjects(root) {

                    let rn = await Axios.get('http://192.168.39.176:8000/api/projects/getAllProjects?all=true'); 
                    return rn.data.data;

                    // return Knex({ client: "mysql", connection: {
                    //     host : '127.0.0.1',
                    //     user : 'root',
                    //     password : '',
                    //     database : 'visioncenter'
                    // } }).select().from('visioncenter_projects').limit(10);
        
                },
                getBOM(root, args)  {
        
                    return 'hola de nuevo '+args.name;
                },
                greet() {
                    return 0
                },
                getProducts() {
                    return [{
                        id: 20,
                        id_visioncenter_products: 12
                    },
                    {
                        id:21,
                        id_visioncenter_products: 13
                    }]
                }
            },
        
            Mutation: {

                createProduct(root , {input}) {

                    Knex({ client: "mysql", connection: {
                        host : '127.0.0.1',
                        user : 'root',
                        password : '',
                        database : 'visioncenter'
                      } }).raw('SELECT * from visioncenter_projects limit 1').then((queryResult) => {
                          console.log('plaz', JSON.parse(JSON.stringify((queryResult[0])[0])));
                      });

                    return [{
                        id_visioncenter_projects: 90
                    }]
                    
                }
            }
     
        }

    }

    constructor() {

   
         
    }
   
}

module.exports = BOMResolvers;