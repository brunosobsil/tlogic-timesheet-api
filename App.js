const AutenticacaoController = require('./src/controllers/AutenticacaoController');
const controller = new AutenticacaoController();

const express = require('express');
const cors = require('cors');

class App {

    constructor(){
        this.express = express();
        this.middlewares();
        this.auth();
        this.routes();        
    }

    middlewares(){
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors());
    }
    
    auth(){
        this.express.use(controller.validarToken);
    }

    routes(){
        require('./src/routes')(this.express);
    }

}

module.exports = new App().express;