//Functions for templates
var getRequires = require('../data/requires');
var valueDrops = [];
//****************
exports.listAll = function (titleUse,welcomeMessage,plusUse,SchemaClass,objects,propertiesUse,link,labelDetails,labelEdit,labelDelete) {
  return {
        title: titleUse,
        welcomeMessage: welcomeMessage,
        plus: plusUse,
        columns: Object.keys(SchemaClass.schema.paths).map(key => {
                  return {
                      name: propertiesUse[key]
                  }
        }),
        rows: objects.map(obj => {
          return {
            properties: function (){
              var properties = [];
              Object.keys(SchemaClass.schema.paths).map(key => {
                  if(key != "_id" && key != "__v") {
                      properties.push({value: obj[key]});
                  }
              });
              return properties;
            },
            actions: [{
              label: labelDetails,
              link: "./"+link+"/"+obj._id
              },{
              label: labelEdit,
              link: "./"+link+"/update/"+obj._id
              },{
              label: labelDelete,
              link: "./"+link+"/delete/"+obj._id
              }
            ]}
        })
  }
};

exports.createForm = function (propertiesUse,SchemaClass,titleUse,formTitle,method,insertlink = "",created = false, message = "", update = false, object = null,updateLink = null){
  return {
      title: titleUse,
      formTitle: formTitle,
      formAction: titleUse,
      created: created,
      insertlink: insertlink,
      update: update,
      updatelink: updateLink,
      message: message,
      formMethod: method,
      properties: function () {
        var properties = [];
        Object.keys(SchemaClass.schema.paths).map(key => {
          if(key != "_id" && key != "__v" ){
            if(object == null) {
              if(SchemaClass.schema.paths[key].instance != "Array"){
                properties.push({type: SchemaClass.schema.paths[key].instance, name: propertiesUse[key],
                                  nameLower: key, isDropDown: false});
              } else {
                properties.push({name: propertiesUse[key], isDropdown: true, valueDrops: valueDrops, namefk: key});
              }
            }
            else {
              properties.push({type: SchemaClass.schema.paths[key].instance, name: propertiesUse[key],
                                  value: object[key],nameLower: key, isDropDown: false});
            }
          }
        })
        return properties;
      },
      fkeys: function() {
        var fkeys = [];
        Object.keys(SchemaClass.schema.paths).map(key => {
          if(key != "_id" && key != "__v" ){
            if(object == null) {
              if(SchemaClass.schema.paths[key].instance == "Array"){
                fkeys.push( { namefk: SchemaClass.schema.paths[key].path.split('FK')[0]});
              }
          }
        }});
        return fkeys;
      }
  }
};

exports.detailList = function (title,id,SchemaClass,properties,object, toDelete = false) {
  return {
      title: title,
      delete: toDelete,
      updateLink: id,
      deletelink: id,
      properties: function () {
        var propertiesToReturn = [];
        Object.keys(SchemaClass.schema.paths).map(key => {
              if(key != "_id" && key != "__v" )
              propertiesToReturn.push({
                          name: properties[key],
                          value: object[key]
                        });
              }
            );
        return propertiesToReturn;
    }
  }
};
