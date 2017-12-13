module.exports = {
    // MISC
    'config'            			: 'config/environment/index',
    'router.web'                    : 'web-router',

    //Models
    'collectionnames'               : 'orderapp-models/collectionNames',
    'model.users'                   : 'orderapp-models/user.model',
    'model.products'                : 'orderapp-models/products.model',
    'model.customers'               : 'orderapp-models/customers.model',
    'model.orders'                  : 'orderapp-models/orders.model',

    //Utils
    'utils.response'                : 'utils/response.utils',


    //apis
    'api.users'                     : 'api/api.users',
    'api.products'                  : 'api/api.products',
    'api.cart'                      : 'api/api.cart',
    'api.orders'                    : 'api/api.orders',


    //controllers
    'ctrl.users'                    : 'controllers/ctrl.users',
    'ctrl.products'                 : 'controllers/ctrl.products',
    'ctrl.cart'                     : 'controllers/ctrl.cart',
    'ctrl.orders'                   : 'controllers/ctrl.orders',


};