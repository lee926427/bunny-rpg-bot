// CommonJS
const express = require('express');
const path = require('path');


/**
 * Path defines & configs
 * @type {string}
 */
global.path = {app: path.resolve(__dirname)};
global.path.configs = global.path.app + '/configs';
global.path.controllers = global.path.app + '/controllers';
global.path.views = global.path.app + '/views';
global.path.routers = global.path.app + '/routers';
global.path.statics = global.path.app + '/statics';


/**
 * Express app define & configs
 * @type {app}
 */
const app = express();
app.set("view options", {layout: false});
app.set('views', global.path.views);
app.set('view engine', 'ejs');
console.log('use static path at', global.path.statics);
app.use('/statics', express.static(global.path.statics));

/**
 * Define DI container node.
 *
 * @type {{configs: {}, controllers: {}}}
 */
app.$container = {
    configs: {},
    controllers: {},
};

/**
 * Load module by application define/configs
 *
 * @param module {string} module name, should be define by global path.
 * @param type {string} module type
 * @param fileExtension {string} default .js
 * @return {any}
 */
app.moduleLoader = function(module, type, fileExtension) {

    if(!fileExtension) {
        fileExtension = '.js';
    }
    else {
        fileExtension = '';
    }

    if(!app.$container[type][module]) {
        const modulePath = `${global.path[type]}/${module}${fileExtension}`;
        app.$container[type][module] = require(modulePath);
        console.log(`load ${type} [${module}] by path: ${modulePath}`);
    }

    return app.$container[type][module];
};

/**
 * Config loader
 *
 * @param module
 * @return {*}
 */
app.config = function(module) {
    const type = 'configs';
    return app.moduleLoader(module, type);
};

/**
 * Controller loader
 * @param module
 */
app.controller = function(module) {
    const type = 'controllers';
    const Class = app.moduleLoader(module, type);
    const instance = new Class(app);
    const handler = {
        get: function(target, name) {
            return function (req, res, next) {
                return target[name](req, res, next);
            }
        }
    };

    return new Proxy(instance, handler);
};


const router = require(global.path.routers + '/index.js');
router(app);

//
// app.get('/', function(req, res){
//     res.send('Service Available!');
// });
//
//
// app.post('/webhook', line.middleware(config), (req, res) => {
//     Promise
//         .all(req.body.events.map(handleEvent))
//         .then((result) => res.json(result));
// });
//
//
// const client = new line.Client(config);
// function handleEvent(event) {
//     console.log('received message:', event);
//     if (event.type !== 'message' || event.message.type !== 'text') {
//         return Promise.resolve(null);
//     }
//
//     if(event.message.text == '/註冊') {
//
//     }
//
//     if(event.message.text == '/register') {
//
//     }
//
//     return client.replyMessage(event.replyToken, {
//         type: 'text',
//         text: event.message.text
//     });
//
//     return Promise.resolve(null);
// }

app.listen(3000);