
var fs = require('fs');
var mustache = require('mustache');
var mkdirp = require('mkdirp');

//Save template Mustache and Model
/**

 * Guardar o template mustache e models de config em variáveis.
 */

var apiTemplate = fs.readFileSync('./Models/API/apiModel.mustache').toString();
var modelInfo = JSON.parse(fs.readFileSync('./Server/config.json')).models;

/**
 * Função para construir as variáveis que vão ser utilizadas na construção da api.js com o mustache.
 * Caso a pasta não exista, ela é criada.
 * Percorre as variáveis do modelInfo e guarda o conteudo de cada uma delas dentro do modelNames.
 * Cria a variável views com os valores encontrados no modelInfo e cria um ficheiro com o template mustache e os valores encontrados.
 * Finalmente cria o ficheiro no local com o fs.
 */
function constructApi(){
    mkdirp('./Publish/Controller', function(err) {
        if (err)
            console.error(err);
        else {
            var modelNames = [];
            modelInfo.forEach(element => {
                modelNames.push({modelName: element.name, modelNamelower: element.name.toLowerCase()});
            });

            var view = {
                models: modelNames
            };

            var output = mustache.render(apiTemplate, view);
            fs.writeFileSync('./Publish/Controller/api.js', output);
        }
    })
}

/**
 * Exporta para ser utilizado no index.js
 */
module.exports.apiGenerator = constructApi;
