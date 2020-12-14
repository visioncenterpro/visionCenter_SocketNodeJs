// const socket_mobile = require('./controllers/socket-event/socket-mobile')
// const socket_approval = require('./controllers/socket-event/socket-approval')
const asterisk = require('./controllers/asterisk/conexion')
const route_web = require('./routes/web');
const WebSocketServer = require('./controllers/microservices/app/WebSocketServer.ts');


new WebSocketServer();

// Estos procesos se delegaron a la ruta socket/socket-mobile.js
//socket_mobile(io);
//socket_approval(io);

// query {
//     getAckPackages(idAck: 539) {

//                                   id_visioncenter_packages
//                                 material_name
//                                 material_structure_name
//                                 NAME
//                                 CODE
//                                 fk_packages_material_visioncenter_packages
//                                 fk_packages_types_visioncenter_packages
//                                 fk_packages_resistance_visioncenter_packages
//                                 fk_packages_pallets_visioncenter_packages
//                                 AREA
//                                 deep
//                                 height
//                                 vol
//                                 width
//                                 package_content {
//                                   id_acknowledgement_packages
//                                   id_acknowledgement_component
//                                   component_description
//                                   component_code
//                                   qty
//                                   BOM {
//                                     code
//                                     code_erp
//                                     created_at
//                                     description
//                                     fk_products_groups
//                                     id_visioncenter_products
//                                     qty
//                                     updated_at
//                                     fk_product_line_piece_productline_bom                    
//                                   }
// packages {
//                                     id_visioncenter_packages
//                                     material_name
//                                     material_structure_name
//                                     name
//                                     code
//                                     fk_packages_material_visioncenter_packages
//                                     fk_packages_types_visioncenter_packages
//                                     fk_packages_resistance_visioncenter_packages
//                                     fk_packages_pallets_visioncenter_packages
//                                     area
//                                     deep
//                                     height
//                                     vol
//                                     width
//   item 
    
//                                   }    
//                                   additionals {
//                 id_acknowledgement_additionals
//                 fk_ack_ack_styles
//                 fk_ack_components_ack_additional
//                 observation
//                 component_name
//                 component_code 
//                 component_description
//                 style_name
//                 height
//                 width
//                 deep
//                                     qty
//                                   }
//                                 }

//     }

//   }
