const App = require('./App');
const port = process.env.PORT || 8080;

App.listen(port, function(){
    console.log('Iniciando serviços...');
    console.log('Servidor iniciado na porta ' + port);
});